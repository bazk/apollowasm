import React from "react";
import { Flex } from "rebass";

import Digit from "./Digit/Digit";
import Label from "./Label/Label";

const DisplayPanel = ({ activity, flashing, state, ...props }) => (
  <Flex p={1} flexDirection="column" bg="#2a2d29" {...props}>
    <Flex justifyContent="space-between">
      <Flex width={1 / 2} flexDirection="column" justifyContent="center">
        <Label text="COMP ACTY" on={activity} />
      </Flex>
      <Flex flexDirection="column">
        <Label text="PROG" on />
        <Flex p={1}>
          <Digit value={state[0]} />
          <Digit value={state[1]} />
        </Flex>
      </Flex>
    </Flex>
    <Flex justifyContent="space-between">
      <Flex flexDirection="column">
        <Label text="VERB" on />
        <Flex p={1}>
          <Digit value={state[2]} flashing={flashing} />
          <Digit value={state[3]} flashing={flashing} />
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Label text="NOUN" on />
        <Flex p={1}>
          <Digit value={state[4]} flashing={flashing} />
          <Digit value={state[5]} flashing={flashing} />
        </Flex>
      </Flex>
    </Flex>
    <Flex p={1}>
      <Digit value={state[6]} />
      <Digit value={state[7]} />
      <Digit value={state[8]} />
      <Digit value={state[9]} />
      <Digit value={state[10]} />
      <Digit value={state[11]} />
    </Flex>
    <Flex p={1}>
      <Digit value={state[12]} />
      <Digit value={state[13]} />
      <Digit value={state[14]} />
      <Digit value={state[15]} />
      <Digit value={state[16]} />
      <Digit value={state[17]} />
    </Flex>
    <Flex p={1}>
      <Digit value={state[18]} />
      <Digit value={state[19]} />
      <Digit value={state[20]} />
      <Digit value={state[21]} />
      <Digit value={state[22]} />
      <Digit value={state[23]} />
    </Flex>
  </Flex>
);

export default DisplayPanel;
