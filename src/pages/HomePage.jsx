import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const Homepage = () => {
  const userData = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket);
  const auth = useSelector((state) => state.auth);
  const [roomId, setRoomId] = useState("");
  const [hide, setHide] = useState(true);
  const history = useHistory();
  useEffect(() => {
    if (!auth) {
      history.push("/signin");
    }
    socket.on("gotoroom", (RoomId) => {
      history.push("/room/" + RoomId);
    });
  }, []);
  return !auth ? (
    <div className="w-screen h-screen flex justify-center items-center text-center text-4xl text-purple-600">
      Redirecting...
    </div>
  ) : (
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
              let Id = uuidv4().slice(0, 8);
              socket.emit("createRoom", Id);
            }}
            className="border-2 text-center cursor-pointer hover:scale-x-105 hover:scale-y-110 select-none transform duration-300 py-2 px-12 text-purple-600 text-xl rounded-lg border-purple-600 font-light"
          >
            Create Room
          </span>
          <span
            onClick={() => {
              setHide(!hide);
            }}
            className="border-2 text-center cursor-pointer bg-purple-600 text-white border-white hover:scale-x-105 hover:scale-y-110 select-none transform duration-300 py-2 px-12 text-xl rounded-lg font-light"
          >
            Join Room
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
            className={`w-3/5 max-w-sm border rounded-lg outline-none border-gray-300 mx-2 p-4 py-2 text-sm font-light`}
            placeholder="Room ID"
            type="text"
            value={roomId}
          />
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
