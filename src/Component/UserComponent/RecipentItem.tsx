import { useDispatch, useSelector } from "react-redux";
import { setRecipientName, setUnseenMessageCount } from "../../redux/User";
import type { RootState } from "../../redux/Store";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../SocketProvider/SockerProvider";
import { GetDateAndTime } from "../../utils/DateAndTimeFormat";

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
                <img src="../profile.jpg" className="w-15 h-15 rounded-full shrink-0 object-cover" />
            </div>
            <div className="flex flex-col w-full p-2">
                <div className="flex justify-between w-full items-center">
                    <p className="font-medium text-sm capitalize">{item.userId?.firstname}{" "}{item.userId?.lastname}</p>
                    <p className="text-[12px]">Yesterday</p>
                </div>
                <div className="flex justify-between w-full items-center pr-1 pt-2">
                    <p className="text-[13px] line-clamp-1 w-[60%]">{item?.lastMessage}</p>
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