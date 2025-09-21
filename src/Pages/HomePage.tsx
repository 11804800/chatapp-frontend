// import { useContext, useEffect } from "react";
import MainPage from "../Component/Home/MainPage.tsx";
import MessageContainer from "../Component/Home/MessageContainer.tsx";

// import { SocketContext } from "../SocketProvider/SockerProvider.tsx";


function HomePage() {

  // const { socket }: any = useContext(SocketContext);


  // useEffect(() => {
  //   socket.on("welcome", (data:any) => {
  //     console.log(data,socket.id);
  //   });
  // },[]);

 

  return (
    <div className="h-[90%] md:h-screen w-full flex relative">
      <MainPage />
      <MessageContainer />
    </div>
  )
}

export default HomePage