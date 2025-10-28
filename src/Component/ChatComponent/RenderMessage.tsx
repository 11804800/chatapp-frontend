import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import { BiCheck, BiSmile } from "react-icons/bi";
import { BsCheck2All } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { TimeFormatter } from "../../utils/Formatter";
import { TbArrowForwardUpDouble } from "react-icons/tb";
import { MdCheckBoxOutlineBlank, MdMic } from "react-icons/md";
import MediaContent from "./MediaContent";
import { IoIosCheckbox } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import MessageOption from "../MessageComponent/MessageOption";
import { useState } from "react";
import { addToSelectedMessage } from "../../redux/message";
import MessageReactions from "./MessageReactions";
import { RiHeadphoneFill } from "react-icons/ri";


function ReplyMessage({ message }: any) {

    const Type = typeof message;
    const Messages: any = useSelector((state: RootState) => {
        return state.message.messages
    });

    const FilterMessage: any = Type == "string" ? Messages.find((item: any) => item._id == message) : message;
    const Contact: any = useSelector((state: RootState) => {
        return state.user.contact
    });

    const FilterUser: any = Contact.find((item: any) => item?.userId?._id == message.publisher);

    function BringIntoView() {
        const element: any = document.getElementById(`${FilterMessage?._id}`);
        element?.scrollIntoView({ behavior: "smooth" });
        element.style.background = "rgba(0, 242, 90,.3)";
        setTimeout(() => {
            element.style.background = "transparent";
        }, 1000);
    }

    return (
        <div onClick={BringIntoView} className="text-zinc-600 rounded-md bg-black/10 flex overflow-hidden items-center h-fit" style={{ boxShadow: 'inset 2px 3px 4px rgba(0, 0, 0, 0.1)' }}>
            <div className="h-14 bg-green-900 w-1"></div>
            <div className="flex justify-between gap-12">
                <div className="flex flex-col p-2 text-sm gap-1">
                    <p className="font-medium text-zinc-500">
                        {
                            FilterUser ? FilterUser?.userId?.firstname : "You"
                        }
                    </p>
                    <div className="flex items-center gap-1 ">
                        {FilterMessage?.mediaType == "audio" && <MdMic />}
                        {FilterMessage?.mediaDuration}
                        <p className="line-clamp-1">{FilterMessage?.message}</p>
                    </div>
                </div>
                <div className="pr-1 flex justify-center items-center">
                    {
                        FilterMessage.mediaType == "image" &&
                        <img src={import.meta.env.VITE_IMAGE_URL + "/uploads/" + FilterMessage?.media} className="w-10 h-10 rounded-md" />
                    }
                    {
                        FilterMessage.mediaType == "video" &&
                        <video src={import.meta.env.VITE_IMAGE_URL + "/uploads/" + FilterMessage?.media} className="w-10 h-10 rounded-md object-cover" />
                    }
                    {
                        FilterMessage?.mediaType == "audio" &&
                        <div className="rounded-md p-2 text-white bg-[#ffad1f]">
                            <RiHeadphoneFill size={23} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

function RenderMessage({ item }: any) {


    const [showReactionOption, setShowReactionOption] = useState(false);

    const dispatch = useDispatch();

    const [showMessageOption, setShowMessageOption] = useState(false);

    const RecipentName: string | null = useSelector((state: RootState) => {
        return state.user.recipientName
    });

    const SelectedMessages: any = useSelector((state: RootState) => {
        return state.message.selectedMessage
    });

    const SelectMessage: boolean = useSelector((state: RootState) => {
        return state.message.selectMessage
    });


    if (item?.consumer == RecipentName) {
        return (
            <div id={item?._id} className={`${SelectedMessages.includes(item._id) && "bg-green-300/35"}  flex justify-end px-2 md:px-12 relative w-full items-center group gap-2`}>
                {
                    SelectMessage &&
                    <button onClick={() => dispatch(addToSelectedMessage(item?._id))} className="p-2 flex">
                        {
                            SelectedMessages?.includes(item?._id) ?
                                <IoIosCheckbox />
                                :
                                <MdCheckBoxOutlineBlank />
                        }
                    </button>
                }
                {
                    !SelectMessage &&
                    <button onClick={() => {
                        setShowReactionOption(true);
                    }} className="text-zinc-500 group-hover:flex hidden justify-center items-center bg-white rounded-full drop-shadow p-1">
                        <BiSmile />
                    </button>
                }
                {showReactionOption && <MessageReactions user={item?.consumer} setShowReactionOption={setShowReactionOption} ItemId={item?._id} />}
                {SelectedMessages.length == 1 && SelectedMessages.includes(item?._id) && <MessageReactions user={item?.consumer} setShowReactionOption={setShowReactionOption} ItemId={item?._id} />}
                <div className="drop-shadow relative flex overflow-hidden max-w-[240px] sm:max-w-[320px]">
                    {
                        !SelectMessage &&
                        <button onClick={() => setShowMessageOption(true)} className="text-zinc-500 absolute right-3 z-[99] p-2 bg-[#d9fdd3] group-hover:flex hidden">
                            <IoChevronDownOutline />
                        </button>
                    }
                    <div className="bg-[#d9fdd3] rounded p-2">
                        {item?.forward && <div className="flex items-center gap-1 text-zinc-500 text-[11px]"><TbArrowForwardUpDouble />forwarded</div>}
                        {item?.reply && <ReplyMessage message={item.reply} />}
                        {item?.mediaType && <MediaContent item={item} />}
                        <div className={`flex flex-col items-end justify-between gap-1 pt-1`}>
                            <p className={` text-black text-sm w-full  ${item?.mediaType ? "font-regular" : "font-medium pr-12 pb-1"}`}>{item?.message}</p>
                            <div className="flex items-center gap-1">
                                <p className="text-[10px] font-medium text-zinc-500 text-nowrap">{TimeFormatter(item?.createdAt)}</p>
                                {!item.sent ? <span> <CiClock2 size={10} /> </span> : <> {item?.recived ? <> {item?.seen ? <BsCheck2All color="blue" /> : <BsCheck2All />} </> : <BiCheck />} </>}
                            </div>
                        </div>
                    </div>
                    <div className="rotate-45 -translate-x-[8px] -translate-y-1.5 w-[12px] h-[12px] bg-[#d9fdd3] rounded"></div>
                </div>
                {item?.reaction && <div className="absolute -bottom-7 p-2 bg-white drop-shadow rounded-full"><img src={`/${item?.reaction}.png`} className="w-5 h-5" /></div>}
                {
                    showMessageOption &&
                    <MessageOption setShowMessageOption={setShowMessageOption} showMessageOption={showMessageOption} ItemId={item?._id} setShowReactionOption={setShowReactionOption} />
                }
            </div>
        )
    }
    else {
        return (
            <div id={item?._id} className={`${SelectedMessages.includes(item._id) && "bg-green-300/35"} group gap-2 flex justify-start px-2 md:px-12 relative items-center ${SelectMessage ? "w-full" : showReactionOption ? "w-full" : "w-fit"}`}>
                {
                    SelectMessage &&
                    <button onClick={() => dispatch(addToSelectedMessage(item?._id))} className="p-2 flex">
                        {
                            SelectedMessages?.includes(item?._id) ?
                                <IoIosCheckbox />
                                :
                                <MdCheckBoxOutlineBlank />
                        }
                    </button>
                }
                <div className="relative flex overflow-hidden drop-shadow max-w-[240px] sm:max-w-[320px]">
                    {
                        !SelectMessage && <button onClick={() => setShowMessageOption(true)} className="text-zinc-500 absolute right-0 z-[99] p-2 bg-white group-hover:flex hidden rounded">
                            <IoChevronDownOutline />
                        </button>}
                    <div className="rotate-45 translate-x-[8px] -translate-y-1.5 w-[12px] h-[12px] bg-white rounded"></div>
                    <div className="bg-white rounded p-2">
                        {item?.forward && <div className="flex items-center gap-1 text-zinc-500 text-[11px]"><TbArrowForwardUpDouble />forwarded</div>}
                        {item?.reply && <ReplyMessage message={item.reply} />}
                        {item?.mediaType && <MediaContent item={item} />}
                        <div className="flex gap-3 pt-1 justify-between flex-col">
                            <p className={` text-black text-sm w-full   ${item?.mediaType ? "font-regular" : "font-medium pr-12"}`}>{item?.message}</p>
                            <div className="w-full self-end flex items-end pl-3"><p className="text-[10px] font-medium text-nowrap text-zinc-500 w-full justify-end flex">{TimeFormatter(item?.createdAt)}</p></div>
                        </div >
                    </div>
                </div >
                {item?.reaction && <div className="absolute -bottom-7 p-2 bg-white drop-shadow rounded-full"><img src={`/${item?.reaction}.png`} className="w-5 h-5" /></div>}
                {showReactionOption && <MessageReactions user={item?.consumer} setShowReactionOption={setShowReactionOption} ItemId={item?._id} />}
                <button onClick={() => {
                    setShowReactionOption(true);
                }} className="text-zinc-500 group-hover:visible invisible justify-center items-center bg-white rounded-full drop-shadow p-1">
                    <BiSmile />
                </button>
                {
                    showMessageOption &&
                    <MessageOption setShowMessageOption={setShowMessageOption} showMessageOption={showMessageOption} ItemId={item?._id} setShowReactionOption={setShowReactionOption} />
                }
            </div >
        )
    }
}

export default RenderMessage