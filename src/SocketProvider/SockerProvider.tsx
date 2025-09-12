import { createContext, type ReactNode } from "react"

type SocketProviderProps = {
  children: ReactNode;
};

export const SocketContext=createContext({});

function SockerProvider({children}:SocketProviderProps) {
  return (
    <SocketContext.Provider value={"t"}>
        {children}
    </SocketContext.Provider>
  )
}

export default SockerProvider