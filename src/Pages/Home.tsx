import { useContext, useEffect } from "react";
import MainPage from "../Component/Home/MainPage.tsx";
import MessageContainer from "../Component/Home/MessageContainer.tsx";
import SideNavigation from "../Component/SideNav/SideNavigation.tsx";
import { SocketContext } from "../SocketProvider/SockerProvider.tsx";
function Home() {

  const { socket }: any = useContext(SocketContext);


  useEffect(() => {
    socket.on("welcome", (data:any) => {
      console.log(data,socket.id);
    });
  },[]);

  return (
    <div className="relative h-screen w-full flex flex-col-reverse md:flex-row">
      <SideNavigation />
      <MainPage />
      <MessageContainer />
    </div>
  )
}

export default Home