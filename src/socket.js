import { io } from "socket.io-client";
import { BACKEND_URL } from "./env-config";
const socket = () => {
  const soc = io(BACKEND_URL, { transports: ["websocket"] });
  soc.on("message", console.log);
  return soc;
};
export default socket;
