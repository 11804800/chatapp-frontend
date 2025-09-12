import { BiPlus } from "react-icons/bi"
import { MdMic } from "react-icons/md"

function InputContainer() {
  return (
    <div className=" py-2 px-4 bg-zinc-100">
      <div className="px-4 py-1 flex items-center bg-white rounded-full shadow-2xl">
        <BiPlus size={24} />
        <input type="text" placeholder="Type a message" className="px-3 py-2 w-full outline-none" />
        <MdMic size={24} />
      </div>
    </div>
  )
}

export default InputContainer