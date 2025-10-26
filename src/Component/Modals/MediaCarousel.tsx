import { GoDownload } from "react-icons/go"
import { IoMdClose } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import { toggleCarousel } from "../../redux/message";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { useState } from "react";
import { IoChevronBackCircle } from "react-icons/io5";
import { IoChevronForwardCircle } from "react-icons/io5";
import { DateFormatter, TimeFormatter } from "../../utils/Formatter";
import VideoPlayerComponent from "../VideoplayerComponent/VideoPlayerComponent";

function RenderMedia({ item }: any) {
    if (item?.mediaType == "image") {
        return (
            <div className="w-full h-full">
                <img src={import.meta.env.VITE_IMAGE_URL + "/uploads/" + item?.media} className="w-full h-full object-contain" />
            </div>
        )
    }
    else {
        return (
            <div className="w-full h-full flex justify-center">
                <VideoPlayerComponent media={item?.media} />
            </div>
        )
    }
}

function MediaCarousel() {

    const [mediaIndex, setIndex] = useState<number>(0);
    const dispatch = useDispatch();

    const RecipentName: string | null = useSelector((state: RootState) => {
        return state.user.recipientName
    });

    const Messages: any = useSelector((state: RootState) => {
        return state.message.messages
    });

    const Contact: any = useSelector((state: RootState) => {
        return state.user.contact
    });

    const FilterUser: any = Contact.find((item: any) => item?.userId?._id == RecipentName);

    const FilteredMessages: any = Messages.filter((item: any) => item.publisher == RecipentName || item.consumer == RecipentName);
    const MediaMessages: any = FilteredMessages.filter((item: any) => item?.mediaType == "image" || item?.mediaType == "video");

    function Download() {
        const url = `${import.meta.env.VITE_IMAGE_URL}/uploads/${MediaMessages[mediaIndex]?.media}`;
        const link: any = document.createElement("a");
        link.href = url;
        link.download = MediaMessages[mediaIndex]?.media;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function PrevIndex() {
        if (mediaIndex > 0) {
            setIndex(mediaIndex - 1);
        }
    }

    function NextIndex() {
        if (mediaIndex < MediaMessages.length - 1) {
            setIndex(mediaIndex + 1);
        }
    }

    return (
        <div className="p-2 h-full w-screen absolute top-0 left-0 flex flex-col gap-1 bg-black md:bg-white z-[9999]">
            <div className="w-full justify-between flex items-center px-2">
                <div className="flex gap-2 items-center p-1 text-xl">
                    <button onClick={() => dispatch(toggleCarousel())} className="text-white flex md:hidden">
                        <HiMiniArrowLeft />
                    </button>
                    <img src={import.meta.env.VITE_IMAGE_URL + FilterUser?.userId?.image} className="w-[50px] h-[50px] rounded-full object-cover hidden md:flex" />
                    <div className="text-sm font-medium text-white md:text-black px-1">
                        <p>{FilterUser?.userId?.firstname}{" "}{FilterUser?.userId?.lastname}</p>
                        <p className="text-zinc-500 text-[12px]">{DateFormatter(MediaMessages[mediaIndex]?.createdAt)}{" "}{TimeFormatter(MediaMessages[mediaIndex]?.createdAt)}</p>
                    </div>
                </div>
                <div className="flex gap-4 text-white md:text-black">
                    <button onClick={Download} className="text-xl p-2 rounded-full hover:bg-zinc-200 active:bg-transparent">
                        <GoDownload />
                    </button>
                    <button onClick={() => dispatch(toggleCarousel())} className="text-xl p-2 rounded-full hover:bg-zinc-200 active:bg-transparent hidden md:flex"><IoMdClose /></button>
                </div>
            </div>
            <div className="w-full h-[80%] flex gap-1">
                <button onClick={PrevIndex} className="text-zinc-500 drop-shadow active:drop-shadow-none active:scale-95"><IoChevronBackCircle size={34} /></button>
                <RenderMedia item={MediaMessages[mediaIndex]} />
                <button onClick={NextIndex} className="text-zinc-500 drop-shadow active:drop-shadow-none active:scale-95"><IoChevronForwardCircle size={34} /></button>
            </div>
            <div className="w-full p-1 hidden md:flex gap-2 justify-center">
                {
                    MediaMessages?.map((item: any, index: number) => {
                        if (item?.mediaType == "image") {
                            return (
                                <div onClick={() => setIndex(index)} key={item?._id}>
                                    <img src={import.meta.env.VITE_IMAGE_URL + "/uploads/" + item?.media} className="w-[50px] h-[50px] rounded-md object-cover" />
                                </div>
                            )
                        }
                        else {
                            return (
                                <div onClick={() => setIndex(index)} key={item?._id}>
                                    <video src={import.meta.env.VITE_IMAGE_URL + "/uploads/" + item?.media} className="w-[50px] h-[50px] rounded-md object-cover" />
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default MediaCarousel