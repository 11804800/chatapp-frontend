import { BiPlus } from "react-icons/bi"
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store";
import { useContext, useState } from "react";
import { addNewMessage, setMessageId, toggleReply } from "../../redux/message";
import { SocketContext } from "../../SocketProvider/SockerProvider";
import { setLastMessage } from "../../redux/User";
import AudioComponent from "../AudioComponent/AudioComponent";
import { MdMic } from "react-icons/md";
import MediaMessage from "./MediaMessage";
import { IoMdClose } from "react-icons/io";

function InputContainer() {

  const [ShowMediaOptions, setShowMediaOptions] = useState(false);
  const { socket }: any = useContext(SocketContext);

  const [startRecording, setStartRecording] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const userData: any = useSelector((state: RootState) => {
    return state.user.userData
  });
  const Reciver = useSelector((state: RootState) => {
    return state.user.recipientName
  });

  function SendMessage(e: any) {
    e.preventDefault();
    let body;

    if (MessageId) {
      body = {
        message: message,
        consumer: Reciver,
        publisher: userData?._id,
        sent: false,
        createdAt: new Date().toISOString(),
        reply: MessageId
      }
    }
    else {
      body = {
        message: message,
        consumer: Reciver,
        publisher: userData?._id,
        sent: false,
        createdAt: new Date().toISOString()
      }
    }

    socket.emit("send-message", body);
    dispatch(addNewMessage(body));
    dispatch(setLastMessage({ id: Reciver, message: message, mediaType: null, lastMessageTime: new Date().toISOString() }));
    setMessage("");
  }

  const Contact: any = useSelector((state: RootState) => {
    return state.user.contact
  });

  const Reply: boolean = useSelector((state: RootState) => {
    return state.message.reply
  });

  const Message: any = useSelector((state: RootState) => {
    return state.message.messages
  });

  const MessageId: string = useSelector((state: RootState) => {
    return state.message.messageId
  });

  const FilterMessage: any = Message.find((item: any) => item._id == MessageId);

  const FilterUser: any = Contact.find((item: any) => item?.userId?._id == FilterMessage?.publisher);

  return (
    <div className="relative">
      {ShowMediaOptions &&
        <MediaMessage setShowMediaOptions={setShowMediaOptions} />
      }
      {
        Reply &&
        <div className="shadow px-3 py-1 bg-zinc-100 flex items-center gap-2">
          <div className="rounded-md pr-1 items-start bg-black/5  w-full flex gap-2">
            <div className="w-1 h-14 bg-green-800"></div>
            <div className="text-sm p-2 w-full">
              <p className="font-medium text-zinc-700">
                {
                  FilterUser ? FilterUser?.userId?.firstname : "You"
                }
              </p>
              <div className="flex gap-2 items-center w-full ">
                {
                  FilterMessage?.message &&
                  <p className="line-clamp-1">{FilterMessage?.message}</p>
                }
                {
                  FilterMessage?.mediaType == "audio" &&
                  <MdMic />
                }
                {
                  FilterMessage?.mediaDuration && <p>{FilterMessage.mediaDuration}</p>
                }
              </div>
            </div>
            <button className="p-2" onClick={() => {
              dispatch(setMessageId(""));
              dispatch(toggleReply());
            }}><IoMdClose /></button>
          </div>
        </div>
      }
      <div className={`${!startRecording && "py-2 px-4"} bg-zinc-100 flex w-full gap-2 items-center`}>
        {
          !startRecording &&
          <div className="px-2 py-1 flex items-center bg-white rounded-full shadow-2xl w-full">
            <button onClick={(e: any) => {
              e.preventDefault();
              setShowMediaOptions(true);
            }} className={`active:bg-transparent hover:bg-zinc-100 p-2 rounded-full`}>
              <BiPlus size={24} />
            </button>
            <form className="w-full" onSubmit={SendMessage} >
              <input value={message} required onChange={(e: any) => setMessage(e.target.value)} type="text" placeholder="Type a message" className="px-3 py-2 w-full outline-none" />
            </form>
          </div>
        }
        {
          !message && MessageId == "" ?
            <AudioComponent setStartRecording={setStartRecording} startRecording={startRecording} />
            :
            <button onClick={SendMessage} className="bg-green-800 text-white p-2 rounded-full hover:bg-green-700 active:bg-green-800 shadow-md active:shadow-none">
              <IoSend size={26} />
            </button>
        }
      </div>
    </div >
  )
}

export default InputContainer