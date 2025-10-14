import { BiCheckSquare, BiCommentAdd } from "react-icons/bi"
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs"
import RecipentList from "../UserComponent/RecipentList"
import { useDispatch, useSelector } from "react-redux"
import { setShowContactModal, toggleSelectContact } from "../../redux/Contact";
import { LuLogOut } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import type { RootState } from "../../redux/Store";
import { Logout } from "../../redux/User";
import { LiaTimesSolid } from "react-icons/lia";
import { FiTrash2 } from "react-icons/fi";


function MainPage() {
    const dispatch = useDispatch();
    const OptionRef: any = useRef(null);
    const [showOption, setShowOption] = useState(false);

    const recipientName: string | null = useSelector((state: RootState) => {
        return state.user.recipientName
    });

    const SelectContact = useSelector((state: RootState) => {
        return state.contact.selectContact
    });


    useEffect(() => {
        if (!showOption) return;
        const handler = (e: any) => {
            if (OptionRef.current && !OptionRef.current.contains(e.target)) {
                setShowOption(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [showOption]);

    return (
        <div className={`shrink-0 w-full md:w-[350px] relative lg:w-[450px] xl:w-[510px] h-full ${recipientName ? "hidden md:flex" : "flex"} flex-col`}>
            <div className="w-full flex justify-between items-center px-4 py-3 shrink-0">
                <p className="font-bold text-[22px] leading-[0.8]"> ChatApp</p>
                {
                    SelectContact ?
                        <div className="flex gap-15 pr-8">
                            <button className="hover:bg-zinc-200 p-2 rounded-full active:bg-zinc-100" >
                                <FiTrash2 size={23} />
                            </button>
                            <button className="hover:bg-zinc-200 p-2 rounded-full active:bg-zinc-100" onClick={() => dispatch(toggleSelectContact())}>
                                <LiaTimesSolid size={23} />
                            </button>
                        </div> :
                        <div className="flex gap-10">
                            <button onClick={() => dispatch(setShowContactModal())} className="hover:bg-zinc-200 p-2 rounded-full active:bg-zinc-100">
                                <BiCommentAdd size={23} />
                            </button>
                            <div className="relative">
                                <button onClick={() => setShowOption(true)} className="hover:bg-zinc-200 p-2 rounded-full active:bg-zinc-100">
                                    <BsThreeDotsVertical size={21} />
                                </button>
                                {
                                    showOption &&
                                    <div ref={OptionRef} className="absolute top-9 right-0 md:left-0 p-4 flex flex-col gap-2 rounded-md drop-shadow-2xl bg-white w-[200px]">
                                        <button onClick={() => dispatch(toggleSelectContact())} className="flex active:bg-transparent text-sm gap-2 items-center pr-8 py-2 pl-2 rounded-md text-nowrap hover:bg-zinc-100">
                                            <BiCheckSquare />
                                            Select Chats
                                        </button>
                                        <button onClick={() => dispatch(Logout())} className="flex text-sm active:bg-transparent gap-2 items-center text-nowrap pr-8 pl-2 rounded-md py-2 hover:bg-zinc-100">
                                            <LuLogOut />
                                            Logout
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                }
            </div>
            <div className="px-4 py-2 shrink-0">
                <div className="w-full flex items-center gap-4 px-4 bg-zinc-100 rounded-full">
                    <IoSearchOutline />
                    <input type="text" className="w-full py-2 outline-none" placeholder="search or start a new chat" />
                </div>
            </div>
            <div className="Scroll-Container flex flex-col w-full overflow-y-auto h-full pb-4 p-3">
                <RecipentList />
            </div>
        </div>
    )
}

export default MainPage