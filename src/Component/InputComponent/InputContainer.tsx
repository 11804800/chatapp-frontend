import { BiPlus } from "react-icons/bi"
import { MdMic } from "react-icons/md"
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store";
import { useContext, useState } from "react";
import { addNewMessage } from "../../redux/message";
import { SocketContext } from "../../SocketProvider/SockerProvider";
import { setLastMessage } from "../../redux/User";

function InputContainer() {

  const { socket }: any = useContext(SocketContext);
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
      sent: false
    }
    socket.emit("send-message", body);
    dispatch(addNewMessage(body));
    dispatch(setLastMessage({ id: Reciver, message: message }));
    setMessage("");
  }

  return (
    <div className=" py-2 px-4 bg-zinc-100 flex w-full gap-2 items-center">
      <form onSubmit={SendMessage} className="px-4 py-1 flex items-center bg-white rounded-full shadow-2xl w-full">
        <BiPlus size={24} />
        <input value={message} required onChange={(e: any) => setMessage(e.target.value)} type="text" placeholder="Type a message" className="px-3 py-2 w-full outline-none" />
      </form>
      {
        !message ?
          <button className="p-2 hover:bg-zinc-200 rounded-full active:bg-transparent">
            <MdMic size={24} />
          </button>
          :
          <button onClick={SendMessage} className="bg-green-800 text-white p-2 rounded-full hover:bg-green-700 active:bg-green-800 shadow-md active:shadow-none">
            <IoSend size={26} />
          </button>
      }
    </div>
  )
}

export default InputContainer