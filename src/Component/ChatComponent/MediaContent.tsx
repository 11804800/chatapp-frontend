import { useDispatch } from "react-redux"
import RenderAudio from "./RenderAudio"
import { toggleCarousel } from "../../redux/message";

function MediaContent({ item }: any) {

    const dispatch = useDispatch();

    if (item?.mediaType == "image") {
        return (
            <div onClick={() => dispatch(toggleCarousel())} className="w-[300px] h-[300px] flex overflow-hidden rounded">
                <img src={import.meta.env.VITE_IMAGE_URL + "/" + item.media} className="w-full h-full object-cover" />
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
            <div onClick={() => dispatch(toggleCarousel())} >
                Video
            </div>
        )
    }
}

export default MediaContent