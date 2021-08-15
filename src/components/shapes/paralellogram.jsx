import React from "react";
import Draggable from "../../utilities/draggable";

const Paralellogram = () => {
  return (
    <Draggable>
      <div className="w-64 h-32 transform -skew-x-12 shadow-lg bg-white cursor-move border-2 border-blue-900"></div>
    </Draggable>
  );
};

export default Paralellogram;
