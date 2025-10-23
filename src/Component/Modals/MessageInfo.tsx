import { useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"

function MessageInfo() {
    const MessageId: string = useSelector((state: RootState) => {
        return state.message.messageId
    });

    const Messages: any = useSelector((state: RootState) => {
        return state.message.messages
    });

    const FilterMessage: any = Messages.find((item: any) => item._id == MessageId);

    console.log(FilterMessage);

    return (
        <div className="absolute top-0 left-0 bg-black/25 h-screen w-full"></div>
    )
}

export default MessageInfo