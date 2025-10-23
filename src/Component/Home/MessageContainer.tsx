import { useSelector } from "react-redux";
import InputContainer from "../InputComponent/InputContainer"
import MessageComponent from "../MessageComponent/MessageComponent"
import type { RootState } from "../../redux/Store";
import RecipentHeader from "../UserComponent/RecipentHeader";
import ContactInfo from "../UserComponent/ContactInfo";


function MessageContainer() {

  const recipientName: string | null = useSelector((state: RootState) => {
    return state.user.recipientName
  });

  const ShowContactInfo: boolean = useSelector((state: RootState) => {
    return state.contact.showContactInfo
  });

  if (recipientName) {
    return (
      <div className='w-full h-full flex flex-col border-l-[1px] border-zinc-200 relative'>
        <RecipentHeader />
        <MessageComponent />
        <InputContainer />
        {
          ShowContactInfo && <ContactInfo />
        }
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