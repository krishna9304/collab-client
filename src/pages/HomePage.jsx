import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const Homepage = () => {
  const userData = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket);
  const [roomId, setRoomId] = useState("");
  const [hide, setHide] = useState(true);
  return (
    <div className="w-screen p-6 h-screen">
      <div className="font-extrabold text-3xl text-purple-600">Collab.</div>
      <div className="w-full h-full flex items-center flex-col justify-center">
        <span className="text-4xl font-extralight">
          Hey! {userData.firstName},
        </span>
        <br />
        <div className="flex gap-4">
          <span
            onClick={() => {
              let Id = uuidv4() + Date.now();
              socket.emit("createRoom", Id);
            }}
            className="border-2 cursor-pointer hover:scale-x-105 hover:scale-y-110 select-none transform duration-300 py-2 px-12 text-purple-600 text-xl rounded-lg border-purple-600 font-light"
          >
            Create a room
          </span>
          <span
            onClick={() => {
              setHide(!hide);
            }}
            className="border-2 cursor-pointer bg-purple-600 text-white border-white hover:scale-x-105 hover:scale-y-110 select-none transform duration-300 py-2 px-12 text-xl rounded-lg font-light"
          >
            Join a room
          </span>
        </div>
        <div
          className={`${
            !hide ? "block" : "hidden"
          } flex m-2 w-full items-center justify-center`}
        >
          <input
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
            className={`w-1/4 border rounded-lg outline-none border-gray-300 mx-2 p-4 py-2 text-sm font-light`}
            placeholder="Room ID"
            type="text"
            value={roomId}
          ></input>
          <div
            onClick={() => {
              socket.emit("joinRoom", roomId);
            }}
            className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 cursor-pointer text-white flex justify-center items-center font-bold"
          >
            ⏎
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
