import InputContainer from "../InputComponent/InputContainer"
import MessageComponent from "../MessageComponent/MessageComponent"
import UserHeader from "../UserComponent/UserHeader"


function MessageContainer() {
  return (
    <div className='w-full h-full flex flex-col border-l-[1px] border-zinc-200'>
      <UserHeader/>
      <MessageComponent/>
      <InputContainer/>
    </div>
  )
}

export default MessageContainer