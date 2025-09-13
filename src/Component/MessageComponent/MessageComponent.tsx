import { BiCheck } from "react-icons/bi"

function MessageComponent() {
  return (
    <div className="h-full w-full py-3 px-16 flex flex-col gap-8">
      <div className="self-end flex overflow-hidden px-2 drop-shadow">
        <div className="bg-[#d9fdd3] font-medium px-2 py-1  w-fit  flex items-start rounded-md">
          <p className="px-2">Hello</p>
          <div className="flex gap-[2px] relative -bottom-1 h-full items-center px-2">
            <p className="text-[10px]">12:04</p>
            <BiCheck />
          </div>
        </div>
        <div className="rotate-45 -translate-x-[8px] -translate-y-1.5 w-[12px] h-[12px] bg-[#d9fdd3] rounded"></div>
      </div>
      <div className="self-start flex overflow-hidden px-2 drop-shadow">
        <div className="rotate-45 translate-x-[8px] -translate-y-1.5 w-[12px] h-[12px] bg-white rounded"></div>
        <div className="bg-white font-medium px-2 py-1  w-fit  flex items-start rounded-md">
          <p className="px-2">Hello</p>
          <div className="flex gap-[2px] relative -bottom-1 h-full items-center px-2">
            <p className="text-[10px]">12:04</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageComponent