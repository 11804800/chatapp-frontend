import { IoSend } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { useRef, useState } from "react";
import { AxiosVite } from "../../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/Store";
import { updateMyStatus } from "../../redux/status";

function RenderFile({ file, index, setIndex }: any) {
    const fileType: string = file.type;

    const url: any = URL.createObjectURL(file);

    if (fileType.startsWith("image/")) {
        return (
            <img onClick={() => setIndex(index)} src={url} className="w-full h-full object-cover" />
        )
    }
    else {
        return (
            <video src={url} onClick={() => setIndex(index)} className="w-full h-full object-cover" />
        )
    }
}

function StatusUpload({ file, setStatusActive }: any) {


    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [index, setIndex] = useState(0);

    const [items, setItems] = useState<any>([
        {
            file: file,
            caption: ""
        }
    ]);

    function SetFile(value: any) {
        setItems([...items, { file: value, caption: "" }]);
    }

    function setCaption(value: any) {
        const newItems = [...items];
        newItems[index].caption = value,
            setItems(newItems);
    }

    const StatusInputRef: any = useRef(null);

    const token: string | null = useSelector((state: RootState) => {
        return state.user.token
    });

    function UploadStatus() {
        setLoading(true);
        items.map((item: any) => {
            const form = new FormData();
            form.append("text", item?.caption);
            form.append("media", item?.file);
            form.append("mediaType", item?.file.type.startsWith("image/") ? "image" : "video")
            AxiosVite.post("/status", form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `bearer ${token}`
                },
            }).then((response) => {
                if (response) {
                    dispatch(updateMyStatus(response.data.data));
                }
            }).catch((err) => {
                console.log(err);
            })
        });
        setLoading(false);
        setStatusActive(false);
    }

    return (
        <div className='h-screen w-full fixed top-0 left-0 bg-white p-4 '>
            <div className="">
                <button onClick={() => setStatusActive(false)} className="text-[45px] text-zinc-600  leading-[0.8]">
                    &times;
                </button>
            </div>
            <div className="flex flex-col gap-5 w-full justify-center items-center h-[80%]">
                <div className="w-[400px] h-[400px]">
                    <RenderFile file={items[index].file} />
                </div>
                <div className="w-full md:w-[70%] xl:w-[50%] px-8 md:px-2">
                    <input value={items[index].caption} onChange={(e: any) => setCaption(e.target.value)} type="text" placeholder="Add a caption" className="font-medium outline-none bg-zinc-100 w-full py-3 px-4 rounded-md" />
                </div>
            </div>
            <div className="flex w-full border-t border-zinc-300 items-center pt-8 px-8">
                <div className="flex gap-4 w-full justify-center">
                    <div className="w-fit h-[50px] rounded-md flex justify-center flex-wrap gap-2">
                        {
                            items.map((item: any, i: number) => {
                                return (
                                    <div key={i} className="w-[50px] h-[50px] rounded-md">
                                        <RenderFile file={item.file} index={i} setIndex={setIndex} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <input type="file" accept="*" ref={StatusInputRef} onChange={(e: any) => SetFile(e.target.files[0])} className="hidden" />
                    <button onClick={() => { StatusInputRef.current.click() }} className="border rounded p-3 text-zinc-400">
                        <GoPlus size={28} />
                    </button>
                </div>
                <button onClick={UploadStatus} className="text-white w-fit h-fit bg-green-600 p-3 flex justify-center items-center rounded-full drop-shadow-xl">
                    <IoSend size={28} />
                </button>
            </div>
            {
                loading &&
                <div className="absolute top-0 left-0 h-screen w-full bg-black/40 flex justify-center items-center">
                    <div className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] animate-spin border-l-white  border-2 rounded-full">
                    </div>
                </div>
            }
        </div>
    )
}

export default StatusUpload