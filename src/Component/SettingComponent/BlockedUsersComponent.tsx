import { useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi"
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";


function BlockedUsersComponent({setBlockedContact}:any) {

    const UnBlockOptionRef: any = useRef(null);
    const [UnblockOptionActive, setUnblockOption] = useState(false);
    useEffect(() => {
        if (!UnblockOptionActive) return;
        const handler = (e: any) => {
            if (UnBlockOptionRef.current && !UnBlockOptionRef.current.contains(e.target)) {
                setUnblockOption(false);
            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }

    }, [UnblockOptionActive]);

    return (
        <>
            <div className="absolute top-0 left-0 bg-white p-2 w-full h-full flex flex-col gap-2">
                <div className="flex items-center gap-4 font-medium text-xl">
                    <button onClick={()=>setBlockedContact(false)}>
                        <BiArrowBack size={21} />
                    </button>
                    <h1>Blocked Contacts</h1>
                </div>
                <div className="flex flex-col">
                    <div className="border-b py-2 border-zinc-300">
                        <button className="flex items-center gap-2 font-medium text-zinc-700 py-4 px-4  w-full">
                            <FaUserPlus size={21} />
                            Add Blocked Contacts
                        </button>
                    </div>
                    <div className="py-4 overflow-y-scroll Scroll-Container h-[65%] flex flex-col gap-1">
                        <div className="py-2 flex items-center ">
                            <span className="text-zinc-400 bg-zinc-100 p-4 block w-fit rounded-full border border-zinc-300">
                                <FaUser size={24} />
                            </span>
                            <div className="flex flex-col px-2 w-full">
                                <p className="font-medium">Name</p>
                                <p className="text-zinc-500 text-sm">About</p>
                            </div>
                            <button onClick={() => setUnblockOption(true)} className="text-3xl px-2 text-zinc-700">
                                &times;
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-center text-sm pt-4 pb-2 bottom-6 absolute left-0 w-full">
                    Blocked Contacts will no longer be able to send you messages
                </p>
            </div>
            {
                UnblockOptionActive &&
                <div className="w-full h-screen fixed left-0 top-0 bg-black/15 flex justify-center items-center">
                    <div ref={UnBlockOptionRef} className="bg-white w-[90%] md:w-[500px] h-[200px] rounded-2xl p-5 flex flex-col justify-between">
                        <p className="font-medium text-xl px-4 py-2 text-zinc-700">Unblock  Nikhil?</p>
                        <div className="flex justify-end gap-8">
                            <button onClick={() => setUnblockOption(false)} className="bg-zinc-100 font-medium text-sm text-zinc-500 px-4 py-2 rounded-2xl">
                                Cancel
                            </button>
                            <button className="text-sm font-medium text-white bg-green-600 px-4 py-2 rounded-2xl">
                                Unblock
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default BlockedUsersComponent