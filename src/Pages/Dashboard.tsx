import { useRef, useState } from "react";
import { FaUser } from "react-icons/fa"
import { MdOutlineEdit, MdLogout } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/Store";
import { Logout, setUserData } from "../redux/User";
import { AxiosVite } from "../utils/Axios";
function Dashboard() {

  const [image, setImage] = useState<any>(null);
  const FileInputRef = useRef<any>(null);

  const userData: any = useSelector((state: RootState) => {
    return state.user.userData
  });

  const dispatch = useDispatch();
  const [EditName, setEditName] = useState(false);
  const [EditDescription, setEditDescription] = useState(false);
  const [name, setName] = useState<string>(userData?.firstname + " " + userData?.lastname);
  const [Description, setDescription] = useState(userData?.description ? userData?.description : "");

  const token = useSelector((state: RootState) => {
    return state.user.token
  });

  function UpdateProfileImage(e: any) {
    const file: any = e.target.files[0];
    setImage(file);
    const formData: any = new FormData;
    formData.append("profile-image", file);
    AxiosVite.put("/users", formData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      dispatch(setUserData(response.data.data));
      setEditName(false);
    }).catch((err: any) => console.log(err))
  }

  function UpdateName() {

    const fullname = name.split(" ");
    const body: any = {
      firstname: fullname[0],
      lastname: fullname[1]
    }
    AxiosVite.put("/users", body, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      dispatch(setUserData(response.data.data));
      setEditName(false);
    }).catch((err: any) => console.log(err))
  }

  function UpdateDescription() {

    const body: any = {
      description: Description
    }
    AxiosVite.put("/users", body, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      dispatch(setUserData(response.data.data));
      setEditDescription(false);
    }).catch((err: any) => console.log(err))
  }

  return (
    <div className="flex p-2 w-full h-full relative">
      <div className="shrink-0 w-full md:w-[350px] lg:w-[450px] xl:w-[510px] border-r h-full p-4 flex gap-8 flex-col">
        <h1 className="font-medium text-xl">Profile</h1>
        <div className="w-full flex justify-center items-center">
          {
            image ?
              <div className="flex justify-center flex-col items-center gap-2">
                <input accept="image/*" onChange={UpdateProfileImage} type="file" ref={FileInputRef} className="hidden" />
                <img src={URL.createObjectURL(image)} className="w-[120px] h-[120px] object-cover rounded-full" />
                <button onClick={() => { FileInputRef.current.click() }} className="text-sm active:text-teal-700 hover:text-[brown] text-teal-700 font-medium">Edit</button>
              </div> :
              <>
                {
                  userData?.image ?
                    <div className="flex justify-center flex-col items-center gap-2">
                      <input onChange={UpdateProfileImage} type="file" ref={FileInputRef} className="hidden" />
                      <img src={import.meta.env.VITE_IMAGE_URL + userData.image} className="w-[120px] h-[120px] object-cover rounded-full" />
                      <button onClick={() => { FileInputRef.current.click() }} className="text-sm active:text-teal-700 hover:text-[brown] text-teal-700 font-medium">Edit</button>
                    </div> :
                    <div className="rounded-full bg-zinc-100 w-fit text-zinc-500 p-5 overflow-hidden">
                      < FaUser size={100} />
                    </div>
                }
              </>
          }
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-600">Name</p>
          <div className="flex justify-between py-4 items-center">
            {
              !EditName ?
                <>
                  <p className="w-full font-medium">
                    {userData?.firstname}{" "}{userData.lastname}
                  </p>
                  <button onClick={() => setEditName(true)} className="text-zinc-600 hover:bg-zinc-100 active:bg-white p-2 rounded-full w-fit h-fit">
                    <MdOutlineEdit size={24} />
                  </button>
                </>
                :
                <>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="outline-none font-medium border-b w-full" />
                  <button onClick={UpdateName} className="text-zinc-600 hover:bg-zinc-100 active:bg-white p-2 rounded-full w-fit h-fit">
                    <IoCheckmarkSharp size={24} />
                  </button>
                </>
            }
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-600">
            About
          </p>
          <div className="flex justify-between py-2 items-center">
            {
              !EditDescription
                ?
                <>
                  <p className="w-full text-black font-medium">{userData?.description}</p>
                  <button onClick={() => setEditDescription(true)} className="text-zinc-600 hover:bg-zinc-100 active:bg-white p-2 rounded-full w-fit h-fit">
                    <MdOutlineEdit size={24} />
                  </button>
                </>
                :
                <>
                  <input type="text" value={Description} onChange={(e: any) => setDescription(e.target.value)} className="outline-none font-medium border-b w-full" />
                  <button onClick={UpdateDescription} className="text-zinc-600 hover:bg-zinc-100 active:bg-white p-2 rounded-full w-fit h-fit">
                    <IoCheckmarkSharp size={24} />
                  </button>
                </>
            }
          </div>
        </div>
        <div className="absolute bottom-0 py-10">
          <button onClick={() => dispatch(Logout())} className="flex items-center gap-1 font-medium border-[1px] px-2 py-1 rounded-md hover:bg-zinc-100 hover:border-zinc-100 active:bg-white">
            <MdLogout />Logout</button>
        </div>
      </div>
      <div className="hidden md:flex w-full justify-center items-center h-full ">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="rounded-full bg-zinc-100 w-fit text-zinc-500 p-5 overflow-hidden">
            <FaUser size={34} />
          </div>
          <h1 className="font-light text-zinc-600 text-3xl">Profile</h1>
        </div>
      </div>
    </div>
  )
}

export default Dashboard