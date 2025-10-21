import { useDispatch, useSelector } from "react-redux";
import { setRecipientName, setUnseenMessageCount } from "../../redux/User";
import type { RootState } from "../../redux/Store";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../SocketProvider/SockerProvider";
import { GetDateAndTime } from "../../utils/DateAndTimeFormat";
import { FaUser } from "react-icons/fa";
import { BsMic } from "react-icons/bs";

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

    const Time: any = item?.updatedAt && GetDateAndTime(item.updatedAt);


    useEffect(() => {
        if (item.unseenmessagecount >= 1) {
            if (item?.userId._id == recipientName) {
                dispatch(setUnseenMessageCount(recipientName));
                socket.emit("seen", ({ consumer: userData?._id, publisher: recipientName }));
            }
        }

    }, [item, recipientName]);

    return (
        <div className={`w-full flex gap-1 hover:bg-zinc-200 p-2 rounded-lg ${recipientName == item.userId._id && "bg-zinc-200"}`} onClick={() => SetRecipient(item.userId._id)}>
            {selectContact && <input type="checkbox" />}
            <div className="shrink-0 relative">
                {
                    item?.userId?.image ?
                        <img src={import.meta.env.VITE_IMAGE_URL + item?.userId?.image} className="w-15 h-15 rounded-full shrink-0 p-1 object-cover" />
                        :
                        <div className="bg-zinc-200 p-3 rounded-full text-zinc-600">
                            <FaUser size={28} />
                        </div>
                }
            </div>
            <div className="flex flex-col w-full p-2">
                <div className="flex justify-between w-full items-center">
                    <p className="font-medium text-sm capitalize">{item.userId?.firstname}{" "}{item.userId?.lastname}</p>
                    <p className="text-[12px]">Yesterday</p>
                </div>
                <div className="flex justify-between w-full items-center pr-1 pt-2">
                    <div className="flex items-center text-[13px] gap-2 w-[80%] sm:w-[60%]">
                        {
                            item?.mediaType == "audio" && <BsMic />
                        }
                        <p className=" line-clamp-1 ">{item?.lastMessage}</p>
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