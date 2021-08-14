import { io } from "socket.io-client";
import { BACKEND_URL } from "./env-config";
const socket = () => {
  return io(BACKEND_URL, { transports: ["websocket"] });
};
export default socket;
