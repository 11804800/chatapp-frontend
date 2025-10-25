import { BsCheck2Square, BsDashCircle, BsThreeDotsVertical } from "react-icons/bs"
import { FaRegTimesCircle, FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import { BiArrowBack, BiInfoCircle, BiTrash } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { removeContact, setRecipientName } from "../../redux/User";
import { IoSearchSharp } from "react-icons/io5";
import { deleteMessages, filterMessage, setSelectedMessages, toggleSelectMessage } from "../../redux/message";
import { AxiosVite } from "../../utils/Axios";
import { LiaTimesSolid } from "react-icons/lia";
import { toggleContactInfo } from "../../redux/Contact";


function RenderRecipentHeaderOptions({ setDeleteMessage }: any) {

  const Recipent: any = useSelector((state: RootState) => {
    return state.user.recipientName
  });

  const optionref: any = useRef(null);
  const dispatch = useDispatch();

  const [showOptionsOpen, setShowOptions] = useState(false);
  function OpenOptionModal() {
    setShowOptions(true);
  }

  const selectMessage: boolean = useSelector((state: RootState) => {
    return state.message.selectMessage
  });


  const token: any = useSelector((state: RootState) => {
    return state.user.token
  });

  const SelectedMessage: any = useSelector((state: RootState) => {
    return state.message.selectedMessage
  });

  function DeleteMessage() {
    setDeleteMessage(true);
    const body = {
      idArray: SelectedMessage
    };
    AxiosVite.put("/messages/hide", body, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response: any) => {
      if (response) {
        dispatch(toggleSelectMessage());
        dispatch(deleteMessages(SelectedMessage));
        dispatch(setSelectedMessages());
        setDeleteMessage(false);
      }
    }).catch((err: any) => {
      console.log(err.message);
      setDeleteMessage(false);
    });
  }

  function DeleteChat() {

    AxiosVite.delete(`/users/contact/${Recipent}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response: any) => {
      if (response) {
        dispatch(removeContact(Recipent));
        dispatch(setRecipientName(""));
      }
    }).catch((err: any) => {
      console.log(err.message);
    });
  }


  function ClearChat() {
    setShowOptions(false);
    const body = {
      contact: Recipent
    }
    AxiosVite.put(`/messages/clear-chat`, body, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response: any) => {
      if (response) {
        dispatch(filterMessage(Recipent));
      }
    }).catch((err: any) => {
      console.log(err.message);
    });
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

  if (selectMessage) {
    return (
      <div className="flex gap-10">
        {
          SelectedMessage.length <= 10 &&
          <button onClick={DeleteMessage} className="px-2 py-2 active:bg-transparent hover:bg-zinc-200 rounded-full"><BiTrash size={24} /></button>
        }
        <button className="px-2 py-2 active:bg-transparent hover:bg-zinc-200 rounded-full" onClick={() => {
          dispatch(setSelectedMessages());
          dispatch(toggleSelectMessage());
        }}><LiaTimesSolid size={24} /></button>
      </div>
    )
  }
  else {
    return (
      <div className="flex gap-10">
        <button className="px-3 shrink-0 py-2 active:bg-transparent hover:bg-zinc-200 rounded-full md:flex hidden items-center"><IoSearchSharp size={21} /></button>
        <div className="relative flex items-center">
          <button onClick={OpenOptionModal} className="px-2 py-2 active:bg-transparent hover:bg-zinc-200 rounded-full">
            <BsThreeDotsVertical size={28} />
          </button>
          {
            showOptionsOpen &&
            <div ref={optionref} id="recipent-chat-options" className="p-3 shadow-2xl rounded-xl overflow-hidden absolute bg-white right-1 z-10 top-5">
              <ul className="flex flex-col gap-2">
                <li>
                  <button onClick={() => { setShowOptions(false); dispatch(toggleContactInfo()); }} className="text-nowrap hover:bg-zinc-100 active:bg-white w-full px-6 py-2 text-left text-sm rounded-md flex items-center gap-2">
                    <BiInfoCircle size={18} />
                    Contact info
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    setShowOptions(false);
                    dispatch(toggleSelectMessage())
                  }} className="text-nowrap hover:bg-zinc-100 active:bg-white w-full px-6 py-2 text-left text-sm rounded-md flex items-center gap-2">
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
                  <button onClick={ClearChat} className="text-nowrap hover:bg-zinc-100 active:bg-white w-full px-6 py-2 text-left text-sm rounded-md flex items-center gap-2">
                    <BsDashCircle size={18} />
                    Clear Chat
                  </button>
                </li>
                <li>
                  <button onClick={DeleteChat} className="text-nowrap hover:bg-zinc-100 active:bg-white w-full px-6 py-2 text-left text-sm rounded-md flex items-center gap-2">
                    <BiTrash size={20} />
                    Delete Chat
                  </button>
                </li>
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
}

function RecipentHeader() {


  const [DeletingMessage, setDeleteMessage] = useState(false);

  const dispatch = useDispatch();

  const recipientName: string | null = useSelector((state: RootState) => {
    return state.user.recipientName
  });

  const contact: any = useSelector((state: RootState) => {
    return state.user.contact
  });

  const ReciverData = contact.find((item: any) => item.userId?._id == recipientName);


  const SelectedMessages: any = useSelector((state: RootState) => {
    return state.message.selectedMessage
  });

  return (
    <>
      <div className="shrink-0 w-full p-2 flex items-center shadow-lg">
        <button className="flex lg:hidden" onClick={() => dispatch(setRecipientName(""))}>
          <BiArrowBack size={24} />
        </button>
        {
          ReciverData?.userId.image
            ?
            <img src={import.meta.env.VITE_IMAGE_URL + ReciverData?.userId?.image} className="w-15 h-15 rounded-full shrink-0 p-1 object-cover" />
            :
            <div className="bg-zinc-200 p-3 rounded-full text-zinc-600">
              <FaUser size={28} />
            </div>
        }
        <div className="flex justify-between p-2 w-full">
          <div className="flex flex-col">
            <p className="font-medium line-clamp-1">{ReciverData?.userId?.firstname}{" "}{ReciverData?.userId?.lastname}</p>
            <button onClick={() => dispatch(toggleContactInfo())} className="line-clamp-1 text-[12px] text-teal-600 hover:text-green-700 active:text-[brown]">click here for contact info</button>
          </div>
          <RenderRecipentHeaderOptions setDeleteMessage={setDeleteMessage} />
        </div>
      </div>
      {
        DeletingMessage &&
        <div className="w-full h-full absolute top-0 left-0 bg-black/25 z-[999] flex justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md w-[300px] h-[150px] flex justify-center items-center flex-col gap-5">
            <p className="text-md">Deleting {SelectedMessages?.length} Messages</p>
            <div className="w-full">
              <div className="flex w-full h-1 overflow-hidden rounded-md bg-zinc-200">
                <div className="bg-blue-800 loading2"></div>
              </div>
            </div>
          </div>
        </div>
      }
      {
        SelectedMessages.length == 10 &&
        <div className="w-full py-1 px-4 text-[12px]">
          You can only select 10 messages
        </div>
      }
    </>
  )
}

export default RecipentHeader