import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Draggable = (props) => {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [rel, setRel] = useState(null);
  const onMouseMove = (e) => {
    if (!dragging) {
      return;
    } else {
      setPos({
        x: e.pageX - rel.x,
        y: e.pageY - rel.y,
      });
      e.stopPropagation();
      e.preventDefault();
    }
  };
  const onMouseDown = (e) => {
    document.onmousemove = onMouseMove;
    var pos = e.target.getBoundingClientRect();
    setDragging(true);
    setRel({
      x: e.pageX - pos.left,
      y: e.pageY - pos.top,
    });
    e.stopPropagation();
    e.preventDefault();
  };
  const onMouseUp = (e) => {
    setDragging(false);
    document.onmousemove = null;
    e.stopPropagation();
    e.preventDefault();
  };
  useEffect(() => {
    if (dragging) {
      document.onmousemove = onMouseMove;
      document.onmouseup = onMouseUp;
    } else if (!dragging) {
      document.onmousemove = null;
      document.onmouseup = null;
    }
    if (typeof props.onPosChange == "function") {
      props.onPosChange(pos);
    }
    // eslint-disable-next-line
  }, [pos, dragging]);
  return (
    <div
      className={props.className || ""}
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        left: pos.x + "px",
        top: pos.y + "px",
      }}
    >
      {props.children}
    </div>
  );
};
export default Draggable;
