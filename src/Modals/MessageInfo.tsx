import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/Store"
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { toggleShowMessageInfo } from "../redux/message";


const formatDate = (dateStr: any) => {
    const date = new Date(dateStr);
    const options: any = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    return date.toLocaleString('en-US', options).replace(',', '');
};


function MessageInfo() {

    const dispatch = useDispatch();

    const MessageId: string = useSelector((state: RootState) => {
        return state.message.messageId
    });

    const Messages: any = useSelector((state: RootState) => {
        return state.message.messages
    });

    const FilterMessage: any = Messages.find((item: any) => item._id == MessageId);


    return (
        <div onClick={() => {
            dispatch(toggleShowMessageInfo())
        }} className="absolute top-0 left-0 bg-black/25 h-screen w-full z-[9999] flex justify-center items-center">
            <div className="w-[300px] h-[240px] rounded-md bg-white p-5 shadow flex flex-col">
                <div className="flex border-b border-zinc-400 flex-col p-5 gap-2">
                    <div className="flex items-center gap-2">
                        <LiaCheckDoubleSolid className="text-blue-500" size={28} />
                        <p className="font-medium">Read</p>
                    </div>
                    <div>
                        {
                            FilterMessage?.seen ?
                                <p className="font-medium text-zinc-700">
                                    {formatDate(FilterMessage?.updatedAt)}
                                </p>
                                :
                                <p className="font-medium text-zinc-500">
                                    __ __ __ ___
                                </p>
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-5">
                    <div className="flex items-center gap-2">
                        <LiaCheckDoubleSolid className="text-zinc-400" size={28} />
                        <p className="font-medium">Delivered</p>
                    </div>
                    <div>
                        <p className="font-medium text-zinc-600">
                            {FilterMessage?.recivedTime ?
                                formatDate(FilterMessage?.recivedTime) : "__ __ ___"
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageInfo