import { BiArrowBack } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiBellOff } from "react-icons/bi";
function HeaderOption() {


    return (
        <div className="flex w-full justify-between px-2 py-3 items-center">
            <div className="flex gap-6 items-center">
                <button className="font-medium text-zinc-700 hover:bg-zinc-100 p-2 active:bg-transparent rounded-full">
                    <BiArrowBack size={22} />
                </button>
                <p className="font-medium text-xl px-2">2</p>
            </div>
            <div className="flex gap-10 items-center text-zinc-700 px-2">
                <button className="font-medium hover:bg-zinc-100 p-2 active:bg-transparent rounded-full">
                    <RiDeleteBin6Line size={22} />
                </button>
                <button className="font-medium hover:bg-zinc-100 p-2 active:bg-transparent rounded-full">
                    <BiBellOff size={22} />
                </button>
            </div>
        </div>
    )
}

export default HeaderOption