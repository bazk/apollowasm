export default {
  fontSizes: ["1em", "1.25em", "1.5em", "2em"],
  space: [0, "0.5em", "1em", "2em", "3em", "4em"],
  fonts: {
    body: "inherit",
    heading: "inherit",
    monospace: "inherit"
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1,
    heading: 1
  },
  colors: {
    dskyBackground: "#dedede",

    statusBackground: "#cecece",
    statusBezel: "#dcdcdc",
    statusWhiteLightOn: "#ffffff",
    statusYellowLightOn: "#ffff44",
    statusLightOff: "#b3c1b9",

    displayBackground: "#2a2d29",
    displayColor: "rgba(191, 251, 111, 0.8)",

    checklistBackground: "#f8ffbd"
  },
  buttons: {
    primary: {
      backgroundColor: "#e74c3c",
      borderRadius: 4,
      boxShadow: "3px 3px 0 #c0392b",
      transition: `all 100ms linear 0s`,
      outline: "none",
      cursor: "pointer",
      "&:active": {
        transform: "translate(2px, 2px)",
        boxShadow: "1px 1px 0 #c0392b"
      }
    }
  }
};
