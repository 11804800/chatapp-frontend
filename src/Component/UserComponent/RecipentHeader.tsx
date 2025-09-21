import { BsCheck2Square, BsDashCircle, BsThreeDotsVertical } from "react-icons/bs"
import { FaRegTimesCircle } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import { BiArrowBack, BiInfoCircle, BiTrash } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { setRecipientName } from "../../redux/User";
import { IoSearchSharp } from "react-icons/io5";


function RecipentHeader() {

  const optionref: any = useRef(null);
  const dispatch = useDispatch();

  const recipientName: string | null = useSelector((state: RootState) => {
    return state.user.recipientName
  });

  const [showOptionsOpen, setShowOptions] = useState(false);

  function OpenOptionModal() {
    setShowOptions(true);
  }

  useEffect(() => {
    if (!showOptionsOpen) return;
    const handler = (e: any) => {
      if (optionref.current && !optionref.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [showOptionsOpen]);


  return (
    <div className="shrink-0 w-full p-2 flex items-center shadow-lg">
      <button className="flex md:hidden" onClick={()=>dispatch(setRecipientName(""))}>
        <BiArrowBack size={24} />
      </button>
      <img src="../profile.jpg" className="w-15 h-15 rounded-full shrink-0 p-1 object-cover" />
      <div className="flex justify-between p-2 w-full">
        <div className="flex flex-col">
          <p className="font-medium">{recipientName}</p>
          <button className="text-[12px] text-teal-600 hover:text-green-700 active:text-[brown]">click here for contact info</button>
        </div>
        <div className="flex gap-10">
          <button className="px-3 shrink-0 py-2 active:bg-transparent hover:bg-zinc-200 rounded-full md:flex hidden items-center"><IoSearchSharp  size={21}/></button>
          <div className="relative flex items-center">
            <button onClick={OpenOptionModal} className="px-2 py-2 active:bg-transparent hover:bg-zinc-200 rounded-full">
              <BsThreeDotsVertical size={21} />
            </button>
            {
              showOptionsOpen &&
              <div ref={optionref} id="recipent-chat-options" className="p-3 shadow-2xl rounded-xl overflow-hidden absolute bg-white right-1 z-10 top-5">
                <ul className="flex flex-col gap-2">
                  <li>
                    <button className="text-nowrap hover:bg-zinc-100 active:bg-white w-full px-6 py-2 text-left text-sm rounded-md flex items-center gap-2">
                      <BiInfoCircle size={18} />
                      Contact info
                    </button>
                  </li>
                  <li>
                    <button className="text-nowrap hover:bg-zinc-100 active:bg-white w-full px-6 py-2 text-left text-sm rounded-md flex items-center gap-2">
                      <BsCheck2Square size={18} />
                      Select Messages
                    </button>
                  </li>
                  <li>
                    <button onClick={() => {
                      dispatch(setRecipientName(""))
                    }} className="text-nowrap hover:bg-zinc-100 active:bg-white w-full px-6 py-2 text-left text-sm rounded-md flex items-center gap-2">
                      <FaRegTimesCircle size={18} />
                      Close Chat
                    </button>
                  </li>
                  <li>
                    <button className="text-nowrap hover:bg-zinc-100 active:bg-white w-full px-6 py-2 text-left text-sm rounded-md flex items-center gap-2">
                      <BsDashCircle size={18} />
                      Clear Chat
                    </button>
                  </li>
                  <li>
                    <button className="text-nowrap hover:bg-zinc-100 active:bg-white w-full px-6 py-2 text-left text-sm rounded-md flex items-center gap-2">
                      <BiTrash size={20} />
                      Delete Chat
                    </button>
                  </li>
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipentHeader