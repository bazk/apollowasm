import React, { useCallback } from "react";
import { Box, Flex } from "rebass";

import useSubject from "../../hooks/useSubject";
import StatusPanel from "./StatusPanel/StatusPanel";
import DisplayPanel from "./DisplayPanel/DisplayPanel";
import KeyboardPanel from "./KeyboardPanel/KeyboardPanel";

const DSKY = ({ agc, dsky }) => {
  const state = useSubject(dsky.state);

  const handleKeyPress = useCallback(
    key => {
      // sends the key to the input channel 13 = 015
      agc.send(13, key, 0x7fff);
    },
    [agc]
  );

  return (
    <Box
      fontSize="0.6rem"
      width="50em"
      p={4}
      mx="auto"
      my={-2}
      bg="dskyBackground"
      sx={{
        boxShadow: "2px 2px 8px -3px rgba(0, 0, 0, 0.5)"
      }}
    >
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
  );
};

export default DSKY;
