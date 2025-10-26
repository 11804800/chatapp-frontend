import { useDispatch } from "react-redux"
import RenderAudio from "./RenderAudio"
import { toggleCarousel } from "../../redux/message";
import { FaPlay } from "react-icons/fa";

function MediaContent({ item }: any) {

    const dispatch = useDispatch();

    if (item?.mediaType == "image") {
        return (
            <div onClick={() => dispatch(toggleCarousel())} className="md:w-[300px] w-[100%] h-[240px] md:h-[300px] flex overflow-hidden rounded">
                <img src={import.meta.env.VITE_IMAGE_URL + "/uploads/" + item.media} className="w-full h-full object-cover" />
            </div>
        )
    }
    else if (item?.mediaType == "audio") {
        return (
            <RenderAudio media={item.media} />
        )
    }
    else if (item?.mediaType == "video") {
        return (
            <div onClick={() => dispatch(toggleCarousel())} className="md:w-[300px] w-[100%] h-[240px] md:h-[300px] flex overflow-hidden rounded" >
                <video src={import.meta.env.VITE_IMAGE_URL + "/uploads/" + item?.media} className="w-full h-full object-cover relative" />
                <button className="absolute top-[40%] left-[40%] text-white bg-black/30 p-3 rounded-full">
                    <FaPlay />
                </button>
            </div>
        )
    }
}

export default MediaContent