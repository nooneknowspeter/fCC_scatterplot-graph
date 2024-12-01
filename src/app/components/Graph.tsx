import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const Graph = () => {
  useEffect(() => {
    plotGraph();
  }, []);

  const plotGraph = () => {};

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <div id="visualization"></div>
      </div>
    </>
  );
};

export default Graph;
