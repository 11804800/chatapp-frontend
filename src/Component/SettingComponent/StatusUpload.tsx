import { IoSend } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { useRef } from "react";
import { AxiosVite } from "../../utils/Axios";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/Store";

function RenderFile({ file }: any) {
    const fileType: string = file.type;

    const url: any = URL.createObjectURL(file);

    if (fileType.startsWith("image/")) {
        return (
            <img src={url} className="w-full h-full object-cover" />
        )
    }
    else {
        return (
            <video src={url} className="w-full h-full object-cover" controls />
        )
    }
}

function StatusUpload({ file, setStatusActive }: any) {

    const StatusInputRef: any = useRef(null);

    const token: string | null = useSelector((state: RootState) => {
        return state.user.token
    });

    function UploadStatus() {
        const form = new FormData();
        form.append("text", "text");
        form.append("media", file);
        form.append("mediaType", file.type.startsWith("image/") ? "image" : "video")
        AxiosVite.post("/status", form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `bearer ${token}`
            },
        }).then((response) => {
            if (response) {
                setStatusActive(false);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='h-screen w-full fixed top-0 left-0 bg-white p-4'>
            <div className="">
                <button onClick={() => setStatusActive(false)} className="text-[45px] text-zinc-600  leading-[0.8]">
                    &times;
                </button>
            </div>
            <div className="flex flex-col gap-5 w-full justify-center items-center h-[80%]">
                <div className="w-[400px] h-[400px]">
                    <RenderFile file={file} />
                </div>
                <div className="w-full md:w-[70%] xl:w-[50%] px-8 md:px-2">
                    <input type="text" placeholder="Add a caption" className="font-medium outline-none bg-zinc-100 w-full py-3 px-4 rounded-md" />
                </div>
            </div>
            <div className="flex w-full border-t border-zinc-300 items-center pt-8 px-8">
                <div className="flex gap-4 w-full justify-center">
                    <div className="w-[50px] h-[50px] rounded-md">
                        <RenderFile file={file} />
                    </div>
                    <button onClick={() => { StatusInputRef.current.click() }} className="border rounded p-3 text-zinc-400">
                        <GoPlus size={28} />
                    </button>
                </div>
                <input type="file" accept="*" ref={StatusInputRef} className="hidden" />
                <button onClick={UploadStatus} className="text-white w-fit h-fit bg-green-600 p-3 flex justify-center items-center rounded-full drop-shadow-xl">
                    <IoSend size={28} />
                </button>
            </div>
        </div>
    )
}

export default StatusUpload