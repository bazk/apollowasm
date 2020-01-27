import { useEffect } from "react";

export default function useMainLoop(system) {
  useEffect(() => {
    if (!system.ready) {
      return;
    }

    const { agc, imu, dsky } = system;

    const interval = setInterval(() => {
      let mask = 0x00000f01; // 0x00000b00

      for (let i = 0; i < 10; i++) {
        agc.tick(); // runs agc engine for 10 ms
        let data = agc.scanPort(mask); // scan for ports 8, 9 and 11
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

          data = agc.scanPort(mask);
        }
      }

      dsky.update();
    }, 100);

    return () => clearInterval(interval);
  }, [system]);
}
