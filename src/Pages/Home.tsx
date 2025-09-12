// import { useEffect } from "react";
// import {AxiosVite }from "../utils/Axios.tsx"
import { useSelector } from "react-redux";
import type { RootState } from "../redux/Store.tsx";
import { useContext } from "react";
import { SocketContext } from "../SocketProvider/SockerProvider.tsx";
import MainPage from "../Component/Home/MainPage.tsx";
import MessageContainer from "../Component/Home/MessageContainer.tsx";
import SideNavigation from "../Component/SideNav/SideNavigation.tsx";
function Home() {

  // useEffect(() => {
  //   function SetTitle() {
  //     document.title = "Home"
  //   }
  //   SetTitle();
  //   async function GetData()
  //   {
  //     const res=await  AxiosVite.get("/users");
  //     console.log(res.data);
  //   }
  //   GetData();
  // }, []);

  const context = useContext(SocketContext);
  const User: object = useSelector((state: RootState) => {
    return state.user.user
  });

  console.log(User, context);

  return (
    <div className="relative h-screen w-full flex flex-col-reverse md:flex-row">
      <SideNavigation/>
      <MainPage/>
      {/* <MessageContainer/> */}
    </div>
  )
}

export default Home