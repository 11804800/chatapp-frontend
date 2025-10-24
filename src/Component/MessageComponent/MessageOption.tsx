import { useEffect, useRef } from "react"
import { BiCopy, BiReply, BiSmile } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToSelectedMessage, setMessageId, toggleForwardMessage, toggleReply, toggleSelectMessage, toggleShowMessageInfo } from "../../redux/message";
import { TbArrowForwardUpDouble } from "react-icons/tb";
import type { RootState } from "../../redux/Store";
import { IoMdInformationCircleOutline } from "react-icons/io";

function MessageOption({ showMessageOption, setShowMessageOption, ItemId }: any) {

    const MessageOptionRef: any = useRef(null);
    const dispatch = useDispatch();

    const MessageContainer: any = document.getElementById("Message-Container");
    useEffect(() => {

        if (MessageOptionRef.current) {
            const Options = MessageOptionRef.current;
            const rect = Options.getBoundingClientRect();
            if (rect.top + MessageOptionRef.current.clientHeight > MessageContainer.clientHeight) {
                MessageOptionRef.current.style.removeProperty("top");
                MessageOptionRef.current.style.bottom = "32px";
            }
            else {
                MessageOptionRef.current.style.removeProperty("bottom");
                MessageOptionRef.current.style.top = "32px";
            }
        }

        if (!showMessageOption) return;
        const handler = (e: any) => {
            if (MessageOptionRef.current && !MessageOptionRef.current.contains(e.target)) {
                MessageContainer.style.overflowY = "auto";
                setShowMessageOption(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [showMessageOption]);

    const Messages: any = useSelector((state: RootState) => {
        return state.message.messages
    });

    const FilterMessage: any = Messages.find((item: any) => item._id == ItemId);

    return (
        <>
            <div ref={MessageOptionRef} onClick={() => setShowMessageOption(false)} className="flex flex-col bg-white shadow-2xl p-3 rounded-xl w-fit absolute z-50">
                <div className="flex flex-col gap-1">
                    <button onClick={() => {
                        dispatch(setMessageId(ItemId));
                        setShowMessageOption(false);
                        dispatch(toggleShowMessageInfo());
                    }} className="flex items-center gap-1 pl-2 pr-18 py-2 hover:bg-zinc-100 rounded-md active:bg-transparent">
                        <IoMdInformationCircleOutline />
                        Info
                    </button>
                    <button className="flex gap-1 pl-2 pr-18 py-2  items-center hover:bg-zinc-100 rounded-md active:bg-transparent">
                        <BiSmile size={18} />
                        React
                    </button>
                    {
                        FilterMessage?.message &&
                        <button onClick={() => {
                            navigator.clipboard.writeText(FilterMessage?.message);
                        }} className="text-nowrap hover:bg-zinc-100 active:bg-white w-full pl-2 pr-18 py-2 text-left text-sm rounded-md flex items-center gap-2">
                            <BiCopy size={18} />
                            Copy
                        </button>
                    }
                    <button onClick={() => {
                        dispatch(setMessageId(ItemId));
                        setShowMessageOption(false);
                        dispatch(toggleReply())
                    }} className="text-nowrap hover:bg-zinc-100 active:bg-white w-full pl-2 pr-18 py-2 text-left text-sm rounded-md flex items-center gap-2">
                        <BiReply size={18} />
                        Reply
                    </button>
                    <button onClick={() => {
                        dispatch(toggleForwardMessage());
                        dispatch(setMessageId(ItemId));
                        setShowMessageOption(false);
                    }} className="text-nowrap hover:bg-zinc-100 active:bg-white w-full pl-2 pr-18 py-2 text-left text-sm rounded-md flex items-center gap-2">
                        <TbArrowForwardUpDouble />
                        Forward
                    </button>
                    <button onClick={() => {
                        MessageContainer.style.overflowY = "auto";
                        dispatch(addToSelectedMessage(ItemId))
                        dispatch(toggleSelectMessage())
                    }} className="text-nowrap hover:bg-zinc-100 active:bg-white w-full pl-2 pr-18 py-2 text-left text-sm rounded-md flex items-center gap-2">
                        <BsTrash size={18} />
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default MessageOption