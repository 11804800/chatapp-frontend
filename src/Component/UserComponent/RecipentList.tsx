import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store";
import { setShowContactModal } from "../../redux/Contact";

import RecipentItem from "./RecipentItem";

function RecipentList() {

    const dispatch = useDispatch();

    const Contact: any = useSelector((state: RootState) => {
        return state.user.contact
    });


    if (Contact.length <= 0) {
        return (
            <div className="h-full flex flex-col gap-4 items-center justify-center">
                <p className="font-medium text-2xl">Start Chatting</p>
                <button onClick={() => dispatch(setShowContactModal())} className="bg-blue-600 w-[300px] text-white px-3 py-2 font-medium rounded-md shadow-md">New chat</button>
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-col gap-2">
                {
                    Contact.map((item: any, index: number) => {
                        return (
                            <RecipentItem key={index} item={item} />
                        )
                    })
                }
            </div>
        )
    }
}

export default RecipentList