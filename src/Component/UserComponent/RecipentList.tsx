import { useDispatch, useSelector } from "react-redux"
import { setRecipientName } from "../../redux/User";
import type { RootState } from "../../redux/Store";

function RecipentList() {

    const dispatch = useDispatch();

    function SetRecipient(name: string) {
        dispatch(setRecipientName(name));
    }

    const ContactData = useSelector((state: RootState) => {
        return state.contact.Data
    });


    return (
        <div>
            {
                ContactData.map((item: any, index: number) => {
                    return (
                        <div key={index} className="w-full flex hover:bg-zinc-200 p-2 rounded-lg" onClick={() => SetRecipient("nikhil")}>
                            <img src="../profile.jpg" className="w-15 h-15 rounded-full shrink-0 object-cover" />
                            <div className="flex justify-between w-full p-2">
                                <div className="">
                                    <p className="font-medium text-sm">{item.name}</p>
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

export default RecipentList