import { BehaviorSubject } from "rxjs";
import { isEqual } from "lodash";

export default class DSKY {
  static getDigit(c) {
    switch (c) {
      case 0:
        return " ";
      case 21:
        return "0";
      case 3:
        return "1";
      case 25:
        return "2";
      case 27:
        return "3";
      case 15:
        return "4";
      case 30:
        return "5";
      case 28:
        return "6";
      case 19:
        return "7";
      case 29:
        return "8";
      case 31:
        return "9";
      default:
        return "E";
    }
  }

  constructor() {
    this.display = {
      0: "0",
      1: "0",
      2: "0",
      3: "0",
      4: "0",
      5: "0",
      6: "+",
      7: "0",
      8: "0",
      9: "0",
      10: "0",
      11: "0",
      12: "+",
      13: "0",
      14: "0",
      15: "0",
      16: "0",
      17: "0",
      18: "+",
      19: "0",
      20: "0",
      21: "0",
      22: "0",
      23: "0"
    };

    this.status = {
      noAtt: false,
      gimbalLock: false,
      prog: false,
      tracker: false,
      alt: false,
      vel: false,
      uplinkActy: false,
      keyRel: false,
      oprErr: false,
      temp: false,
      compActy: false,
      stby: false
    };

    // sign[0..2][p,n] holds the sign bits for the three 5-digit displays R1, R2 and R3
    this.sign1p = 0;
    this.sign1n = 0;
    this.sign2p = 0;
    this.sign2n = 0;
    this.sign3p = 0;
    this.sign3n = 0;

    this.state = new BehaviorSubject({
      display: this.display,
      status: this.status
    });
  }

  update() {
    const newState = {
      display: this.display,
      status: this.status
    };

    if (!isEqual(this.state.getValue(), newState)) {
      this.state.next(newState);
    }
  }

  updateDisplay(newValues) {
    this.display = {
      ...this.display,
      ...newValues
    };
    // this.display.next({
    //   ...this.display.getValue(),
    //   ...newValues
    // });
  }

  updateStatus(newValues) {
    this.status = {
      ...this.status,
      ...newValues
    };
    // this.status.next({
    //   ...this.status.getValue(),
    //   ...newValues
    // });
  }

  process(channel, value) {
    if (channel === 8) {
      if (!value) {
        return;
      }

      // see http://www.ibiblio.org/apollo/developer.html about "aa", "bb", "d1" and "d2"
      var aa = value >> 11;
      var bb = (value >> 10) & 1;
      var d1 = DSKY.getDigit((value >> 5) & 0x1f);
      var d2 = DSKY.getDigit(value & 0x1f);

      switch (aa) {
        case 12: // special case for the indicator lights
          this.updateStatus({
            noAtt: Boolean(value & 0x0008),
            gimbalLock: Boolean(value & 0x0020),
            prog: Boolean(value & 0x0100),
            tracker: Boolean(value & 0x0080),
            alt: Boolean(value & 0x0010),
            vel: Boolean(value & 0x0004)
          });
          break;
        case 11:
          this.updateDisplay({
            0: d1,
            1: d2
          });
          break;
        case 10:
          this.updateDisplay({
            2: d1,
            3: d2
          });
          break;
        case 9:
          this.updateDisplay({
            4: d1,
            5: d2
          });
          break;
        case 8:
          this.updateDisplay({
            7: d2
          });
          break;
        case 7:
          this.sign1p = bb;
          this.updateDisplay({
            6: this.sign1p ? "+" : this.sign1n ? "-" : " ",
            8: d1,
            9: d2
          });
          break;
        case 6:
          this.sign1n = bb;
          this.updateDisplay({
            6: this.sign1p ? "+" : this.sign1n ? "-" : " ",
            10: d1,
            11: d2
          });
          break;
        case 5:
          this.sign2p = bb;
          this.updateDisplay({
            12: this.sign2p ? "+" : this.sign2n ? "-" : " ",
            13: d1,
            14: d2
          });
          break;
        case 4:
          this.sign2n = bb;
          this.updateDisplay({
            12: this.sign2p ? "+" : this.sign2n ? "-" : " ",
            15: d1,
            16: d2
          });
          break;
        case 3:
          this.updateDisplay({
            17: d1,
            19: d2
          });
          break;
        case 2:
          this.sign3p = bb;
          this.updateDisplay({
            18: this.sign3p ? "+" : this.sign3n ? "-" : " ",
            20: d1,
            21: d2
          });
          break;
        case 1:
          this.sign3n = bb;
          this.updateDisplay({
            18: this.sign3p ? "+" : this.sign3n ? "-" : " ",
            22: d1,
            23: d2
          });
          break;
        default:
          break;
      }
    } else if (channel === 9) {
      this.updateStatus({
        compActy: Boolean(value & 0x0002),
        uplinkActy: Boolean(value & 0x0004),
        temp: Boolean(value & 0x0008),
        keyRel: Boolean(value & 0x0010),
        flashing: Boolean(value & 0x0020),
        oprErr: Boolean(value & 0x0040)
      });
    } else if (channel === 11) {
      this.updateStatus({
        stby: Boolean(value & 0x0200)
      });
    }
  }
}
