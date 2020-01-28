import React, { useCallback } from "react";
import { Box, Button } from "rebass";

import useRocket from "../../hooks/useRocket";
import DSKY from "../DSKY/DSKY";

function Rocket() {
  const rocket = useRocket();

  const handleLaunch = useCallback(() => {
    rocket.systems.agc.send(24, 0x0000, 0x0010);
    rocket.launch();
  }, [rocket]);

  if (!rocket.systems.ready) {
    return "loading...";
  }

  return (
    <Box>
      <Button onClick={handleLaunch}>Launch</Button>

      <DSKY agc={rocket.systems.agc} dsky={rocket.systems.dsky} />
    </Box>
  );
}

export default Rocket;
