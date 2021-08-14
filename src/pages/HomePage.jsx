import React from "react";
import { useSelector } from "react-redux";
const Homepage = () => {
  const userData = useSelector((state) => state.user);
  return (
    <div className="w-screen p-6 h-screen">
      <div className="font-extrabold text-3xl text-purple-600">Collab.</div>
      <div className="w-full h-full flex items-center flex-col justify-center">
        <span className="text-4xl font-extralight">
          Hey! {userData.firstName},
        </span>
        <br />
        <span className="border-2 cursor-pointer hover:bg-purple-600 hover:text-white hover:border-white hover:scale-x-105 hover:scale-y-110 select-none transform duration-300 py-2 px-12 text-purple-600 text-xl rounded-lg border-purple-600 font-light">
          Create a room
        </span>
      </div>
    </div>
  );
};

export default Homepage;
