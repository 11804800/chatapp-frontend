import { IoSend } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import { useContext, useState } from "react"
import { SocketContext } from "../../SocketProvider/SockerProvider"
import { FaTimes } from "react-icons/fa"
import { addNewMessage, toggleUploadMedia } from "../../redux/message"
import { AxiosVite } from "../../utils/Axios"
import { setLastMessage } from "../../redux/User";

function RenderMedia({ mediaType, media }: any) {
    if (mediaType.includes("audio")) {
        return (
            <div className="p-2 flex items-center justify-center h-[58%] w-full">
                <audio src={media} controls />
            </div>
        )
    }
    else if (mediaType.includes("image")) {
        return (
            <div className="p-2 flex items-center justify-center h-[58%] w-full">
                <img src={media} className="object-contain w-[80%] h-[80%] shadow" />
            </div>
        )
    }
    else {
        return (
            <div className="p-2 flex items-center justify-center h-[58%] w-full">
                <video controls src={media} className="object-contain w-[80%] h-[80%] shadow" />
            </div>
        )
    }
}
function UploadMedia() {


    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const { file, setFile, socket }: any = useContext(SocketContext);

    const token: string | null = useSelector((state: RootState) => {
        return state.user.token
    });

    const RecipentName: string | null = useSelector((state: RootState) => {
        return state.user.recipientName
    });


    function PostMedia() {

        const config: any = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const mediaType: string = file.type.includes("audio") ? "audio" : file.type.includes("image") ? "image" : "video";

        const formData: any = new FormData();
        formData.append("file", file);
        formData.append("consumer", RecipentName);
        formData.append("mediaType", mediaType);
        formData.append("message", message);

        AxiosVite.post("/messages", formData, config).then((response: any) => {
            dispatch(addNewMessage(response.data.data));
            dispatch(setLastMessage({ id: RecipentName, message: response.data.data.media, mediaType: mediaType, lastMessageTime: new Date().toISOString() }));
            socket.emit("send-file-message", { data: response.data.data });
            setFile(null);
            dispatch(toggleUploadMedia());
        }).catch((err: any) => {
            console.log(err);
        })
    }

    return (
        <div className='p-2 h-full w-full absolute top-19 bg-white left-0 z-[999] flex flex-col gap-1'>
            <div className="flex w-full justify-end p-2">
                <button onClick={() => dispatch(toggleUploadMedia())} className="p-2 rounded-full hover:bg-zinc-200 active:bg-transparent "><FaTimes size={24} /></button>
            </div>
            <RenderMedia mediaType={file.type} media={URL.createObjectURL(file)} />
            <div className="w-full flex justify-center items-center py-3">
                <input type="text" value={message} onChange={(e: any) => setMessage(e.target.value)} placeholder="type a message" className="bg-zinc-100 rounded-md px-4 py-3 w-[90%]" />
            </div>
            <div className="w-full flex justify-end px-5 py-2 ">
                <button onClick={PostMedia} className="bg-green-800 text-white p-2 rounded-full hover:bg-green-700 active:bg-green-800 shadow-md active:shadow-none">
                    <IoSend size={26} />
                </button>
            </div>
        </div>
    )
}

export default UploadMedia