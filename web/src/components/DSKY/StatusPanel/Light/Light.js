import React from "react";
import PropTypes from "prop-types";
import { Flex, Text } from "rebass";

const Light = ({ text, on, flashing, ...props }) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    width="8em"
    height="3.6em"
    bg={on ? "#e3e334" : "#b3c1b9"}
    {...props}
  >
    {text &&
      text.split(" ").map(t => (
        <Text key={t} fontSize={1}>
          {t}
        </Text>
      ))}
  </Flex>
);

Light.propTypes = {
  text: PropTypes.string.isRequired
};

export default Light;
