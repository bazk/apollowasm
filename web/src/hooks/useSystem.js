import { useEffect, useState } from "react";

import AGC from "../core/AGC";
import DSKY from "../core/DSKY";
import IMU from "../core/IMU";

export default function useSystem() {
  const [system, setSystem] = useState({ ready: false });

  useEffect(() => {
    AGC.load().then(agc => {
      const imu = new IMU(agc);
      const dsky = new DSKY();

      setSystem({
        ready: true,
        agc,
        imu,
        dsky
      });
    });
  }, []);

  return system;
}
