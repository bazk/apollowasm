import React from "react";
import PropTypes from "prop-types";
import { Text, Flex } from "rebass";

const Label = ({ on, text }) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    bg={on ? "rgba(0, 255, 0, 0.8)" : "rgba(0, 0, 0, 0.05)"}
    p={1}
  >
    {text && text.split(" ").map(t => <Text key={t}>{t}</Text>)}
  </Flex>
);

Label.propTypes = {
  text: PropTypes.string
};

export default Label;
