import { useDispatch } from "react-redux"
import { setRecipientName } from "../../redux/User";

function MessageSelect() {
    const dispatch=useDispatch();
    function SetRecipient(name:string)
    {
        console.log(name);
        dispatch(setRecipientName(name));
    }

    return (
        <div className="w-full flex hover:bg-zinc-200 p-2 rounded-lg" onClick={()=>SetRecipient("nikhil")}>
            <img src="../profile.jpg" className="w-15 h-15 rounded-full shrink-0 object-cover" />
            <div className="flex justify-between w-full p-2">
                <div className="">
                    <p className="font-medium text-sm">Name</p>
                    <p className="text-[13px]">Last message</p>
                </div>
                <p className="text-[12px]">Yesterday</p>
            </div>
        </div>
    )
}

export default MessageSelect