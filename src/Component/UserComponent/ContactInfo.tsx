import { useDispatch, useSelector } from "react-redux";
import { toggleContactInfo } from "../../redux/Contact";
import { FaArrowLeftLong } from "react-icons/fa6";
import type { RootState } from "../../redux/Store";
import { FaUser } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { setRecipientName } from "../../redux/User";

function ContactInfo() {
    const dispatch = useDispatch();
    const recipentName: string | null = useSelector((state: RootState) => {
        return state.user.recipientName
    });

    const Contact: any = useSelector((state: RootState) => {
        return state.user.contact
    });

    const UserInfo: any = Contact.find((item: any) => item.userId._id == recipentName);
    return (
        <div className='absolute w-full h-full bg-white flex flex-col gap-12'>
            <div className="px-4 bg-zinc-100 py-4 flex items-center gap-4">
                <button onClick={() => dispatch(toggleContactInfo())}>
                    <FaArrowLeftLong />
                </button>
                <p className="font-medium">Contact Info</p>
            </div>
            <div className="flex flex-col px-3 py-3 w-full h-full gap-12">
                <div className="flex justify-center items-center w-full p-5">
                    {
                        UserInfo?.userId.image ?
                            <div className="flex justify-center flex-col items-center gap-2">
                                <img src={import.meta.env.VITE_IMAGE_URL + UserInfo.userId.image} className="w-[200px] h-[200px] object-cover rounded-full" />
                            </div> :
                            <div className="rounded-full bg-zinc-100 w-fit text-zinc-500 p-5 overflow-hidden">
                                <FaUser size={150} />
                            </div>
                    }
                </div>
                <div className="flex justify-center items-center gap-4">
                    <div className="flex gap-2 font-medium">
                        <p>{UserInfo?.userId?.firstname}</p>
                        <p>{UserInfo?.userId.lastname}</p>
                    </div>
                </div>
                <div className="p-3">
                    <div className="flex flex-col justify-start gap-4 px-1 border-b border-zinc-300">
                        <p className="font-medium self-start">Description</p>
                        <div className="flex gap-2">
                            <p>{UserInfo?.userId.description}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-start items-start p-5">
                    <button onClick={() => {
                        dispatch(setRecipientName(""));
                        dispatch(toggleContactInfo())
                    }} className="text-[brown] hover:bg-zinc-200 px-2 py-2 rounded-md flex gap-1 items-center text-md active:bg-transparent">
                        <LiaTimesSolid /> Close Chat</button>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo