const SIDES_COLOR = "#404040";
const DURATION = "100ms";

export default {
  key: {
    top: "0px",
    left: "0px",
    transition: `all ${DURATION} linear 0s`,
    position: "relative",
    boxShadow: `4px 4px 0 ${SIDES_COLOR}`,
    cursor: "pointer",

    "&::after": {
      transition: `all ${DURATION} linear 0s`,
      content: "''",
      position: "absolute",
      top: "1px",
      right: "-2px",
      width: "5px",
      height: "5px",
      backgroundColor: SIDES_COLOR,
      transform: "rotate(45deg)",
      zIndex: -1
    },

    "&::before": {
      transition: `all ${DURATION} linear 0s`,
      content: "''",
      position: "absolute",
      bottom: "-2px",
      left: "1px",
      width: "5px",
      height: "5px",
      backgroundColor: SIDES_COLOR,
      transform: "rotate(45deg)",
      zIndex: -1
    },

    "&:active": {
      top: "3px",
      left: "3px",
      boxShadow: `2px 2px 0 ${SIDES_COLOR}`,

      "&::after": {
        top: "1px",
        right: "-1px",
        width: "2px",
        height: "2px"
      },

      "&::before": {
        bottom: "-1px",
        left: "1px",
        width: "2px",
        height: "2px"
      }
    }
  }
};
