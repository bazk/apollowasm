import React from "react";
import { Flex, Box, Text } from "rebass";

import styles from "./styles";

const Key = ({ text, ...props }) => {
  const single = text.length === 1;
  return (
    <Box {...props} sx={{ zIndex: 0 }}>
      <Flex
        width="5em"
        height="5em"
        bg="#303030"
        color="#ffffff"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={styles.key}
      >
        {text &&
          text.split(" ").map(t => (
            <Text key={t} fontSize={single ? 3 : 2}>
              {t}
            </Text>
          ))}
      </Flex>
    </Box>
  );
};

export default Key;
