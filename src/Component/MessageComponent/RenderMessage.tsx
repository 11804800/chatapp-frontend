import { BiCheck, BiChevronDown, BiSmile } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import { useState } from "react";
import MessageOption from "./MessageOption";
import { CiClock2 } from "react-icons/ci";
import { BsCheck2All } from "react-icons/bs";
import { TimeFormatter } from "../../utils/Formatter";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { addToSelectedMessage } from "../../redux/message";

function RenderMessage({ item }: any) {

  const userData: any = useSelector((state: RootState) => {
    return state.user.userData
  });

  const [showMessageOption, setShowMessageOption] = useState(false);

  const ShowOptions = () => {
    const MessageContainer: any = document.getElementById("Message-Container");
    MessageContainer.style.overflowY = "hidden";
    setShowMessageOption(!showMessageOption)
  }

  const dispatch = useDispatch();

  const SelectMessage: boolean = useSelector((state: RootState) => {
    return state.message.selectMessage
  });

  const SelectedMessages: any = useSelector((state: RootState) => {
    return state.message.selectedMessage
  });


  if (item.consumer == userData?._id) {
    return (
      <div className={`${SelectedMessages.includes(item._id) && "bg-green-300/35"} w-full flex group justify-start relative`}>
        <div className="self-start flex px-2 drop-shadow relative shrink-0 overflow-hidden">
          {
            SelectMessage &&
            <button onClick={() => dispatch(addToSelectedMessage(item?._id))} className={`text-green-700`}>
              {
                SelectedMessages.includes(item._id) ?
                  <IoIosCheckbox />
                  :
                  <MdCheckBoxOutlineBlank />
              }
            </button>
          }
          <div className="rotate-45 translate-x-[8px] -translate-y-1.5 w-[12px] h-[12px] bg-white rounded"></div>
          <div className="bg-white font-medium px-2 py-1  w-fit  flex items-start rounded-md">
            <p className="px-2">{item.message}</p>
            <div className="flex gap-[2px] relative -bottom-1 h-full items-center px-2">
              <p className="text-[10px]">{TimeFormatter(item?.createdAt)}</p>
            </div>
          </div>
          <button onClick={ShowOptions} className="message-option-btn group-hover:flex hidden text-zinc-500 absolute right-2 top-0 bg-white">
            <BiChevronDown size={23} />
          </button>
        </div>
        <button className="text-zinc-500 group-hover:flex hidden justify-center items-center">
          <BiSmile />
        </button>
        {
          showMessageOption && <MessageOption showMessageOption={showMessageOption} setShowMessageOption={setShowMessageOption} ItemId={item._id} />
        }
      </div>
    )
  }
  else {
    return (
      <div className={`w-full flex group justify-end relative ${SelectedMessages.includes(item._id) && "bg-green-300/35"}`}>
        {
          SelectMessage &&
          <button onClick={() => dispatch(addToSelectedMessage(item?._id))} className={`text-green-700`}>
            {
              SelectedMessages.includes(item._id) ?
                <IoIosCheckbox />
                :
                <MdCheckBoxOutlineBlank />
            }
          </button>
        }
        <button className="text-zinc-500 group-hover:flex hidden justify-center items-center">
          <BiSmile />
        </button>
        <div className="relative  self-end flex  px-2 drop-shadow shrink-0 overflow-hidden">
          <div className="bg-[#d9fdd3] font-medium px-2 py-1  w-fit  flex items-start rounded-md">
            <p className="px-2">{item.message}</p>
            <div className="flex gap-[2px] relative -bottom-1 h-full items-center px-2">
              <p className="text-[10px]">{TimeFormatter(item?.createdAt)}</p>
              {
                !item.sent ?
                  <span>
                    <CiClock2 size={10} />
                  </span>
                  :
                  <>
                    {
                      item?.recived
                        ?
                        <>
                          {
                            item?.seen ?
                              <BsCheck2All color="blue" /> :
                              <BsCheck2All />
                          }
                        </>
                        : <BiCheck />
                    }
                  </>
              }
            </div>
          </div>
          <div className="rotate-45 -translate-x-[8px] -translate-y-1.5 w-[12px] h-[12px] bg-[#d9fdd3] rounded"></div>
          <button onClick={ShowOptions} className="message-option-btn group-hover:flex text-zinc-500 hidden absolute right-5 top-0 bg-[#d9fdd3]">
            <BiChevronDown size={23} />
          </button>
        </div>
        {
          showMessageOption && <MessageOption showMessageOption={showMessageOption} setShowMessageOption={setShowMessageOption} ItemId={item._id} />
        }
      </div>
    )
  }
}

export default RenderMessage