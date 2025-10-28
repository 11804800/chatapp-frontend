
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import { useContext, useEffect, useRef } from "react";
import { AxiosVite } from "../../utils/Axios";
import { SocketContext } from "../../SocketProvider/SockerProvider";
import RenderMessage from "../ChatComponent/RenderMessage";


type Item = {
  id: number,
  message: string,
  reciver: string,
  mediaType: string,
  createdAt: Date
}
function MessageComponent() {

  const userData: any = useSelector((state: RootState) => {
    return state.user.userData
  });

  const Messages = useSelector((state: RootState) => {
    return state.message.messages
  });

  const recipentName: any = useSelector((state: RootState) => {
    return state.user.recipientName
  });

  const token: string | null = useSelector((state: RootState) => {
    return state.user.token
  });


  const MessageContainerRef = useRef<any>(null);


  useEffect(() => {
    if (MessageContainerRef.current) {
      MessageContainerRef.current.scrollTop = MessageContainerRef.current.scrollHeight;
    }

  }, [Messages]);

  const { socket }: any = useContext(SocketContext);


  useEffect(() => {
    if (Messages) {
      const FilterData: any = Messages.filter((item: any) => item.publisher == recipentName && item?.seen == false);
      if (FilterData.length >= 1) {
        const idArray = FilterData.map((item: any) => item._id);
        const body: any = {
          idArray: idArray
        };
        AxiosVite.put("/messages/publisher/seen", body, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then((response: any) => {
            if (response) {
              socket.emit("message-seen", { data: recipentName, reciver: userData?._id });
            }
          }).catch((err: any) => console.log(err));
      }

    }

  }, [recipentName, Messages]);


  const isTyping = useSelector((state: RootState) => {
    return state.contact.isTyping
  });


  const FilterMessage: any = recipentName == userData?._id ? Messages.filter((item: any) => item.consumer == recipentName && item.publisher == recipentName) : Messages.filter((item: any) => item.consumer == recipentName || item.publisher == recipentName);


  if (FilterMessage.length <= 0) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <p className="text-zinc-500 font-medium text-center px-7">Start Conversation By Sending the Message</p>
      </div>
    )
  }
  else {
    return (
      <div id="Message-Container" ref={MessageContainerRef} className="h-full w-full py-14 px-4 md:py-24  flex flex-col gap-8 overflow-y-auto Scroll-Container bg-zinc-50">
        {
          FilterMessage.map((item: Item, index: number) => {
            return (
              <RenderMessage key={index} item={item} />
            )
          })}
        {
          isTyping == recipentName &&
          <div className="md:px-12 px-2">
            <div className="flex items-start overflow-hidden drop-shadow">
              <div className="rounded bg-white rotate-45 translate-x-[8px] -translate-y-1.5 w-[12px] h-[12px]"></div>
              <div className="bg-white text-[11px] rounded-md w-fit p-2 relative">
                typing...
              </div>
            </div>
          </div>
        }
      </div >
    )
  }
}

export default MessageComponent