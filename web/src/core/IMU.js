// based on LM_Simulator by Stephan Hotto <stephan.hotto@web.de>

const DEG_TO_RAD = Math.PI / 180;
const CA_ANGLE = 0.043948 * DEG_TO_RAD;
const FA_ANGLE = (0.617981 / 3600.0) * DEG_TO_RAD;
const ANGLE_INCR = (360.0 / 32768) * DEG_TO_RAD;
const PIPA_INCR = 0.0585; // m/s per each PIPA pulse

export default class IMU {
  static adjust(x, a, b) {
    return x - (b - a) * Math.floor((x - a) / (b - a));
  }

  constructor(agc) {
    this.agc = agc;
    this.reset();
  }

  reset() {
    this.imuAngle = [0, 0, 0];
    this.pimu = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.pipa = [0, 0, 0];
  }

  peek(mask) {
    this.agc.scanPort(mask);
  }

  poke(port, value) {
    this.agc.sendPort(port, value);
  }

  angle(axis) {
    return this.imuAngle[axis];
  }

  vel(axis) {
    return this.velocity[axis];
  }

  speed() {
    return Math.sqrt(
      this.velocity[0] * this.velocity[0] +
        this.velocity[1] * this.velocity[1] +
        this.velocity[2] * this.velocity[2]
    );
  }

  /**
   * Gyro Coarse Align
   *
   * Will be called in case of Channel 0174; 0175; 0176 output
   */
  gyroCoarseAlign(channel, value) {
    const sign = value & 0x4000 ? -1 : +1;
    const cduPulses = sign * (value & 0x3fff);

    if (channel === 124) {
      // 0174
      this.modifyGimbalAngle([cduPulses * CA_ANGLE, 0, 0]);
    } else if (channel === 125) {
      // 0175
      this.modifyGimbalAngle([0, cduPulses * CA_ANGLE, 0]);
    } else if (channel === 126) {
      // 0176
      this.modifyGimbalAngle([0, 0, cduPulses * CA_ANGLE]);
    }
  }

  /**
   * Gyro Fine Align
   *
   * will be called in case of Channel 0177 output
   */
  gyroFineAlign(_channel, value) {
    const gyroSignMinus = value & 0x4000;
    const gyroSelectionA = value & 0x2000;
    const gyroSelectionB = value & 0x1000;
    const sign = gyroSignMinus ? -1 : +1;
    const gyroPulses = sign * (value & 0x07ff);

    if (!gyroSelectionA && gyroSelectionB) {
      this.modifyGimbalAngle([gyroPulses * FA_ANGLE, 0, 0]);
    }
    if (gyroSelectionA && !gyroSelectionB) {
      this.modifyGimbalAngle([0, gyroPulses * FA_ANGLE, 0]);
    }
    if (gyroSelectionA && gyroSelectionB) {
      this.modifyGimbalAngle([0, 0, gyroPulses * FA_ANGLE]);
    }
  }

  /**
   * Modify a specific IMU Delta Gimbal-Angle par1=X; par2=Y; par3=Z
   */
  modifyGimbalAngle(delta) {
    for (let axis = 0; axis < 3; axis++) {
      if (delta[axis]) {
        // ---- Calculate New Angle ----
        this.imuAngle[axis] = IMU.adjust(
          this.imuAngle[axis] + delta[axis],
          0,
          2 * Math.PI
        );

        // ---- Calculate Delta between the new Angle and already feeded IMU Angle ----
        const dx = IMU.adjust(
          this.imuAngle[axis] - this.pimu[axis],
          -Math.PI,
          Math.PI
        );

        // ---- Feed yaAGC with the new Angular Delta ----
        const sign = dx > 0 ? +1 : -1;
        const n = Math.floor(Math.abs(dx) / ANGLE_INCR);
        this.pimu[axis] = IMU.adjust(
          this.pimu[axis] + sign * ANGLE_INCR * n,
          0,
          2 * Math.PI
        );

        let cdu = this.peek(26 + axis); // read CDU counter (26 = 0x32 = CDUX)
        cdu = cdu & 0x4000 ? -(cdu ^ 0x7fff) : cdu; // converts from ones-complement to twos-complement
        cdu += sign * n; // adds the number of pulses
        this.poke(26 + axis, cdu < 0 ? -cdu ^ 0x7fff : cdu); // converts back to ones-complement and writes the counter
      }
    }
  }

  /**
   * Function: Transform angular deltas in Body Axes into Stable Member angular deltas
   *
   * based on Transform_BodyAxes_StableMember {dp dq dr}
   */
  rotate(delta) {
    const MPI = Math.sin(this.imuAngle[2]);
    const MQI = Math.cos(this.imuAngle[2]) * Math.cos(this.imuAngle[0]);
    const MQM = Math.sin(this.imuAngle[0]);
    const MRI = -Math.cos(this.imuAngle[2]) * Math.sin(this.imuAngle[0]);
    const MRM = Math.cos(this.imuAngle[0]);
    const nenner = MRM * MQI - MRI * MQM;

    //---- Calculate Angular Change ----
    const do_b = IMU.adjust(
      delta[0] - (delta[1] * MRM * MPI - delta[2] * MQM * MPI) / nenner,
      -Math.PI,
      Math.PI
    );
    var di_b = IMU.adjust(
      (delta[1] * MRM - delta[2] * MQM) / nenner,
      -Math.PI,
      Math.PI
    );
    var dm_b = IMU.adjust(
      (delta[2] * MQI - delta[1] * MRI) / nenner,
      -Math.PI,
      Math.PI
    );

    //--- Rad to Deg and call of Gimbal Angle Modification ----
    this.modifyGimbalAngle([do_b, di_b, dm_b]);
  }

  /**
   * Function: Modify PIPA Values to match simulated Speed
   *
   * based on proc modify_pipaXYZ
   */
  accelerate(delta) {
    const sinOG = Math.sin(this.imuAngle[0]);
    const sinIG = Math.sin(this.imuAngle[1]);
    const sinMG = Math.sin(this.imuAngle[2]);
    const cosOG = Math.cos(this.imuAngle[0]);
    const cosIG = Math.cos(this.imuAngle[1]);
    const cosMG = Math.cos(this.imuAngle[2]);

    const dv = [
      cosMG * cosIG * delta[0] +
        (-cosOG * sinMG * cosIG + sinOG * sinIG) * delta[1] +
        (sinOG * sinMG * cosIG + cosOG * sinIG) * delta[2],
      sinMG * delta[0] + cosOG * cosMG * delta[1] - sinOG * cosMG * delta[2],
      -cosMG * sinIG * delta[0] +
        (cosOG * sinMG * sinIG + sinOG * cosIG) * delta[1] +
        (-sinOG * sinMG * sinIG + cosOG * cosIG) * delta[2]
    ];

    for (let axis = 0; axis < 3; axis++) {
      this.velocity[axis] += dv[axis];
      const counts = Math.floor(
        (this.velocity[axis] - this.pipa[axis] * PIPA_INCR) / PIPA_INCR
      );

      this.pipa[axis] += counts;

      let p = this.peek(31 + axis); // read PIPA counter (31 = 0x37 = PIPAX)
      p = p & 0x4000 ? -(p ^ 0x7fff) : p; // converts from ones-complement to twos-complement
      p += counts; // adds the number of pulses
      this.poke(31 + axis, p < 0 ? -p ^ 0x7fff : p);
    }
  }
}
