import { createContext, useEffect, type ReactNode } from "react"
import { io } from 'socket.io-client';
import { AxiosVite } from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/Store";
import { setContact, setUserData } from "../redux/User";


type SocketProviderProps = {
  children: ReactNode;
};

export const SocketContext = createContext({});

const ENDPOINTS = import.meta.env.VITE_API_SOCKET_URL;

function SockerProvider({ children }: SocketProviderProps) {


  const token: string | null = useSelector((state: RootState) => {
    return state.user.token
  });

  const dispatch: any = useDispatch();

  useEffect(() => {
    async function FetchUser() {
      if (token) {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        AxiosVite.get("/users", config).then((response: any) => {
          dispatch(setContact(response.data.data.contact));
          dispatch(setUserData({
            _id: response.data.data._id,
            firstname: response.data.data._id,
            lastname: response.data.data.lastname,
            username: response.data.data.username,
            socket_id: response.data.data?.socket_id,
            image: response.data.data?.image
          }));
        }).catch((err: any) => {
          console.log(err.response.data);
        })
      }
    }
    FetchUser();
  }, [token]);

  const socket: any = io(ENDPOINTS);
  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SockerProvider