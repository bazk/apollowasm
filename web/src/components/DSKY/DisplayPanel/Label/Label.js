import React from "react";
import PropTypes from "prop-types";
import { Text, Flex } from "rebass";

const Label = ({ on, text }) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    bg={on ? "displayColor" : "none"}
    p={1}
  >
    {text && text.split(" ").map(t => <Text key={t}>{t}</Text>)}
  </Flex>
);

Label.propTypes = {
  text: PropTypes.string
};

export default Label;
