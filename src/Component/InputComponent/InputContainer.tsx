import { BiPlus } from "react-icons/bi"
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store";
import { useContext, useState } from "react";
import { addNewMessage } from "../../redux/message";
import { SocketContext } from "../../SocketProvider/SockerProvider";
import { setLastMessage } from "../../redux/User";
import AudioComponent from "../AudioComponent/AudioComponent";

function InputContainer() {

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
    const body = {
      message: message,
      consumer: Reciver,
      publisher: userData?._id,
      sent: false,
      createdAt: new Date().toISOString()
    }
    socket.emit("send-message", body);
    dispatch(addNewMessage(body));
    dispatch(setLastMessage({ id: Reciver, message: message, mediaType: null }));
    setMessage("");
  }

  return (
    <div className={`${!startRecording && "py-2 px-4"} bg-zinc-100 flex w-full gap-2 items-center`}>
      {
        !startRecording &&
        <form onSubmit={SendMessage} className="px-4 py-1 flex items-center bg-white rounded-full shadow-2xl w-full">
          <BiPlus size={24} />
          <input value={message} required onChange={(e: any) => setMessage(e.target.value)} type="text" placeholder="Type a message" className="px-3 py-2 w-full outline-none" />
        </form>
      }
      {
        !message ?
          <AudioComponent setStartRecording={setStartRecording} startRecording={startRecording} />
          :
          <button onClick={SendMessage} className="bg-green-800 text-white p-2 rounded-full hover:bg-green-700 active:bg-green-800 shadow-md active:shadow-none">
            <IoSend size={26} />
          </button>
      }
    </div>
  )
}

export default InputContainer