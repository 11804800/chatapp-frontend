import { useEffect, useRef, useState } from "react"
import { FaUser } from "react-icons/fa"
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router";

function ProfileSetup({ setAccountCreated }) {
    const [name, setName] = useState<string>("Nikhil Pathak");
    const [about, setAbout] = useState<string>("");
    const [Image, setImage] = useState(null);
    const [FileUploadError, setFileUploadError] = useState<string | null>(null);
    const ImageUploadRef: any = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (FileUploadError) {
            setTimeout(() => {
                setFileUploadError(null);
            }, 1500);
        }
    }, [FileUploadError]);

    function UploadFile(e: any) {
        const file = e.target.files[0];
        const isImage = file.type.startsWith("image/");
        const FileSize = file.size <= 2 * 1024 * 1024;
        if (!isImage) {
            setFileUploadError("File must an image");
        }
        else if (!FileSize) {
            setFileUploadError("File must be less than eqaul 2mb");
        }
        else {
            setImage(file);
        }

    }
    return (
        <>
            <div className="w-full absolute top-0 left-0 h-screen flex justify-center items-center bg-white">
                <div className="w-[90%] md:w-[500px] flex flex-col gap-5 justify-center items-center bg-white shadow rounded-2xl py-8 px-4">
                    <input ref={ImageUploadRef} type="file" accept="image/*" onChange={UploadFile} className="hidden" />
                    {
                        Image ?
                            <div className="relative w-35 h-35 ">
                                <span className="block text-lg absolute right-2 top-2">
                                    <MdOutlineEdit />
                                </span>
                                <img src={URL.createObjectURL(Image)} className="rounded-full  h-full w-full object-cover" />
                            </div>
                            :
                            <div onClick={() => { ImageUploadRef.current.click() }} className="p-5 bg-zinc-200 rounded-full text-[100px] text-zinc-500 w-fit relative">
                                <span className="block text-lg absolute right-2 top-2">
                                    <MdOutlineEdit />
                                </span>
                                <FaUser />
                            </div>
                    }
                    <div className="flex flex-col gap-8 py-7 px-2 w-full">
                        <div className="rounded-md">
                            <input type="text" value={name} onChange={(e: any) => setName(e.target.value)} placeholder="full name" className="font-medium py-2 px-4 w-full border-b border-zinc-400 outline-none focus:border-b-2 focus:border-black" />
                        </div>
                        <div className="rounded-md">
                            <input value={about} onChange={(e: any) => setAbout(e.target.value)} className="py-2 px-4 w-full border-b outline-none focus:border-b-2 focus:border-black border-zinc-400 font-medium" type="text" placeholder="about" />
                        </div>
                    </div>
                    <div className="pt-6 px-2 flex justify-end w-full">
                        <button onClick={() => { navigate('/') }} className="hover:bg-black/85 active:bg-black active:shadow-none bg-black text-white font-medium px-4 py-2 rounded-md shadow-xl">
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
            {
                FileUploadError &&
                <div className="w-fit  bg-black/65 text-white rounded-md pl-4 pr-12 py-3 text-sm font-light fixed z-50 bottom-8 left-8">
                    {FileUploadError}
                </div>
            }
        </>
    )
}

export default ProfileSetup