import { useContext, useEffect, useRef, useState } from "react";
import { FaHeadphones } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toggleUploadMedia } from "../../redux/message";
import { SocketContext } from "../../SocketProvider/SockerProvider";

function MediaMessage({ setShowMediaOptions }: any) {

    const [FileUploadError, setFileUploadError] = useState<string | null>(null);
    const OptionsRef = useRef<any>(null);
    const AudioInputRef = useRef<any>(null);
    const MediaRef = useRef<any>(null);
    const dispatch = useDispatch();


    const { setFile }: any = useContext(SocketContext);
    useEffect(() => {
        const handler = (e: any) => {
            if (!OptionsRef.current.contains(e.target)) {
                setShowMediaOptions(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, []);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        const isImageOrVideo = file.type.startsWith('image/') || file.type.startsWith('video/') || file.type.startsWith('audio/');
        const isSizeValid = file.size <= 10 * 1024 * 1024;
        if (!isImageOrVideo) {
            setFileUploadError("File must be Audio,Image or video");

        }
        else if (!isSizeValid) {
            setFileUploadError("File must be less than 10mb");
        }
        else {
            setFile(e.target.files[0]);
            dispatch(toggleUploadMedia());
        }

    };

    useEffect(() => {
        if (FileUploadError) {
            setTimeout(() => {
                setFileUploadError(null);
            }, 1500);
        }
    }, [FileUploadError]);


    return (
        <>
            <div ref={OptionsRef} className="bg-white shadow-md w-fit absolute -top-34 gap-2 rounded-xl left-4 p-5 flex flex-col">
                <input type="file" onChange={handleFileChange} ref={MediaRef} accept="video/*,image/*" />
                <input type="file" onChange={handleFileChange} ref={AudioInputRef} accept="audio/*" style={{ display: "none" }} />
                <button onClick={() => {
                    MediaRef.current.click();
                    setShowMediaOptions(false);
                }} className="flex items-center gap-2 font-medium active:bg-transparent hover:bg-zinc-200 px-4 py-2 rounded-md">
                    <IoMdPhotos />
                    Photos & Videos
                </button>
                <hr className="text-zinc-300" />
                <button onClick={() => {
                    AudioInputRef.current.click();
                    setShowMediaOptions(false);
                }} className="flex items-center gap-2 font-medium active:bg-transparent hover:bg-zinc-200 px-4 py-2 rounded-md">
                    <FaHeadphones />
                    Audio
                </button>
            </div>
            {
                FileUploadError &&
                <div className="w-fit absolute -top-44 left-4 bg-black/65 text-white rounded-md pl-4 pr-12 py-3 text-sm font-light z-[99999]">
                    {FileUploadError}
                </div>
            }
        </>
    )
}

export default MediaMessage