import React, { useEffect, useState } from "react";
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

const Digit = ({ dotted, value, dot, flashing, ...props }) => {
  const [phase, setPhase] = useState(true);

  useEffect(() => {
    if (!flashing) {
      return;
    }

    const interval = setInterval(() => setPhase(phase => !phase), 500);
    return () => clearInterval(interval);
  }, [flashing]);

  const off = "rgba(0, 0, 0, 0.05)";
  const on = !flashing || phase ? "rgba(0, 255, 0, 0.8)" : off;

  const segs = SEGMENTS[value] || {};

  return (
    <Box {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 903 1212"
        width="2em"
        height="4em"
      >
        <path
          name="h0"
          d="M285 0l-35 30 50 55h190l50-45-35-40z"
          fill={segs.h0 ? on : off}
        />
        <path
          name="h1"
          d="M625 0l-55 45 40 40h180l70-60-25-25z"
          fill={segs.h1 ? on : off}
        />
        <path
          name="v0"
          d="M230 40l-32 32-85 475 37 40 53-45 80-445z"
          fill={segs.v0 ? on : off}
        />
        <path
          name="d0"
          d="M290 110l-20 125 110 310 60 50-15-180-80-245z"
          fill={segs.d0 ? on : off}
        />
        <path
          name="v1"
          d="M550 55l-55 50-60 305 15 170 80-165 60-320z"
          fill={segs.v1 ? on : off}
        />
        <path
          name="d1"
          d="M790 110l-90 75-134 186-111 224 95-55 215-300z"
          fill={segs.d1 ? on : off}
        />
        <path
          name="v2"
          d="M870 42l-65 60-85 445 35 40 53-47 90-465z"
          fill={segs.v2 ? on : off}
        />

        <path
          name="h2"
          d="M210 562l-47 43 32 40h158l77-45-47-38z"
          fill={segs.h2 ? on : off}
        />
        <path
          name="h3"
          d="M540 562l-75 40 53 43h165l52-48-32-35z"
          fill={segs.h3 ? on : off}
        />

        <path
          name="v3"
          d="M145 617l-55 48-90 475 28 25 70-60 82-445z"
          fill={segs.v3 ? on : off}
        />
        <path
          name="d2"
          d="M442 607l-94 53-213 300-20 130 85-75 140-200z"
          fill={segs.d2 ? on : off}
        />
        <path
          name="v4"
          d="M445 625l-80 170-55 310 38 42 57-45 54-329z"
          fill={segs.v4 ? on : off}
        />
        <path
          name="d3"
          d="M455 607l18 188 85 237 52 68 20-125-117-320z"
          fill={segs.d3 ? on : off}
        />
        <path
          name="v5"
          d="M748 615l-55 50-75 445 47 52 38-30 82-477z"
          fill={segs.v5 ? on : off}
        />

        <path
          name="h4"
          d="M105 1125l-67 60 22 22h218l50-47-30-35z"
          fill={segs.h4 ? on : off}
        />
        <path
          name="h5"
          d="M415 1125l-52 40 35 42h217l33-30-48-52z"
          fill={segs.h5 ? on : off}
        />

        {dotted && (
          <path
            d="M852 1112a50 50 0 00-50 50 50 50 0 0050 50 50 50 0 0050-50 50 50 0 00-50-50z"
            fill={dot ? on : off}
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
