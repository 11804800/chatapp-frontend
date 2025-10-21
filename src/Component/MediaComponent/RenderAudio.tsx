import { useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import { CiClock2 } from "react-icons/ci";
import { BsCheck2All } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { FormatTime, FormWaveSurfOptions } from "../AudioComponent/AudioComponent";
import WaveSurfer from "wavesurfer.js";


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
                WaveSurfRef.current?.un('ready', OnReady);
                WaveSurfRef.current?.un("audioprocess")
                WaveFormRef.current?.destroy();
            }
        }
    }, [audio]);

    function PlayPause() {
        WaveFormRef.current.playPause();
        setPlaying(!playing);
    }

    return (
        <div className="">
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

    const Reciver: any = useSelector((state: RootState) => {
        return state.user.recipientName
    });

    if (item?.consumer == Reciver) {
        return (
            <div className="flex w-full justify-end px-4 relative">
                <div className="self-start flex px-2 drop-shadow relative shrink-0 overflow-hidden">
                    <div className="bg-[#d9fdd3] font-medium px-2 py-1  w-fit  flex items-start rounded-md">
                        <AudioPlay audio={item?.media} />
                        <div className="flex gap-[2px] absolute right-6 -bottom-[18px] h-full items-center px-2">
                            <p className="text-[10px]">12:04</p>
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
                    <div className="rotate-45 -translate-x-[8px] -translate-y-1.5 w-[12px] h-[12px] bg-[#d9fdd3] rounded"></div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="w-full flex group justify-start relative">
                <div className="self-start flex px-2 drop-shadow relative shrink-0 overflow-hidden">
                    <div className="rotate-45 translate-x-[8px] -translate-y-1.5 w-[12px] h-[12px] bg-white rounded"></div>
                    <div className="bg-white font-medium px-2 py-1  w-fit  flex items-start rounded-md">
                        <AudioPlay audio={item?.media} />
                        <div className="flex gap-[2px] absolute right-4 -bottom-[18px] h-full items-center px-2">
                            <p className="text-[10px]">12:04</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RenderAudio