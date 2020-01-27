import React from "react";
import { Box, Flex } from "rebass";

import Light from "./Light/Light";

const StatusPanel = ({ state, ...props }) => (
  <Flex mx={-2} {...props} bg="#cecece">
    <Box p={2} my={-1}>
      <Light my={1} text="UPLINK ACTY" on={state.uplinkActy} />
      <Light my={1} text="NO ATT" on={state.noAtt} />
      <Light my={1} text="STBY" on={state.stby} />
      <Light my={1} text="KEY REL" on={state.keyRel} flashing />
      <Light my={1} text="OPR ERR" on={state.oprErr} flashing />
      <Light my={1} text="" />
      <Light my={1} text="" />
    </Box>
    <Box p={2} my={-1}>
      <Light my={1} text="TEMP" on={state.temp} />
      <Light my={1} text="GIMBALL LOCK" on={state.gimbalLock} />
      <Light my={1} text="PROG" on={state.prog} />
      <Light my={1} text="RESTART" />
      <Light my={1} text="TRACKER" on={state.tracker} />
      <Light my={1} text="ALT" on={state.alt} />
      <Light my={1} text="VEL" on={state.vel} />
    </Box>
  </Flex>
);

export default StatusPanel;
