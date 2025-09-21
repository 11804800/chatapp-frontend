import { TiTimes } from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import { setShowContactModal } from "../../redux/Contact";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function ShowAllUserModal() {

    const ContactData = useSelector((state: RootState) => {
        return state.contact.Data
    });
    const dispatch = useDispatch();

    useGSAP(() => {
        gsap.from(".modal-container", {
            background: "white",
            opacity: .5,
            duration: .1
        });
        gsap.from(".contact-modal", {
            height: "10%",
            width: "10%",
            opacity: 0,
            duration: .1,
        })
    })



    function CloseModal() {
        gsap.to(".contact-modal", {
            height: "0px",
            width: "0px",
            opacity: 0,
            duration: .3,
        })
        gsap.to(".modal-container", {
            background: "white",
            opacity: .5,
            duration: .1,
            onComplete: () => {
                dispatch(setShowContactModal());
            }
        });
    }

    return (
        <div className="modal-container h-screen w-full bg-black/25 fixed top-0 z-50 flex justify-center items-center">
            <div className="contact-modal origin-center overflow-hidden w-[550px] h-[550px] bg-white shadow-xl rounded-xl flex flex-col">
                <div className="flex justify-between w-full py-4 px-4">
                    <h1 className="text-xl font-medium">
                        Select Contact
                    </h1>
                    <button className="text-2xl" onClick={CloseModal}>
                        <TiTimes />
                    </button>
                </div>
                <div className="px-4 py-2 overflow-y-auto Scroll-Container">
                    {
                        ContactData.map((item: any, index: number) => {
                            return (
                                <div key={index} className="w-full flex hover:bg-zinc-200 p-2 rounded-lg">
                                    <img src="../profile.jpg" className="w-15 h-15 rounded-full shrink-0 object-cover" />
                                    <div className="flex justify-between w-full p-2">
                                        <div className="">
                                            <p className="font-medium text-sm">{item.name}</p>
                                            <p className="text-[13px]">description</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ShowAllUserModal