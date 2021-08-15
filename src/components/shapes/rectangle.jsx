import React from "react";
import Draggable from "../../utilities/draggable";
const Rectangle = () => {
  return (
    <Draggable>
      <div className="w-64 h-32 shadow-lg bg-white cursor-move border-2 border-blue-900"></div>
    </Draggable>
  );
};

export default Rectangle;
