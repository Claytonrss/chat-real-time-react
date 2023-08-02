import { Socket } from "socket.io-client";

export interface WithSocketProps {
  socket: Socket;
}

export interface SocketMessageResponse {
  id: string;
  name: string;
  socketID: string;
  text: string;
}
