// import { useEffect } from "react";
// import {AxiosVite }from "../utils/Axios.tsx"
import { useSelector } from "react-redux";
import type { RootState } from "../redux/Store.tsx";
import { useContext } from "react";
import { SocketContext } from "../SocketProvider/SockerProvider.tsx";
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

  const context=useContext(SocketContext);
    const User:object=useSelector((state:RootState)=>{
    return state.user.user
  });

  console.log(User,context);
  
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <p className="text-xl">
        Home
      </p>
    </div>
  )
}

export default Home