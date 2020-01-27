import React, { useCallback } from "react";
import { Box, Flex, Button } from "rebass";
import { ThemeProvider } from "emotion-theming";

import theme from "./theme";
import useSubject from "../../hooks/useSubject";
import StatusPanel from "./StatusPanel/StatusPanel";
import DisplayPanel from "./DisplayPanel/DisplayPanel";
import KeyboardPanel from "./KeyboardPanel/KeyboardPanel";

const DSKY = ({ agc, dsky }) => {
  const state = useSubject(dsky.state);

  const handleKeyPress = useCallback(
    key => {
      // sends the key to the input channel 13 = 015
      agc.sendPort(13, key, 0x7fff);
    },
    [agc]
  );

  const handleEnableIMU = useCallback(() => agc.sendPort(24, 0, 0x2000), [agc]);

  const handleLaunch = useCallback(() => {
    agc.sendPort(24, 0x0000, 0x0010);
  }, [agc]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Button onClick={handleEnableIMU}>Enable IMU</Button>
        <Button onClick={handleLaunch}>Launch</Button>
      </Box>
      <Box fontSize="0.6rem" width="45em" p={4} mx="auto" my={-2} bg="#dedede">
        <Flex py={2} justifyContent="space-between">
          <StatusPanel state={state.status} />
          <DisplayPanel
            activity={state.status.compActy}
            flashing={state.status.flashing}
            state={state.display}
          />
        </Flex>
        <Flex py={2}>
          <KeyboardPanel onKeyPress={handleKeyPress} />
        </Flex>
      </Box>
    </ThemeProvider>
  );
};

export default DSKY;
