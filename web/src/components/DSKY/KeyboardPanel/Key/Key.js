import React from "react";
import { Flex, Text } from "rebass";

const Key = ({ text, ...props }) => {
  const single = text.length === 1;
  return (
    <Flex
      {...props}
      width="5em"
      height="5em"
      bg="#303030"
      color="#ffffff"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {text &&
        text.split(" ").map(t => (
          <Text key={t} fontSize={single ? 3 : 2}>
            {t}
          </Text>
        ))}
    </Flex>
  );
};

export default Key;
