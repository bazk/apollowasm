import React from "react";
import { Flex } from "rebass";

import Key from "./Key/Key";

const KeyboardPanel = ({ onKeyPress, ...props }) => (
  <Flex alignItems="center" justifyContent="center" {...props}>
    <Flex flexDirection="column">
      <Key m={1} text="VERB" onClick={() => onKeyPress(17)} />
      <Key m={1} text="NOUN" onClick={() => onKeyPress(31)} />
    </Flex>
    <Flex flexDirection="column">
      <Flex>
        <Key m={1} text="+" onClick={() => onKeyPress(26)} />
        <Key m={1} text="7" onClick={() => onKeyPress(7)} />
        <Key m={1} text="8" onClick={() => onKeyPress(8)} />
        <Key m={1} text="9" onClick={() => onKeyPress(9)} />
        <Key m={1} text="CLR" onClick={() => onKeyPress(30)} />
      </Flex>
      <Flex>
        <Key m={1} text="-" onClick={() => onKeyPress(27)} />
        <Key m={1} text="4" onClick={() => onKeyPress(4)} />
        <Key m={1} text="5" onClick={() => onKeyPress(5)} />
        <Key m={1} text="6" onClick={() => onKeyPress(6)} />
        <Key m={1} text="PRO" onClick={() => null} />
      </Flex>
      <Flex>
        <Key m={1} text="0" onClick={() => onKeyPress(16)} />
        <Key m={1} text="1" onClick={() => onKeyPress(1)} />
        <Key m={1} text="2" onClick={() => onKeyPress(2)} />
        <Key m={1} text="3" onClick={() => onKeyPress(3)} />
        <Key m={1} text="KEY REL" onClick={() => onKeyPress(25)} />
      </Flex>
    </Flex>
    <Flex flexDirection="column">
      <Key m={1} text="ENTR" onClick={() => onKeyPress(28)} />
      <Key m={1} text="RSET" onClick={() => onKeyPress(18)} />
    </Flex>
  </Flex>
);

export default KeyboardPanel;
