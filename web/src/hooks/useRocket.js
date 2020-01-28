import { useEffect, useState } from "react";

import AGC from "../core/AGC";
import DSKY from "../core/DSKY";
import IMU from "../core/IMU";
import profile from "../data/launch.json";
import useInterval from "./useInterval";

const DEG_TO_RAD = Math.PI / 180;

export default function useRocket() {
  const [systems, setSystems] = useState({ ready: false });
  const [engineRunning, setEngineRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    AGC.load().then(agc => {
      const imu = new IMU(agc);
      const dsky = new DSKY();

      setTimeout(() => {
        agc.send(24, 0, 0x2000);
      }, 100);

      setSystems({
        ready: true,
        agc,
        imu,
        dsky
      });
    });
  }, []);

  useInterval(() => {
    if (!systems.ready) {
      return;
    }

    const { agc, imu, dsky } = systems;

    let mask = 0x00000f01; // 0x00000f01; // 0x00000b00
    for (let i = 0; i < 10; i++) {
      agc.tick(); // runs agc engine for 10 ms

      let data = agc.scan(mask); // scan for ports 8, 9 and 11
      while (data) {
        const channel = data >> 16;
        const value = data & 0xffff;

        switch (channel) {
          case 8:
          case 9:
          case 11:
            dsky.process(channel, value);
            break;
          case 10:
            if (value & 0x0010) {
              imu.reset();
            }
            break;
          case 124: // 0174
          case 125: // 0175
          case 126: // 0176
            imu.gyroCoarseAlign(channel, value);
            break;
          case 127: // 0177
            imu.gyroFineAlign(channel, value);
            break;
          default:
            break;
        }

        data = agc.scan(mask);
      }
    }

    if (engineRunning) {
      const t = Math.round(time / 10);
      imu.accelerate([1.08 * profile[t][2], 0, 0]);
      imu.rotate([
        (-profile[t][3] / 10) * DEG_TO_RAD,
        (-profile[t][1] / 10) * DEG_TO_RAD,
        0
      ]);
    }

    dsky.update();
    setTime(time + 1);
  }, 100);

  return {
    systems,
    launch: () => setEngineRunning(true)
  };
}
