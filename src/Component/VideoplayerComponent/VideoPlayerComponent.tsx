import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { RiFullscreenFill } from "react-icons/ri";
import { RiFullscreenExitLine } from "react-icons/ri";
import { FaVolumeMute } from "react-icons/fa";

const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

function VideoPlayerComponent({ media }: any) {

    const VideoRef = useRef<any>(null);
    const containerRef = useRef<any>(null);
    const [isPlaying, setPlaying] = useState(false);
    const [isFullScreen, setFullScreen] = useState(false);
    const [isMuted, setMuted] = useState(false);
    const [CurrentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    function handlePlayPause() {
        const video = VideoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setPlaying(!isPlaying);
    }

    function handleMute() {
        const video = VideoRef.current;
        if (!video) return;
        video.muted = !isMuted;
        setMuted(!isMuted);
    }


    const handleFullscreen = () => {
        const container = containerRef.current;
        if (!container) return;

        if (!isFullScreen) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            }
            setFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setFullScreen(false);
        }
    };

    const handleTimeUpdate = () => {
        if (VideoRef?.current) {
            setCurrentTime(VideoRef.current.currentTime);
        }
    }

    function handleLoadedMetaDeta() {
        if (VideoRef.current) {
            setDuration(VideoRef.current.duration);
        }
    }

    function handleProgressChange(e: any) {
        const video = VideoRef.current;
        if (video) {
            const newTime = (e.target.value / 100) * duration;
            video.currentTime = newTime;
        }
    }


    return (
        <div ref={containerRef} className="w-fit h-full relative ">
            <video onLoadedMetadata={handleLoadedMetaDeta} onTimeUpdate={handleTimeUpdate} ref={VideoRef} src={import.meta.env.VITE_IMAGE_URL + "/uploads/" + media} className="w-full h-full  relative" />
            <button onClick={handleFullscreen} className="text-white p-2 rounded-full hover:bg-black/30 absolute top-5 left-5 z-40 ">
                {
                    !isFullScreen ?
                        <RiFullscreenFill size={28} />
                        :
                        <RiFullscreenExitLine size={28} />
                }
            </button>
            <div className="bg-zinc-600/55 w-full p-2 flex items-center py-2 absolute bottom-0">
                <button onClick={handlePlayPause} className="text-white px-2 py-1">
                    {!isPlaying || CurrentTime == duration ? <FaPlay /> : <FaPause />}
                </button>
                <div className="flex items-center px-2 w-full gap-2">
                    <span className="text-white px-2">{isPlaying ? formatTime(CurrentTime) : formatTime(duration)}</span>
                    <input value={(CurrentTime / duration) * 100 || 0} onChange={handleProgressChange} type="range" className="w-full accent-zinc-600" />
                </div>
                <button onClick={handleMute} className={`${isMuted ? "text-white" : "text-zinc-300/80"} p-1`}>
                    <FaVolumeMute size={21} />
                </button>
            </div>
        </div>
    )
}

export default VideoPlayerComponent