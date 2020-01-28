/** @jsx jsx */
import { jsx } from "theme-ui";
import PropTypes from "prop-types";
import { Box } from "rebass";

const SEGMENTS = {
  "0": { h0: 1, h1: 1, v0: 1, v2: 1, v3: 1, v5: 1, h4: 1, h5: 1 },
  "1": { v2: 1, v5: 1 },
  "2": { h0: 1, h1: 1, v2: 1, h2: 1, h3: 1, v3: 1, h4: 1, h5: 1 },
  "3": { h0: 1, h1: 1, v2: 1, h2: 1, h3: 1, v5: 1, h4: 1, h5: 1 },
  "4": { v0: 1, v2: 1, h2: 1, h3: 1, v5: 1 },
  "5": { h0: 1, h1: 1, v0: 1, h2: 1, h3: 1, v5: 1, h4: 1, h5: 1 },
  "6": { h0: 1, h1: 1, v0: 1, h2: 1, h3: 1, v3: 1, v5: 1, h4: 1, h5: 1 },
  "7": { h0: 1, h1: 1, v2: 1, v5: 1 },
  "8": { h0: 1, h1: 1, v0: 1, v2: 1, h2: 1, h3: 1, v3: 1, v5: 1, h4: 1, h5: 1 },
  "9": { h0: 1, h1: 1, v0: 1, v2: 1, h2: 1, h3: 1, v5: 1, h4: 1, h5: 1 },
  "+": { v1: 1, h2: 1, h3: 1, v4: 1 },
  "-": { h2: 1, h3: 1 },
  " ": {}
};

const Digit = ({ value, dot, flashing, ...props }) => {
  const segs = SEGMENTS[value] || {};

  return (
    <Box {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 903 1212"
        width="3em"
        sx={{
          animation: flashing
            ? "displayFlashing 1s cubic-bezier(1, 0, 0, 1) infinite"
            : "none",
          "@keyframes displayFlashing": {
            "50%": {
              opacity: "0"
            }
          }
        }}
      >
        {segs.h0 && (
          <path
            name="h0"
            d="M285 0l-35 30 50 55h190l50-45-35-40z"
            sx={{
              fill: "displayColor"
            }}
          />
        )}

        {segs.h1 && (
          <path
            name="h1"
            d="M625 0l-55 45 40 40h180l70-60-25-25z"
            sx={{
              fill: "displayColor"
            }}
          />
        )}

        {segs.v0 && (
          <path
            name="v0"
            d="M230 40l-32 32-85 475 37 40 53-45 80-445z"
            sx={{
              fill: "displayColor"
            }}
          />
        )}

        {segs.v1 && (
          <path
            name="v1"
            d="M550 55l-55 50-60 305 15 170 80-165 60-320z"
            sx={{
              fill: "displayColor"
            }}
          />
        )}

        {segs.v2 && (
          <path
            name="v2"
            d="M870 42l-65 60-85 445 35 40 53-47 90-465z"
            sx={{
              fill: "displayColor"
            }}
          />
        )}

        {segs.h2 && (
          <path
            name="h2"
            d="M210 562l-47 43 32 40h158l77-45-47-38z"
            sx={{
              fill: "displayColor"
            }}
          />
        )}

        {segs.h3 && (
          <path
            name="h3"
            d="M540 562l-75 40 53 43h165l52-48-32-35z"
            sx={{
              fill: "displayColor"
            }}
          />
        )}

        {segs.v3 && (
          <path
            name="v3"
            d="M145 617l-55 48-90 475 28 25 70-60 82-445z"
            sx={{
              fill: "displayColor"
            }}
          />
        )}

        {segs.v4 && (
          <path
            name="v4"
            d="M445 625l-80 170-55 310 38 42 57-45 54-329z"
            sx={{
              fill: "displayColor"
            }}
          />
        )}

        {segs.v5 && (
          <path
            name="v5"
            d="M748 615l-55 50-75 445 47 52 38-30 82-477z"
            sx={{
              fill: "displayColor"
            }}
          />
        )}

        {segs.h4 && (
          <path
            name="h4"
            d="M105 1125l-67 60 22 22h218l50-47-30-35z"
            sx={{
              fill: "displayColor"
            }}
          />
        )}

        {segs.h5 && (
          <path
            name="h5"
            d="M415 1125l-52 40 35 42h217l33-30-48-52z"
            sx={{
              fill: "displayColor"
            }}
          />
        )}

        {dot && (
          <path
            name="dot"
            d="M852 1112a50 50 0 00-50 50 50 50 0 0050 50 50 50 0 0050-50 50 50 0 00-50-50z"
            sx={{
              fill: "displayColor"
            }}
          />
        )}
      </svg>
    </Box>
  );
};

Digit.propTypes = {
  dotted: PropTypes.bool,
  value: PropTypes.oneOf(Object.keys(SEGMENTS)),
  dot: PropTypes.bool
};

export default Digit;
