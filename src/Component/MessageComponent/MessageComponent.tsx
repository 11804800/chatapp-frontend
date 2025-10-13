
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import RenderMessage from "./RenderMessage";


type Item = {
  id: number,
  message: string,
  reciver: string
}
function MessageComponent() {

  const Messages = useSelector((state: RootState) => {
    return state.message.messages
  });

  if (Messages.length <= 0) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <p className="text-zinc-500 font-medium">Start Conversation By Sending the Message</p>
      </div>
    )
  }
  else {
    return (
      <div id="Message-Container" className="h-full w-full py-14 px-4 md:py-24 xl:px-16 flex flex-col gap-8 overflow-y-auto Scroll-Container">
        {
          Messages.map((item: Item, index: number) => {
            return (
              <RenderMessage key={index} item={item} />
            )
          })
        }
      </div>
    )
  }
}

export default MessageComponent