import React from "react";
import { Flex, Box, Button } from "rebass";
import { ThemeProvider } from "emotion-theming";

import theme from "./theme";
import useRocket from "../../hooks/useRocket";
import DSKY from "../DSKY/DSKY";
import Checklist from "../Checklist/Checklist";

function Rocket() {
  const { systems, launch } = useRocket();

  if (!systems.ready) {
    return "loading...";
  }

  return (
    <ThemeProvider theme={theme}>
      <Flex
        p={2}
        height="100vh"
        alignItems="center"
        justifyContent="center"
        sx={{
          "@media screen and (max-width: 768px)": {
            transform: "scale(0.6)"
          }
        }}
      >
        <Box m={2} flexGrow={0} flexShrink={0}>
          <DSKY agc={systems.agc} dsky={systems.dsky} />

          <Button
            mt={2}
            width={1}
            fontSize={2}
            onClick={launch}
            variant="primary"
            sx={{
              display: "none",
              "@media screen and (max-width: 768px)": {
                display: "block"
              }
            }}
          >
            Launch
          </Button>
        </Box>

        <Box
          m={2}
          width="25em"
          sx={{
            display: "block",
            "@media screen and (max-width: 768px)": {
              display: "none"
            }
          }}
        >
          <Checklist
            items={[
              "Enable the IMU",
              "After 85-90 seconds, the NO ATT light turns off",
              "Enter V37E01E to initiate major mode 01 (Prelaunch or Service Initialization)",
              "Wait until IMU is calibrated",
              "Major mode 02 (Prelaunch or Service Gyrocompassing) will automatically start",
              "Start launch procedure",
              "Major mode 11 (Earth Orbit Insertion Monitor) will start after the detection of the launch event",
              "Enter V82E to monitor orbit parameters",
              "Enter V06N32E to display time from perigee"
            ]}
          />
          <Button
            mt={2}
            width={1}
            fontSize={2}
            onClick={launch}
            variant="primary"
          >
            Launch
          </Button>
        </Box>
      </Flex>
    </ThemeProvider>
  );
}

export default Rocket;
