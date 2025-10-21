import { IoSettingsOutline } from "react-icons/io5";
import { MdSettings } from "react-icons/md"
import { useLocation, useNavigate } from "react-router"
import { FaUser, FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/Store";

function Navigation() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const userData: any = useSelector((state: RootState) => {
        return state.user.userData
    });

    const contact = useSelector((state: RootState) => {
        return state.user.contact
    });

    const RecipentName: any = useSelector((state: RootState) => {
        return state.user.recipientName
    });

    const isNewMessage: boolean = contact.some((item: any) => item.unseenmessagecount >= 1);

    return (
        <div className={`${RecipentName ? "hidden md:flex" : "flex"} bg-white w-full border-t md:w-fit md:border-r-[1px] border-zinc-200  flex-row md:flex-col justify-between h-fit md:h-full px-2`}>
            <div className=" md:py-4 flex flex-row md:flex-col gap-4 p-2 justify-around md:justify-normal w-1/2 md:w-full">
                <button onClick={() => navigate("/")} className={`${pathname == "/" ? "bg-zinc-200" : "bg-transparent text-[#6d6d6d]"} hover:bg-zinc-200 p-3 rounded-full active:bg-white flex justify-center w-fit h-fit relative`}>
                    {
                        pathname == "/"
                            ?
                            <img src="../message-black.png" className="w-6 h-6 object-contain" />
                            :
                            <img src="../message.png" className="w-6 h-6 object-contain" />
                    }
                    {isNewMessage && <span className="h-[8px] w-[8px] bg-green-700 rounded-full absolute right-1"></span>}
                </button>
                <button onClick={() => navigate("/status")} className={`${pathname == "/status" ? "bg-zinc-200" : "bg-transparent"} hover:bg-zinc-200 p-3 w-fit rounded-full active:bg-white flex justify-center h-fit relative`}>
                    {
                        pathname == "/status" ?
                            <img src="../Status-black.png" className="w-6" />
                            :
                            <img src="../Status.png" className="w-6" />
                    }
                </button>
            </div>
            <div className="flex flex-row md:flex-col gap-4 md:py-8 p-2 justify-around md:justify-normal w-1/2 md:w-full">
                <button onClick={() => navigate("/setting")} className={`${pathname == "/setting" ? "bg-zinc-200" : "bg-transparent text-[#6d6d6d]"} w-fit hover:bg-zinc-200 p-3 rounded-full active:bg-white shrink-0 flex justify-center h-fit relative`}>
                    {
                        pathname != "/setting" ?
                            <IoSettingsOutline size={23} />
                            :
                            <MdSettings size={26} />
                    }
                </button>
                {
                    userData?.image ?
                        <button onClick={() => navigate("/dashboard")} className=" flex justify-center items-center">
                            <img src={import.meta.env.VITE_IMAGE_URL + userData?.image} className="w-8 h-8 rounded-full object-cover" />
                        </button>
                        :
                        <button onClick={() => navigate("/dashboard")} className={`${pathname == "/dashboard" ? "bg-zinc-200" : "bg-transparent text-[#6d6d6d]"} hover:bg-zinc-200 p-3 w-fit rounded-full active:bg-white flex justify-center shrink-0 h-fit relative`}>
                            {
                                pathname == "/dashboard" ?
                                    <FaUser size={21} />
                                    :
                                    <FaRegUser size={21} />
                            }
                        </button>
                }
            </div>
        </div>
    )
}

export default Navigation