import { useDispatch, useSelector } from "react-redux"
import { setRecipientName } from "../../redux/User";
import type { RootState } from "../../redux/Store";
import { setShowContactModal } from "../../redux/Contact";

function RecipentList() {

    const dispatch = useDispatch();

    function SetRecipient(name: string) {
        dispatch(setRecipientName(name));
    }

    const selectContact: boolean = useSelector((state: RootState) => {
        return state.contact.selectContact
    });

    const ContactData = useSelector((state: RootState) => {
        return state.contact.Data
    });

    const Contact: any = useSelector((state: RootState) => {
        return state.user.contact
    });

    const recipientName: string | null = useSelector((state: RootState) => {
        return state.user.recipientName
    });


    const filteredData = ContactData.filter((item: any) => Contact.includes(item._id));

    if (filteredData.length <= 0) {
        return (
            <div className="h-full flex flex-col gap-4 items-center justify-center">
                <p className="font-medium text-2xl">Start Chatting</p>
                <button onClick={() => dispatch(setShowContactModal())} className="bg-zinc-400 w-[70%] text-white px-3 py-2 font-medium rounded-md shadow-md">New chat</button>
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-col gap-2">
                {
                    filteredData.map((item: any, index: number) => {
                        return (
                            <div key={index} className={`w-full flex gap-1 hover:bg-zinc-200 p-2 rounded-lg ${recipientName == item.username && "bg-zinc-200"}`} onClick={() => SetRecipient(item._id)}>
                                {selectContact && <input type="checkbox" />}
                                <div className="shrink-0 relative">
                                    <img src="../profile.jpg" className="w-15 h-15 rounded-full shrink-0 object-cover" />
                                </div>
                                <div className="flex justify-between w-full p-2">
                                    <div className="">
                                        <p className="font-medium text-sm capitalize">{item.firstname}{" "}{item.lastname}</p>
                                        <p className="text-[13px]">Last message</p>
                                    </div>
                                    <p className="text-[12px]">Yesterday</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default RecipentList