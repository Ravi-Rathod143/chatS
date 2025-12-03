import { io } from 'socket.io-client';
let socket = null;
export function connect(token){
  socket = io(import.meta.env.VITE_SERVER_WS || 'http://localhost:4000', { auth: { token } });
  return socket;
}
export function getSocket(){ return socket; }
