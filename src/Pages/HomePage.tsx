import { useContext, useEffect } from "react";
import MainPage from "../Component/Home/MainPage.tsx";
import MessageContainer from "../Component/Home/MessageContainer.tsx";
import { SocketContext } from "../SocketProvider/SockerProvider.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/Store.tsx";
import { addNewMessage } from "../redux/message.tsx";

function HomePage() {

  const { socket }: any = useContext(SocketContext);
  const dispatch = useDispatch();
  const userData: any = useSelector((state: RootState) => {
    return state.user.userData
  });

  useEffect(() => {
    socket.emit("connection", { id: userData._id });

    socket.on("new-message", (data: any) => {
      dispatch(addNewMessage(data.data));
    });

  }, []);

  return (
    <div className="h-[90%] md:h-screen w-full flex relative">
      <MainPage />
      <MessageContainer />
    </div>
  )
}

export default HomePage