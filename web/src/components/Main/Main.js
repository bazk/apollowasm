import React from "react";

import useSystem from "../../hooks/useSystem";
import useMainLoop from "../../hooks/useMainLoop";
import DSKY from "../DSKY/DSKY";

function Main() {
  const system = useSystem();
  useMainLoop(system);

  if (!system.ready) {
    return "loading...";
  }

  return <DSKY agc={system.agc} dsky={system.dsky} />;
}

export default Main;
