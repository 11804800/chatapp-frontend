import { useSelector } from "react-redux";
import InputContainer from "../InputComponent/InputContainer"
import MessageComponent from "../MessageComponent/MessageComponent"
import type { RootState } from "../../redux/Store";
import RecipentHeader from "../UserComponent/RecipentHeader";


function MessageContainer() {
  
  const recipientName: string | null = useSelector((state: RootState) => {
    return state.user.recipientName
  });

  if (recipientName) {
    return (
      <div className='w-full h-full flex flex-col border-l-[1px] border-zinc-200'>
        <RecipentHeader />
        <MessageComponent />
        <InputContainer />
      </div>
    )
  }
  else {
    return (
      <div className="h-full w-full border-l-[1px] border-zinc-200 hidden md:flex justify-center items-center">
        <div>
          <p className="font-medium text-xl">Select or Start New Chat</p>
        </div>
      </div>
    )
  }
}

export default MessageContainer