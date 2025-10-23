import { TiTimes } from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import { setContactData } from "../../redux/Contact";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AxiosVite } from "../../utils/Axios";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { addNewMessage, toggleForwardMessage } from "../../redux/message";
import { AddNewContact, setLastMessage } from "../../redux/User";
import { SocketContext } from "../../SocketProvider/SockerProvider";
import { IoSend } from "react-icons/io5";

function ForwardModal() {

    const [ForwardList, setForwardList] = useState<any>([]);

    const [Loading, setLoading] = useState(false);

    const ContactData = useSelector((state: RootState) => {
        return state.contact.Data
    });

    useEffect(() => {
        async function FetchAllUser() {
            if (token && ContactData.length <= 0) {
                setLoading(true);
                AxiosVite.get("/users/all").then((response: any) => {
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


    function addToForwardList(id: string) {
        if (ForwardList?.includes(id)) {
            const newArray: string = ForwardList.filter((item: string) => item !== id);
            setForwardList(newArray);
        }
        else {
            setForwardList((prev: any) => ([...prev, id]));
        }
    }


    const token = useSelector((state: RootState) => {
        return state.user.token
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
                dispatch(toggleForwardMessage());
            }
        });
    }

    const UserData: any = useSelector((state: RootState) => {
        return state.user.userData
    });

    const { socket }: any = useContext(SocketContext);

    const MessageId: string = useSelector((state: RootState) => {
        return state.message.messageId
    });

    const Messages: any = useSelector((state: RootState) => {
        return state.message.messages
    });

    const contact: any = useSelector((state: RootState) => {
        return state.user.contact
    });

    const ForwardMessage: any = Messages.find((item: any) => item?._id == MessageId);

    function SendMessage() {
        ForwardList?.map((item: string) => {
            const contactExists = contact.some((elem: any) => elem.userId._id === item);
            let body = {
                message: ForwardMessage?.message,
                consumer: item,
                publisher: UserData?._id,
                sent: false,
                createdAt: new Date().toISOString(),
                forward: true,
                media: ForwardMessage?.media,
                mediaDuration: ForwardMessage?.mediaDuration,
                mediaType: ForwardMessage?.mediaType,
            }
            if (contactExists) {
                dispatch(addNewMessage(body));
                dispatch(setLastMessage({
                    id: item,
                    message: ForwardMessage?.message,
                    mediaDuration: ForwardMessage?.mediaDuration,
                    mediaType: ForwardMessage?.mediaType,
                    lastMessageTime: new Date().toISOString(),
                }));
            }
            else {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };
                const axiosbody = {
                    contact: item
                }
                const FilterData: any = ContactData.find((elem: any) => elem._id == item);
                AxiosVite.post("/users/contact", axiosbody, config).then((response: any) => {
                    if (response) {
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
                        dispatch(setLastMessage({
                            id: item,
                            message: ForwardMessage?.message,
                            mediaDuration: ForwardMessage?.mediaDuration,
                            mediaType: ForwardMessage?.mediaType,
                            lastMessageTime: new Date().toISOString(),
                        }));
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
            socket.emit("send-message", body);
        });
        dispatch(toggleForwardMessage());
    }


    if (Loading) {
        return (
            <div className="modal-container h-screen w-full bg-black/25 fixed top-0 z-50 flex justify-center items-center p-4">
                <div className="contact-modal origin-center overflow-hidden w-[550px] h-[550px] bg-white shadow-xl rounded-xl flex flex-col justify-center items-center">
                    <p>Loading...</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="modal-container h-screen w-full bg-black/25 fixed top-0 z-50 flex justify-center items-center p-4">
                <div className="contact-modal origin-center overflow-hidden w-[550px] h-[550px] bg-white shadow-xl rounded-xl flex flex-col">
                    <div className="flex justify-between w-full py-4 px-4">
                        <h1 className="text-xl font-medium">
                            Forward Message to
                        </h1>
                        <button className="text-2xl" onClick={CloseModal}>
                            <TiTimes />
                        </button>
                    </div>
                    <div className="px-4 py-2 overflow-y-auto Scroll-Container flex-1 flex flex-col gap-1">
                        {
                            ContactData.map((item: any, index: number) => {
                                return (
                                    <div onClick={() => {
                                        addToForwardList(item?._id)
                                    }} key={index} className={`w-full flex hover:bg-zinc-200 active:bg-transparent p-2 rounded-lg ${ForwardList?.includes(item._id) && "bg-green-400/25"}`}>
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
                    <div className="px-4 py-4 flex items-center justify-between">
                        <p className=" line-clamp-1">
                            {ForwardMessage?.message}
                        </p>
                        <button onClick={SendMessage} className="bg-green-800 text-white p-2 rounded-full hover:bg-green-700 active:bg-green-800 shadow-md active:shadow-none">
                            <IoSend size={26} />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForwardModal