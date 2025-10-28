import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/Store";
import { FaUser } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { deleteStatus, setShowStatus } from "../../redux/status";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { GoInfo } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { AxiosVite } from "../../utils/Axios";
import { TimeFormatter } from "../../utils/Formatter";


function RenderStatus({ data }: any) {

    if (data?.mediaType == "image") {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <img src={import.meta.env.VITE_IMAGE_URL + "/" + data?.file} />
            </div>
        )
    }
    else {
        return (
            <div>
                <video autoPlay src={import.meta.env.VITE_IMAGE_URL + "/" + data?.file} />
            </div>
        )
    }
}


function StatusView() {

    const statusOptionRef: any = useRef(null);
    const [statusInfo, setStatusInfo] = useState(false);
    const [statusOptionActive, setStatusOption] = useState(false);

    const dispatch = useDispatch();

    const [statusIndex, setStatusIndex] = useState(0);

    const showStatus: string = useSelector((state: RootState) => {
        return state.status.showStatus
    });

    const userData: any = useSelector((state: RootState) => {
        return state.user.userData
    });

    const MyStatus: any = useSelector((state: RootState) => {
        return state.status.myStatus
    });

    const Status: any = useSelector((state: RootState) => {
        return state.status.status
    });

    const token: string | null = useSelector((state: RootState) => {
        return state.user.token
    });

    const FilterStatus: any = Status.find((item: any) => item.userId?._id == showStatus);


    function IncreaseStatusIndex() {
        if (showStatus === userData?._id) {
            const maxIndex = MyStatus?.length ? Math.min(statusIndex + 1, MyStatus.length - 1) : statusIndex;
            setStatusIndex(maxIndex);
        }
        else {
            const maxIndex = FilterStatus?.userId.status?.length ? Math.min(statusIndex + 1, FilterStatus?.userId.status.length - 1) : statusIndex;
            setStatusIndex(maxIndex);
        }
    }

    function DecreaseStatusIndex() {
        if (statusIndex != 0) {
            setStatusIndex(statusIndex - 1);
        }
    }

    useEffect(() => {
        let timer: any = null;
        if (showStatus === userData?._id && !statusInfo) {
            const maxIndex = MyStatus?.length ? Math.min(statusIndex + 1, MyStatus.length - 1) : statusIndex;
            timer = setTimeout(() => {
                setStatusIndex(maxIndex);
            }, 15000);
        }
        else {
            const maxIndex = FilterStatus?.userId.status?.length ? Math.min(statusIndex + 1, FilterStatus?.userId.status.length - 1) : statusIndex;
            timer = setTimeout(() => {
                setStatusIndex(maxIndex);
            }, 15000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [showStatus, statusIndex, statusInfo, MyStatus, userData?._id, FilterStatus]);


    useEffect(() => {
        if (!statusOptionActive) return;
        const Handler = (e: any) => {
            if (statusOptionRef.current && !statusOptionRef.current.contains(e.target)) {
                setStatusOption(false)
            }
        }

        document.addEventListener("mousedown", Handler);
        return () => {
            document.removeEventListener('mousedown', Handler);
        }
    }, [statusOptionActive]);

    useEffect(() => {
        if (FilterStatus && showStatus !== userData?._id) {
            if (!FilterStatus?.userId?.status[statusIndex]?.seen?.includes(userData?._id)) {
                const body = {};
                AxiosVite.put(`/status/${FilterStatus?.userId?.status[statusIndex]?._id}`, body, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }).then((response: any) => {
                    if (response) {
                        console.log("");
                    }
                }).catch((err: any) => console.log(err.response.data));
            }
        }

    }, [statusIndex]);

    function DeleteStatus(id: string) {
        AxiosVite.delete(`/status/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response: any) => {
            if (response) {
                if (response.data) {
                    dispatch(deleteStatus(statusIndex));
                    dispatch(setShowStatus(""));
                }
            }
        }).catch((err: any) => console.log(err.response.data));
    }

    useEffect(() => {
        if (MyStatus.length <= 0) {
            dispatch(setShowStatus(""))
        }
    }, [MyStatus]);

    if (showStatus == userData?._id) {
        return (
            <>
                <div className='absolute top-0 left-0 h-screen w-full bg-black/40 z-[999] status-container flex flex-col items-center'>
                    <div className="z-[999] py-2 px-4 w-full flex justify-between gap-2 md:gap-2 items-center overflow-hidden">
                        <div></div>
                        <div className="w-[90%] md:w-[500px] h-[10px] rounded-2xl flex gap-2">
                            {
                                MyStatus.map((item: any, index: number) => {
                                    return (
                                        <div key={item?._id} onClick={() => setStatusIndex(index)} className="w-full h-[10px] bg-zinc-50/30 rounded-2xl relative">
                                            {index == statusIndex &&
                                                <div className="w-0 h-[10px] rounded-2xl bg-white loading"></div>
                                            }
                                            {
                                                index < statusIndex &&
                                                <div className="w-full h-[10px] rounded-2xl bg-white"></div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button onClick={() => dispatch(setShowStatus(""))} className="text-white hover:bg-zinc-100/15 rounded-full active:bg-transparent">
                            <IoClose size={29} />
                        </button>
                    </div>
                    <div className="w-full md:w-[500px] flex justify-between items-center z-[999]">
                        <div className="flex gap-3">
                            {
                                userData?.image ?
                                    <img src={import.meta.env.VITE_IMAGE_URL + userData?.image} className="w-14 rounded-full h-14 object-cover" />
                                    :
                                    <div className="text-zinc-700 bg-zinc-200 p-3 px-[14px] w-fit rounded-full">
                                        <FaUser size={28} />
                                    </div>
                            }
                            <div className="flex flex-col gap-1 text-white font-medium">
                                <p className="text-zinc-100">{userData?.firstname}{" "}{userData?.lastname}</p>
                                <p className="text-xs px-1 text-zinc-200">{TimeFormatter(MyStatus[statusIndex]?.createdAt)}</p>
                            </div>
                        </div>
                        <div className="relative">
                            <button onClick={() => setStatusOption(true)} className="hover:bg-zinc-100/10 text-white p-2 rounded-full active:bg-transparent">
                                <BsThreeDotsVertical size={23} />
                            </button>
                            {
                                statusOptionActive &&
                                <div ref={statusOptionRef} className="absolute top-11 right-4 md:left-0 w-fit bg-white shadow-xl flex flex-col gap-2 p-4 rounded-md">
                                    <button onClick={() => {
                                        setStatusOption(false);
                                        DeleteStatus(MyStatus[statusIndex]._id);
                                    }} className="px-4 py-2 flex items-center gap-2 hover:bg-zinc-200 rounded active:bg-transparent">
                                        <FiTrash2 size={23} />
                                        Delete
                                    </button>
                                    <button onClick={() => { setStatusInfo(true); setStatusOption(false) }} className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-200 rounded active:bg-transparent">
                                        <GoInfo size={23} />
                                        info
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    <div onClick={DecreaseStatusIndex} className="bg-transparent h-full absolute left-0 top-20  w-[50%] z-[999]"></div>
                    <div className="absolute w-full sm:w-[400px] h-screen bg-black flex justify-center items-center">
                        <RenderStatus data={MyStatus[statusIndex]} />
                    </div>
                    <div onClick={IncreaseStatusIndex} className="bg-transparent h-full absolute right-0 top-20 w-[50%] "></div>
                </div>
                {
                    statusInfo &&
                    <div className="absolute bg-white w-full h-full md:h-[80%] bottom-0 left-0 z-[9999] p-3">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="font-medium text-xl">Status Info</h1>
                            <button onClick={() => { setStatusInfo(false) }} className="p-2 active:bg-transparent hover:bg-zinc-200 rounded-full">
                                <MdClose size={28} />
                            </button>
                        </div>
                        <div className="flex gap-2 flex-col px-4 py-2 overflow-y-auto Scroll-Container">
                            <h1 className="text-xs">Status Seen by</h1>
                            {
                                MyStatus[statusIndex]?.seen?.map((item: any, index: number) => {
                                    return (
                                        <div key={index} className="flex gap-2 p-2 items-center bg-zinc-100 px-3 rounded-md">
                                            {
                                                item?.image ?
                                                    <img src={import.meta.env.VITE_IMAGE_URL + item?.image} className="w-14 rounded-full h-14 object-cover" />
                                                    :
                                                    <div className="text-zinc-700 bg-zinc-200 p-3 px-[14px] w-fit rounded-full">
                                                        <FaUser size={28} />
                                                    </div>
                                            }
                                            <p className="font-medium">{item.firstname}{" "}{item.lastname}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </>
        )
    }
    else {
        return (
            <div className='absolute top-0 left-0 h-screen w-full bg-black/40 z-[999] status-container flex flex-col items-center'>
                <div className="py-2 px-4 w-full flex justify-between gap-2 items-center z-[999]">
                    <div></div>
                    <div className="w-[90%] md:w-[500px] h-[10px] rounded-2xl flex gap-2">
                        {
                            FilterStatus?.userId?.status.map((item: any, index: number) => {
                                return (
                                    <div key={item._id} onClick={() => setStatusIndex(index)} className="w-full h-[10px] bg-zinc-50/30 rounded-2xl relative">
                                        {index == statusIndex &&
                                            <div className="w-0 h-[10px] rounded-2xl bg-white loading"></div>
                                        }
                                        {
                                            index < statusIndex &&
                                            <div className="w-full h-[10px] rounded-2xl bg-white"></div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button onClick={() => dispatch(setShowStatus(""))} className="text-white hover:bg-zinc-100/15 rounded-full active:bg-transparent">
                        <IoClose size={29} />
                    </button>
                </div>
                <div className="w-full md:w-[500px] px-12 md:px-0 flex gap-2 z-[999] ">
                    {
                        FilterStatus?.userId?.image ?
                            <img src={import.meta.env.VITE_IMAGE_URL + FilterStatus?.userId?.image} className="w-14 rounded-full h-14 object-cover" />
                            :
                            <div className="text-zinc-700 bg-zinc-200 p-3 px-[14px] w-fit rounded-full">
                                <FaUser size={28} />
                            </div>
                    }
                    <div className="flex flex-col gap-1 text-white font-medium">
                        <p className="text-zinc-100">{FilterStatus?.userId?.firstname}{" "}{FilterStatus?.userId?.lastname}</p>
                        <p className="text-xs px-1 text-zinc-200">{TimeFormatter(FilterStatus.createdAt)}</p>
                    </div>
                </div>
                <div onClick={DecreaseStatusIndex} className="bg-transparent h-full absolute left-0 top-20  w-[50%] z-[999]"></div>
                <div className="absolute w-full sm:w-[400px] h-screen bg-black flex justify-center items-center">
                    <RenderStatus data={FilterStatus?.userId?.status[statusIndex]} />
                </div>
                <div onClick={IncreaseStatusIndex} className="bg-transparent h-full absolute right-0 top-20 w-[50%]"></div>
            </div>
        )
    }
}

export default StatusView