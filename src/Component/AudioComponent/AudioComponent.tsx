import { BiPauseCircle } from "react-icons/bi"
import { IoSend } from "react-icons/io5"
import { FaPause, FaPlay, FaRegTrashAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useContext, useEffect, useRef, useState } from "react";
import { MdMic } from "react-icons/md"
import WaveSurfer from "wavesurfer.js";
import CanvasComponent from "./CanvasComponent";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/Store";
import { addNewMessage } from "../../redux/message";
import { setLastMessage } from "../../redux/User";
import { AxiosVite } from "../../utils/Axios";
import { SocketContext } from "../../SocketProvider/SockerProvider";


export function FormatTime(seconds: any) {
    let date: any = new Date(seconds);
    date.setSeconds(seconds);
    return date.toISOString().substr(15, 4);
}

export const FormWaveSurfOptions = (ref: any) => ({
    container: ref,
    waveColor: "#ccc",
    progressColor: "#000",
    cursorColor: "green",
    normalize: true,
    backend: "WebAudio",
    barGap: 3,
    barWidth: 2,
    responsive: true,
    height: 20
});

function AudioComponent({ startRecording, setStartRecording }: any) {

    const [elapsedTime, setElapsedTime] = useState(0);
    const [mediaStream, setMediaStream] = useState<any>(null);
    const [mediaRecord, setMediaRecorder] = useState<any>(null);
    const [blob, setBlob] = useState<any>(null);
    const IntervalRef = useRef<any>(null);
    let chunks: any = [];

    const waveSurfRef = useRef<any>(null);
    const waveformRef = useRef<any>(null);
    const [playing, setPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const dispatch = useDispatch();

    const Reciver: any = useSelector((state: RootState) => {
        return state.user.recipientName
    });

    const token: string | null = useSelector((state: RootState) => {
        return state.user.token
    });

    const { socket }: any = useContext(SocketContext);

    useEffect(() => {
        if (blob != null && startRecording) {
            const options: any = FormWaveSurfOptions(waveformRef.current);
            waveSurfRef.current = WaveSurfer.create(options);
            waveSurfRef.current.load(URL.createObjectURL(blob));

            waveSurfRef.current.on("ready", () => {
                setDuration(waveSurfRef.current.getDuration());
            });
            waveSurfRef.current.on("audioprocess", () => {
                setCurrentTime(waveSurfRef.current.getCurrentTime());
            });

            waveSurfRef.current.on("finish", () => {
                setPlaying(false);
            });

            return () => {
                waveSurfRef.current.un("ready");
                waveSurfRef.current.un("audioprocess");
                waveSurfRef.current.destroy();
            }
        }

    }, [blob]);

    function PlayPause() {
        setPlaying(!playing);
        waveSurfRef.current.playPause();
    }

    function StartRecording() {
        setStartRecording(true);
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        }).then((mediaStreamObj: any) => {
            const MediaRec: any = new MediaRecorder(mediaStreamObj);
            setMediaRecorder(MediaRec);
            setMediaStream(mediaStreamObj);

            MediaRec.start();

            MediaRec.ondataavailable = (e: any) => {
                chunks.push(e.data);
            }

            MediaRec.onstop = () => {
                const blob1: any = new Blob(chunks, { type: "audio/mpeg" });
                setBlob(blob1);
                chunks = [];
                if (IntervalRef.current) clearInterval(IntervalRef.current);
            }
        }).catch((err: any) => {
            console.log(err);
            if (IntervalRef.current) clearInterval(IntervalRef.current);
        });

        if (IntervalRef.current) clearInterval(IntervalRef.current);
        IntervalRef.current = setInterval(() => {
            setElapsedTime((prev: any) => prev + 1);
        }, 1000);
    }


    function StopRecording() {
        mediaStream.getTracks().forEach((tracks: any) => {
            tracks.stop();
        });
        mediaRecord.stop();
    }

    function DeleteRecording() {
        setBlob(null);
        setMediaRecorder(null);
        setMediaStream(null);
        setStartRecording(false);
        setElapsedTime(0);
    }

    function PostRecording() {
        setStartRecording(false);
        const formData: any = new FormData();
        formData.append("audio", blob);
        formData.append("consumer", Reciver);
        formData.append("mediaDuration", FormatTime(elapsedTime));

        AxiosVite.post("/messages/media", formData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response: any) => {
            dispatch(addNewMessage(response.data.data));
            dispatch(setLastMessage({ id: Reciver, mediaDuration: FormatTime(elapsedTime), mediaType: "audio", lastMessageTime: new Date().toISOString() }));
            socket.emit("media-message", { data: { ...response.data.data, message: FormatTime(elapsedTime) } });
        }).catch((err: any) => {
            console.log(err.response.data);
        });
        DeleteRecording();
    }


    if (!startRecording) {
        return (
            <button onClick={StartRecording} className="p-2 hover:bg-green-600 active:shadow-none rounded-full active:bg-green-700 bg-green-700 text-white shadow-xl">
                <MdMic size={24} />
            </button>
        )
    }
    else {
        return (
            <div className="bg-white w-full shadow-2xl border-t border-zinc-200 md:p-2  md:bg-zinc-200 flex flex-col sm:flex-row items-center">
                <div className="p-2 w-full bg-white md:rounded-full px-2 md:px-4 flex justify-end items-center">
                    <div className="flex flex-col sm:flex-row w-full gap-4 md:pb-0 pb-2 md:gap-2 sm:w-[80%] md:w-[90%] xl:w-[50%]">
                        {
                            blob ?
                                <div className="w-full flex items-center gap-3 px-4">
                                    {
                                        blob &&
                                        <button onClick={DeleteRecording} className="text-[brown] hidden sm:flex p-3 hover:bg-zinc-300 rounded-full">
                                            <FaRegTrashAlt size={22} />
                                        </button>
                                    }
                                    <div ref={waveformRef} className="w-full">
                                    </div>
                                    {
                                        playing ?
                                            <p>{FormatTime(currentTime)}</p>
                                            :
                                            <p>{FormatTime(duration)}</p>
                                    }
                                </div>
                                :
                                <div className="w-full flex items-center gap-2 px-4">
                                    <div className="flex gap-2 items-center">
                                        <GoDotFill />
                                        <p>{FormatTime(elapsedTime)}</p>
                                    </div>
                                    <CanvasComponent mediaStream={mediaStream} />
                                </div>
                        }
                        <div className="flex gap-2 px-2 items-center w-full sm:w-fit justify-between">
                            {
                                blob &&
                                <button onClick={DeleteRecording} className="text-[brown] p-3 hover:bg-zinc-300 rounded-full flex sm:hidden">
                                    <FaRegTrashAlt size={22} />
                                </button>
                            }
                            {
                                blob ?
                                    <button className="p-2 hover:bg-zinc-300 rounded-full" onClick={PlayPause}>
                                        {playing ?
                                            <FaPause /> : <FaPlay />}
                                    </button>
                                    :
                                    <button onClick={StopRecording} className="p-2 hover:bg-zinc-300 rounded-full">
                                        <BiPauseCircle size={28} />
                                    </button>
                            }
                            {
                                blob &&
                                <button onClick={PostRecording} className="p-2 rounded-full bg-green-700 hover:bg-green-600 shadow-xl text-white active:shadow-none">
                                    <IoSend size={28} />
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default AudioComponent