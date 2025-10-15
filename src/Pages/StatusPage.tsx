import { FaUser } from "react-icons/fa"
import { FiPlusCircle } from "react-icons/fi";
import { IoMdPhotos } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import StatusUpload from "../Component/SettingComponent/StatusUpload";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/Store";
function StatusPage() {

  const [StatusOptionActive, setStatusOptionActive] = useState<boolean>(false);
  const [StatusActive, setStatusActive] = useState(false);
  const [FileUploadError, setFileUploadError] = useState<string | null>(null);
  const StatusOptionRef: any = useRef(null);
  const StatusUploadInputRef: any = useRef(null);
  const [File, setFile] = useState(null);

  const Contact: any = useSelector((state: RootState) => {
    return state.user.contact
  });


  useEffect(() => {
    if (!StatusOptionActive) return;
    const Handler = (e: any) => {
      if (StatusOptionRef.current && !StatusOptionRef.current.contains(e.target)) {
        setStatusOptionActive(false)
      }
    }
    document.addEventListener("mousedown", Handler);
    return () => {
      document.removeEventListener('mousedown', Handler);
    }
  }, [StatusOptionActive]);


  function UploadFile(e: any) {
    const file = e.target.files[0];
    const isImageOrVideo = file.type.startsWith('image/') || file.type.startsWith('video/');
    const isSizeValid = file.size <= 10 * 1024 * 1024;
    if (!isImageOrVideo) {
      setFileUploadError("File must be Image or video");
    }
    else if (!isSizeValid) {
      setFileUploadError("File must be less than 10mb");
    }
    else {
      setStatusOptionActive(false)
      setFile(file);
      setStatusActive(true);
    }
  }

  useEffect(() => {
    if (FileUploadError) {
      setTimeout(() => {
        setFileUploadError(null);
      }, 1500);
    }
  }, [FileUploadError]);


  return (
    <>
      <div className="flex p-2 w-full h-full">
        <div className="shrink-0 w-full md:w-[350px] lg:w-[450px] xl:w-[510px] border-r h-full p-4 flex gap-2 flex-col relative">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-medium">Status</h1>
            <div className="flex gap-8">
              <input ref={StatusUploadInputRef} type="file" accept="*" onChange={UploadFile} className="hidden" />
              <div className="relative flex items-center">
                <button onClick={() => setStatusOptionActive(true)} className="hover:bg-zinc-100 rounded-full p-2 active:bg-white">
                  <FiPlusCircle size={23} />
                </button>
                {
                  StatusOptionActive &&
                  <div ref={StatusOptionRef} className="p-3 rounded-2xl drop-shadow-2xl bg-white flex flex-col gap-2 absolute top-9 w-[200px] md:left-0 right-0 z-50">
                    <button onClick={() => {
                      StatusUploadInputRef.current.click()
                    }} className="px-2 py-2 rounded-md hover:bg-zinc-100 flex gap-2 text-sm items-center text-nowrap active:bg-transparent">
                      <IoMdPhotos size={24} color="grey" />
                      Photos & Videos
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2  border-zinc-400 py-5 relative">
            <div className="text-zinc-600 bg-zinc-100 rounded-full p-3 w-fit h-fit">
              <FaUser size={34} />
            </div>
            <div className="px-2 flex flex-col gap-1">
              <p className="text-sm font-medium">My Status</p>
              <p className="text-sm text-zinc-500">Click to add status update</p>
            </div>
          </div>
          <div className="overflow-y-auto h-full p-2 flex flex-col gap-4">
            <h1 className="font-medium">Recent</h1>
            {
              Contact.map((item: any) => {
                return (
                  <div key={item._id} className="flex px-2 items-center gap-4 hover:bg-zinc-100 py-2 rounded-md">
                    <img src="../profile.jpg" className="w-14 h-14 object-cover rounded-full" />
                    <div>
                      <p>{item?.userId?.firstname}{" "}{item?.userId?.lastname}</p>
                      <p className="text-zinc-500 text-sm">
                        Today at 07:09
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {
            FileUploadError &&
            <div className="w-fit  bg-black/65 text-white rounded-md pl-4 pr-12 py-3 text-sm font-light">
              {FileUploadError}
            </div>
          }
        </div>
        <div className="hidden md:flex w-full justify-center items-center h-full ">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-fit text-zinc-400">
              <img src="./Status-Gray.png" className="w-14 h-14" />
            </div>
            <h1 className="font-light text-zinc-600 text-3xl">Share Status Updates</h1>
            <p className="text-center font-light text-sm">Share Photos, Videos and text that will disappear after 24 hours</p>
          </div>
        </div>
      </div>
      {
        StatusActive &&
        <StatusUpload file={File} setStatusActive={setStatusActive} />
      }
    </>
  )
}

export default StatusPage