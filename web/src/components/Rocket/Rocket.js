import React from "react";
import { Box, Button } from "rebass";

import useRocket from "../../hooks/useRocket";
import DSKY from "../DSKY/DSKY";

function Rocket() {
  const { systems, launch } = useRocket();

  if (!systems.ready) {
    return "loading...";
  }

  return (
    <Box>
      <Button onClick={launch}>Launch</Button>

      <DSKY agc={systems.agc} dsky={systems.dsky} />
    </Box>
  );
}

export default Rocket;
