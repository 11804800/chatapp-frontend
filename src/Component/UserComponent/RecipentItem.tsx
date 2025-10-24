import { useDispatch, useSelector } from "react-redux";
import { setRecipientName, setUnseenMessageCount } from "../../redux/User";
import type { RootState } from "../../redux/Store";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../SocketProvider/SockerProvider";
import { GetDateAndTime } from "../../utils/DateAndTimeFormat";
import { FaUser, FaVideo } from "react-icons/fa";
import { BsMic } from "react-icons/bs";
import { IoCheckbox } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { addToSelectContact } from "../../redux/Contact";
import { IoMdPhotos } from "react-icons/io";


function RecipentItem({ item }: any) {


    const dispatch = useDispatch();


    function SetRecipient(name: string) {
        dispatch(setRecipientName(name));
    }


    const userData: any = useSelector((state: RootState) => {
        return state.user.userData
    });

    const { socket }: any = useContext(SocketContext);

    const selectContact: boolean = useSelector((state: RootState) => {
        return state.contact.selectContact
    });

    const recipientName: string | null = useSelector((state: RootState) => {
        return state.user.recipientName
    });


    const Time: any = item?.lastMessageTime && GetDateAndTime(item.lastMessageTime);

    const SelectedContact: any = useSelector((state: RootState) => {
        return state.contact.selectedContact
    });

    useEffect(() => {
        if (item.unseenmessagecount >= 1) {
            if (item?.userId._id == recipientName) {
                dispatch(setUnseenMessageCount(recipientName));
                socket.emit("seen", ({ consumer: userData?._id, publisher: recipientName }));
            }
        }

    }, [item, recipientName]);


    return (
        <div className={`w-full flex gap-1 hover:bg-zinc-200 p-2 rounded-lg ${!selectContact && recipientName == item.userId._id && "bg-zinc-200"} ${SelectedContact.includes(item?.userId._id) && "bg-green-400/25"} `} onClick={() => {
            if (!selectContact) {
                SetRecipient(item.userId._id)
            }
            else {
                dispatch(addToSelectContact(item?.userId._id))
            }
        }}>
            {selectContact &&
                <button>
                    {
                        SelectedContact.includes(item?.userId._id) ?
                            < IoCheckbox />
                            :
                            <MdOutlineCheckBoxOutlineBlank />
                    }
                </button>
            }
            <div className="shrink-0 relative">
                {
                    item?.userId?.image ?
                        <img src={import.meta.env.VITE_IMAGE_URL + item?.userId?.image} className="w-15 h-15 rounded-full shrink-0 p-1 object-cover" />
                        :
                        <div className={` ${!selectContact && recipientName == item.userId._id ? "bg-white" : "bg-zinc-200"} p-3 rounded-full text-zinc-600`}>
                            <FaUser size={28} />
                        </div>
                }
                {item?.userId.online && <span className="h-[8px] w-[8px] bg-green-700 rounded-full absolute right-1 top-1"></span>}
            </div>
            <div className="flex flex-col w-full p-2">
                <div className="flex justify-between w-full items-center">
                    <p className="font-medium text-sm capitalize line-clamp-1">{item.userId?.firstname}{" "}{item.userId?.lastname}</p>
                    <p className="text-[10px]">{item?.userId?.online ? "online" : item?.userId.onlineTime && GetDateAndTime(item?.userId.onlineTime)}</p>
                </div>
                <div className="flex justify-between w-full items-center pr-1 pt-2">
                    <div className="flex items-center text-[13px] gap-2 w-[80%] sm:w-[60%]">
                        {
                            item?.mediaType == "audio" && <BsMic />
                        }
                        {
                            item?.mediaType == "image" && <IoMdPhotos />
                        }
                        {
                            item?.mediaType == "video" && <FaVideo />
                        }
                        <p className=" line-clamp-1 ">{item?.lastMessage ? item?.lastMessage : item?.mediaDuration}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="text-[10px]">{Time}</p>
                        {
                            item?.unseenmessagecount >= 1 &&
                            <p className="bg-green-800 text-white px-2 py-[2px] text-[11px] font-medium rounded-full ">{item?.unseenmessagecount}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipentItem