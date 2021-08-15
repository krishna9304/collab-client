import React from "react";
import Draggable from "../../utilities/draggable";

const Diamond = () => {
  return (
    <Draggable>
      <div className="w-40 h-40 transform rotate-45 shadow-lg bg-white cursor-move border-2 border-blue-900"></div>
    </Draggable>
  );
};

export default Diamond;
