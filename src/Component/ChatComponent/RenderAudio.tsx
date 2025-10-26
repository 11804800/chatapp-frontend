import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6"
import { IoHeadset } from "react-icons/io5"
import { FormatTime, FormWaveSurfOptions } from "../AudioComponent/AudioComponent";
import WaveSurfer from "wavesurfer.js";

function RenderAudio({ media }: any) {

    const [playing, setPlaying] = useState<boolean>(false);
    const [currentDuration, setCurrentDuration] = useState(0);
    const [duration, setDuration] = useState(0);
    const WaveSurfRef = useRef<any>(null);
    const WaveFormRef = useRef<any>(null);

    function PlayPauseAudio() {
        WaveFormRef.current.playPause();
        setPlaying(!playing);
    }

    useEffect(() => {
        const Options: any = FormWaveSurfOptions(WaveSurfRef.current);
        WaveFormRef.current = WaveSurfer.create(Options);
        WaveFormRef.current.load(import.meta.env.VITE_AUDIO_URL + "/uploads/" + media);

        WaveFormRef.current.on("ready", () => {
            setDuration(WaveFormRef.current.getDuration())
        });
        WaveFormRef.current.on("audioprocess", () => {
            setCurrentDuration(WaveFormRef.current.getCurrentTime());
        });
        WaveFormRef.current.on("finish", () => {
            setPlaying(false);
        });

        return () => {
            if (WaveFormRef.current) {
                WaveFormRef.current?.un("audioprocess")
                WaveFormRef.current?.destroy();
            }
        }
    }, []);

    return (
        <>
            <div className="flex gap-2 items-center p-1">
                <div className="bg-[#ffad1f] rounded-full p-2 text-white">
                    <IoHeadset size={24} />
                </div>
                <button className="flex text-zinc-600" onClick={PlayPauseAudio}>
                    {
                        !playing ?
                            <FaPlay /> :
                            <FaPause />
                    }
                </button>
                <div className="flex items-center overflow-hidden h-[40px]">
                    <div className="w-[140px] md:w-[180px]" ref={WaveSurfRef}></div>
                </div>
            </div>
            <div className="text-[13px] text-zinc-600 absolute bottom-0 left-16">{playing ? FormatTime(currentDuration) : FormatTime(duration)}</div>
        </>
    )
}

export default RenderAudio