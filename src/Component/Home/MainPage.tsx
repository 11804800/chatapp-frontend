import { BiCommentAdd, BiSearchAlt } from "react-icons/bi"
import { BsThreeDotsVertical } from "react-icons/bs"
import MessageSelect from "../UserComponent/MessageSelect"


function MainPage() {
    return (
        <div className="shrink-0 w-full md:w-[510px] h-[90%] md:h-full flex flex-col">
            <div className="w-full flex justify-between items-center px-4 py-4 shrink-0">
                <p className="font-bold text-[22px] leading-[0.8]"> ChatApp</p>
                <div className="flex gap-10">
                    <button>
                        <BiCommentAdd size={23} />
                    </button>
                    <button>
                        <BsThreeDotsVertical size={21} />
                    </button>
                </div>
            </div>
            <div className="px-4 py-2 shrink-0">
                <div className="w-full flex items-center gap-4 px-4 bg-zinc-100 rounded-full">
                    <BiSearchAlt />
                    <input type="text" className="w-full py-2 outline-none" placeholder="search or start a new chat" />
                </div>
            </div>
            <div className="Scroll-Container flex flex-col w-full overflow-y-auto h-full pb-4 p-3">
                <MessageSelect/>
                <MessageSelect/>
                <MessageSelect/>
                <MessageSelect/>
                <MessageSelect/>
                <MessageSelect/>
                <MessageSelect/>
                <MessageSelect/>
                <MessageSelect/>
                <MessageSelect/>
            </div>
        </div>
    )
}

export default MainPage