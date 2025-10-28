import { TiTimes } from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/Store"
import { setContactData, setShowContactModal } from "../redux/Contact";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AddNewContact, setRecipientName } from "../redux/User";
import { AxiosVite } from "../utils/Axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

function ShowAllUserModal() {

    const [Loading, setLoading] = useState(false);

    const ContactData = useSelector((state: RootState) => {
        return state.contact.Data
    });

    const token = useSelector((state: RootState) => {
        return state.user.token
    });

    const dispatch = useDispatch();

    useEffect(() => {
        async function FetchAllUser() {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            if (token && ContactData.length <= 0) {
                setLoading(true);
                AxiosVite.get("/users/all", config).then((response: any) => {
                    dispatch(setContactData(response.data.data));
                    setLoading(false);
                }).catch((err: any) => {
                    console.log(err.response.data);
                    setLoading(false);
                })
            }
        }
        FetchAllUser();
    }, []);





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


    function addNewContact(id: string) {
        const FilterData: any = ContactData.find((item: any) => item._id == id);
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const body = {
            contact: id
        }
        AxiosVite.post("/users/contact", body, config).then((response: any) => {
            if (response) {
                dispatch(setRecipientName(id));
                dispatch(AddNewContact({
                    unseenmessagecount: 0,
                    userId: {
                        firstname: FilterData.firstname,
                        lastname: FilterData.lastname,
                        _id: FilterData._id,
                        socket_id: FilterData.socket_id,
                        image: FilterData.image,
                        description: FilterData.description
                    }
                }));
                CloseModal()
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    if (Loading) {
        return (
            <div className="modal-container h-screen w-full bg-black/25 fixed top-0 z-[9999] flex justify-center items-center p-4">
                <div className="contact-modal origin-center overflow-hidden w-[550px] h-[550px] bg-white shadow-xl rounded-xl flex flex-col justify-center items-center">
                    <p>Loading...</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="modal-container h-screen w-full bg-black/25 fixed top-0 z-[9999] flex justify-center items-center p-4">
                <div className="contact-modal origin-center overflow-hidden w-[550px] h-[550px] bg-white shadow-xl rounded-xl flex flex-col">
                    <div className="flex justify-between w-full py-4 px-4">
                        <h1 className="text-xl font-medium">
                            Select Contact
                        </h1>
                        <button className="text-2xl" onClick={CloseModal}>
                            <TiTimes />
                        </button>
                    </div>
                    {
                        ContactData.length <= 0 ?
                            <div className="h-full w-full flex justify-center items-center">
                                <p className="text-md font-medium">No Users Found</p>
                            </div> :
                            <div className="px-4 py-2 overflow-y-auto Scroll-Container">
                                {
                                    ContactData.map((item: any, index: number) => {
                                        return (
                                            <div onClick={() => addNewContact(item._id)} key={index} className="w-full flex hover:bg-zinc-200 active:bg-transparent p-2 rounded-lg">
                                                {
                                                    item.image
                                                        ?
                                                        <img src={import.meta.env.VITE_IMAGE_URL + item.image} className="w-15 h-15 rounded-full shrink-0 object-cover" />
                                                        :
                                                        <div className="py-3 px-4 text-zinc-500 bg-zinc-100 rounded-full w-fit">
                                                            <FaUser size={28} />
                                                        </div>
                                                }
                                                <div className="flex justify-between w-full p-2">
                                                    <div className="">
                                                        <p className="font-medium text-sm">{item.firstname}{" "}{item.lastname}</p>
                                                        <p className="text-[13px] line-clamp-1">{item?.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default ShowAllUserModal