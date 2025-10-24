import { createContext, useEffect, useState, type ReactNode } from "react"
import { io } from 'socket.io-client';
import { AxiosVite } from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/Store";
import { setContact, setToken, setUserData } from "../redux/User";


type SocketProviderProps = {
  children: ReactNode;
};

export const SocketContext = createContext({});

const ENDPOINTS = import.meta.env.VITE_API_SOCKET_URL;

function SockerProvider({ children }: SocketProviderProps) {


  const [file, setFile] = useState<any>(null);
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token: string | null = useSelector((state: RootState) => {
    return state.user.token
  });


  const dispatch: any = useDispatch();

  useEffect(() => {
    async function FetchUser() {
      if (token != null) {
        setLoading(true);
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
            firstname: response.data.data.firstname,
            lastname: response.data.data.lastname,
            username: response.data.data.username,
            socket_id: response.data.data?.socket_id,
            image: response.data.data?.image,
            description: response.data?.data?.description
          }));
          setLoading(false);
        }).catch((err: any) => {
          if (err?.response?.data == "Unauthorized") {
            setLoading(false);
            localStorage.removeItem("token");
            dispatch(setToken(""));
          }
          else {
            setLoading(false);
            setError(err.message);
          }
        })
      }
    }
    FetchUser();
  }, [token]);


  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex p-5">
          <h1 className="font-medium text-2xl md:text-3xl">
            Loading
          </h1>
          <div className="text-4xl overflow-hidden flex">
            <div className="animate-bounce1">.</div>
            <div className="animate-bounce1" style={{ animationDelay: '123ms' }}>.</div>
            <div className="animate-bounce1">.</div>
            <div className="animate-bounce1" style={{ animationDelay: '123ms' }}>.</div>
          </div>
        </div>
      </div>
    )
  }
  else if (err == "Network Error") {
    return (
      <div className="flex flex-col-reverse xl:flex-row h-screen w-screen p-5 justify-center items-center">
        <div className="xl:h-screen  p-5 flex justify-center items-start flex-col gap-2">
          <h1 className="font-medium text-3xl sm:text-4xl text-nowrap">Internal Server Error</h1>
          <p className="font-regular text-zinc-400">Something bad happend <br /> at the server or Server is not running</p>
          <button onClick={() => window.location.reload()} className="px-5 py-2 bg-blue-950 text-white">Refresh</button>
        </div>
        <img src="../Error500.png" className="object-contain h-[50%] xl:h-[70%]" />
      </div>
    )
  }
  else {
    const socket: any = io(ENDPOINTS);
    return (
      <SocketContext.Provider value={{ socket: socket, file: file, setFile: setFile }}>
        {children}
      </SocketContext.Provider>
    )
  }
}

export default SockerProvider