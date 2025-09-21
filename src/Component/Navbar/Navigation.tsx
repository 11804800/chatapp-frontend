import { IoSettingsOutline } from "react-icons/io5";
import { BsChatLeftTextFill,BsChatLeftText } from "react-icons/bs";
import { MdSettings } from "react-icons/md"
import { useLocation, useNavigate } from "react-router"
import { FaUser,FaRegUser } from "react-icons/fa";

function Navigation() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <div className=" bg-white w-full border-t md:w-fit md:border-r-[1px] border-zinc-200 flex flex-row md:flex-col justify-between h-fit md:h-full px-2">
            <div className="md:py-4 flex flex-row md:flex-col gap-4 p-2 justify-around md:justify-normal w-1/2 md:w-full">
                <button onClick={() => navigate("/")} className={`${pathname == "/" ? "bg-zinc-200" : "bg-transparent text-zinc-500"} hover:bg-zinc-200 p-3 rounded-full active:bg-white flex justify-center w-fit h-fit`}>
                    {
                        pathname == "/"
                            ?
                            <BsChatLeftTextFill size={21}/>
                            :
                            <BsChatLeftText  size={21} />
                    }
                </button>
                <button onClick={() => navigate("/status")} className={`${pathname == "/status" ? "bg-zinc-200" : "bg-transparent"} hover:bg-zinc-200 p-3 w-fit rounded-full active:bg-white flex justify-center h-fit`}>
                    <span className={`border-2 p-[3px] rounded-full block border-dashed w-fit ${pathname == "/status" ? "" : "border-zinc-600"}`}>
                        <span className={`border-2 p-1 w-4 h-4 block rounded-full shrink-0 ${pathname == "/status" ? "bg-black" : "border-zinc-600"}`}></span>
                    </span>
                </button>
            </div>
            <div className="flex flex-row md:flex-col gap-4 md:py-8 p-2 justify-around md:justify-normal w-1/2 md:w-full">
                <button onClick={() => navigate("/setting")} className={`${pathname == "/setting" ? "bg-zinc-200" : "bg-transparent text-zinc-500"} w-fit hover:bg-zinc-200 p-3 rounded-full active:bg-white shrink-0 flex justify-center h-fit`}>
                    {
                        pathname != "/setting" ?
                            <IoSettingsOutline size={21}/>
                            :
                            <MdSettings size={23} />
                    }
                </button>
                <button onClick={() => navigate("/dashboard")} className={`${pathname == "/dashboard" ? "bg-zinc-200" : "bg-transparent"} hover:bg-zinc-200 p-3 w-fit rounded-full active:bg-white flex justify-center shrink-0 h-fit`}>
                    {
                        pathname == "/dashboard" ?
                        <FaUser size={21}/>
                        :
                        <FaRegUser size={21}/>
                    }
                </button>
            </div>
        </div>
    )
}

export default Navigation