import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import { CiClock2 } from "react-icons/ci";
import { BsCheck2All } from "react-icons/bs";
import { BiCheck, BiChevronDown } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { FormatTime, FormWaveSurfOptions } from "../AudioComponent/AudioComponent";
import WaveSurfer from "wavesurfer.js";
import MessageOption from "../MessageComponent/MessageOption";
import { TimeFormatter } from "../../utils/Formatter";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { addToSelectedMessage } from "../../redux/message";
import { TbArrowForwardUpDouble } from "react-icons/tb";


function AudioPlay({ audio }: any) {


    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const WaveSurfRef = useRef<any>(null);
    const WaveFormRef = useRef<any>(null);

    useEffect(() => {

        if (audio) {
            const options: any = FormWaveSurfOptions(WaveSurfRef.current);
            WaveFormRef.current = WaveSurfer.create(options);
            if (WaveFormRef.current) {
                WaveFormRef.current.load(`http://localhost:5000${audio}`);
            }

            const OnReady = () => {
                setDuration(WaveFormRef.current.getDuration());
            }
            WaveFormRef.current.on("ready", OnReady);

            WaveFormRef.current.on("audioprocess", () => {
                setCurrentTime(WaveFormRef.current.getCurrentTime());
            });

            WaveFormRef.current.on("finish", () => {
                setPlaying(false);
            });

            return () => {
                if (WaveFormRef.current) {
                    WaveSurfRef.current?.un('ready', OnReady);
                    WaveSurfRef.current?.un("audioprocess")
                    WaveFormRef.current?.destroy();
                }
            }
        }
    }, [audio]);

    function PlayPause() {
        WaveFormRef.current.playPause();
        setPlaying(!playing);
    }

    return (
        <div className="pr-2">
            <div className="flex items-center gap-2 px-1 py-2">
                <button onClick={PlayPause} className="text-zinc-600">
                    {
                        playing ?
                            <FaPause /> : <FaPlay />
                    }
                </button>
                <div className="w-[180px]" ref={WaveSurfRef}></div>
            </div>
            <div className="pl-6 text-sm text-zinc-400 font-regular">
                {
                    !playing ?
                        <p>{FormatTime(duration)}</p>
                        :
                        <p>{FormatTime(currentTime)}</p>
                }
            </div>
        </div>
    )

}

function RenderAudio({ item }: any) {


    const dispatch = useDispatch();

    const SelectMessage: boolean = useSelector((state: RootState) => {
        return state.message.selectMessage
    });

    const SelectedMessages: any = useSelector((state: RootState) => {
        return state.message.selectedMessage
    });

    const Reciver: any = useSelector((state: RootState) => {
        return state.user.recipientName
    });

    const [showMessageOption, setShowMessageOption] = useState(false);

    const ShowOptions = () => {
        const MessageContainer: any = document.getElementById("Message-Container");
        MessageContainer.style.overflowY = "hidden";
        setShowMessageOption(!showMessageOption)
    }

    if (item?.consumer == Reciver) {
        return (
            <div className={`flex w-full justify-end px group relative ${SelectedMessages.includes(item._id) && "bg-green-300/35"}`}>
                <div className="self-start flex px-2 drop-shadow relative shrink-0 overflow-hidden gap-1">
                    {
                        SelectMessage &&
                        <button onClick={() => dispatch(addToSelectedMessage(item?._id))} className={`text-green-700`}>
                            {
                                SelectedMessages.includes(item._id) ?
                                    <IoIosCheckbox />
                                    :
                                    <MdCheckBoxOutlineBlank />
                            }
                        </button>
                    }
                    <div className="bg-[#d9fdd3] font-medium px-2 py-2  w-fit  flex items-start rounded-md relative overflow-hidden">
                        {
                            item.forward && <p className="text-[10px] text-zinc-500 flex items-center absolute top-0"><TbArrowForwardUpDouble /> Forwarded </p>
                        }
                        <AudioPlay audio={item?.media} />
                        <div className="flex gap-[2px] absolute right-6 -bottom-[18px] h-full items-center px-2">
                            <p className="text-[10px]">{TimeFormatter(item?.createdAt)}</p>
                            {
                                !item.sent ?
                                    <span>
                                        <CiClock2 size={10} />
                                    </span>
                                    :
                                    <>
                                        {
                                            item?.recived
                                                ?
                                                <>
                                                    {
                                                        item?.seen ?
                                                            <BsCheck2All color="blue" /> :
                                                            <BsCheck2All />
                                                    }
                                                </>
                                                : <BiCheck />
                                        }
                                    </>
                            }
                        </div>
                    </div>
                    <div className="rotate-45 -translate-x-[12px] -translate-y-1.5 w-[14px] h-[14px] bg-[#d9fdd3] rounded"></div>
                    <button onClick={ShowOptions} className="message-option-btn group-hover:flex text-zinc-500 hidden absolute right-7 top-0 bg-[#d9fdd3]">
                        <BiChevronDown size={23} />
                    </button>
                </div>
                {
                    showMessageOption && <MessageOption showMessageOption={showMessageOption} setShowMessageOption={setShowMessageOption} ItemId={item._id} />
                }
            </div >
        )
    }
    else {
        return (
            <div className={` w-full flex group justify-start relative gap-1 ${SelectedMessages.includes(item._id) && "bg-green-300/35"}`}>
                {
                    SelectMessage &&
                    <button onClick={() => dispatch(addToSelectedMessage(item?._id))} className={`text-green-700`}>
                        {
                            SelectedMessages.includes(item._id) ?
                                <IoIosCheckbox />
                                :
                                <MdCheckBoxOutlineBlank />
                        }
                    </button>
                }
                <div className="self-start flex px-2 drop-shadow relative shrink-0 overflow-hidden">
                    <div className="rotate-45 translate-x-[8px] -translate-y-1.5 w-[12px] h-[12px] bg-white rounded"></div>
                    <div className="bg-white font-medium px-2 py-1  w-fit  flex items-start rounded-md">
                        {
                            item.forward && <p className="text-[10px] text-zinc-500 flex items-center absolute top-0"><TbArrowForwardUpDouble /> Forwarded </p>
                        }
                        <AudioPlay audio={item?.media} />
                        <div className="flex gap-[2px] absolute right-4 -bottom-[18px] h-full items-center px-2">
                            <p className="text-[10px]">{TimeFormatter(item?.createdAt)}</p>
                        </div>
                        <button onClick={ShowOptions} className="message-option-btn group-hover:flex hidden text-zinc-500 absolute right-2 top-0 bg-white">
                            <BiChevronDown size={23} />
                        </button>
                    </div>
                </div>
                {
                    showMessageOption && <MessageOption showMessageOption={showMessageOption} setShowMessageOption={setShowMessageOption} ItemId={item._id} />
                }
            </div>
        )
    }
}

export default RenderAudio