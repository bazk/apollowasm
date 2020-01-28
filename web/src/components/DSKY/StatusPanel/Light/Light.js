import React from "react";
import PropTypes from "prop-types";
import { Flex, Text } from "rebass";
import { darken } from "@theme-ui/color";

const Light = ({ text, on, flashing, color, ...props }) => {
  const colorOff = "statusLightOff";
  const colorOn =
    color === "white" ? "statusWhiteLightOn" : "statusYellowLightOn";

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p="0.5em"
      width="9em"
      height="4.2em"
      bg="statusBezel"
      sx={{
        borderColor: darken("statusBezel", 0.15),
        borderStyle: "solid",
        borderBottomWidth: "2px",
        borderRightWidth: "2px"
      }}
      {...props}
    >
      <Flex
        width="100%"
        height="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg={on ? colorOn : colorOff}
        sx={{
          boxShadow: "inset 0px 0px 12px 6px rgba(0, 0, 0, 0.08)",
          borderColor: darken("statusBezel", 0.25),
          borderStyle: "solid",
          borderTopWidth: "2px",
          borderLeftWidth: "2px",
          paddingTop: "2px",
          animation:
            on && flashing
              ? "lightFlashing 1s cubic-bezier(0.77, 0, 0.175, 1) infinite"
              : "none",
          "@keyframes lightFlashing": {
            "50%": {
              backgroundColor: "statusLightOff"
            }
          }
        }}
      >
        {text &&
          text.split(" ").map(t => (
            <Text key={t} fontSize={1}>
              {t}
            </Text>
          ))}
      </Flex>
    </Flex>
  );
};

Light.propTypes = {
  text: PropTypes.string.isRequired,
  on: PropTypes.bool,
  flashing: PropTypes.bool,
  color: PropTypes.oneOf(["white", "yellow"])
};

Light.defaultProps = {
  color: "yellow"
};

export default Light;
