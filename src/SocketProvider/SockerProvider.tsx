import { createContext, type ReactNode } from "react"
import {io} from 'socket.io-client';

type SocketProviderProps = {
  children: ReactNode;
};

export const SocketContext = createContext({});

const ENDPOINTS = import.meta.env.VITE_API_SOCKET_URL;

// ENDPOINTS, { transports: ['websocket'] }), []
function SockerProvider({ children }: SocketProviderProps) {
  const socket: any =io(ENDPOINTS);
  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SockerProvider