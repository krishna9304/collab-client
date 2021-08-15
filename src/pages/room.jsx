import React from "react";
import { useParams } from "react-router-dom";
const Room = () => {
  const params = useParams();
  const id = params.id;
  return (
    <div className="flex h-screen w-screen">
      <div className="h-full w-2/3 flex justify-center items-center">
        Hey, welcome to room&nbsp;
        <span className="text-lg text-purple-600 font-light">{id}</span>
      </div>
      <div className="h-full w-1/3 bg-purple-600 flex flex-wrap"></div>
    </div>
  );
};

export default Room;
