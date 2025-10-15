import { FaUser } from "react-icons/fa"
import { MdLogout, MdSettings } from "react-icons/md"
import { MdLockOutline } from "react-icons/md";
import PrivacyComponent from "../Component/SettingComponent/PrivacyComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../redux/User";
import type { RootState } from "../redux/Store";

function SettingPage() {
  const dispatch = useDispatch();

  const userData: any = useSelector((state: RootState) => {
    return state.user.userData
  });

  const [PrivacyPageActive, setPrivacyPageActive] = useState(false);
  return (
    <div className="flex p-2 w-full h-full">
      <div className="shrink-0 w-full md:w-[350px] lg:w-[450px] xl:w-[510px] border-r h-full p-4 flex gap-2 flex-col relative">
        <h1 className="text-2xl font-medium">Settings</h1>
        <div className="flex flex-col py-4 overflow-y-auto">
          <div className="flex items-center gap-2 border-b border-zinc-400 py-5">
            <div className="text-zinc-600 bg-zinc-100 rounded-full p-3 w-fit h-fit">
              <FaUser size={34} />
            </div>
            <div className="px-2 flex flex-col gap-1">
              <p className="text-sm font-medium">{userData?.firstname}{" "}{userData?.lastname}</p>
              <p className="text-sm text-zinc-500">Hey there! i am using whatsapp</p>
            </div>
          </div>
          <div className="flex flex-col gap-8 py-2">
            <div onClick={() => setPrivacyPageActive(true)} className="hover:bg-zinc-100 active:bg-white rounded-md px-3 py-2 flex items-center gap-4">
              <span className="text-zinc-500">
                <MdLockOutline size={24} />
              </span>
              <div >
                <p>Privacy</p>
                <p className="text-zinc-500">
                  Blocked Contacts, Passwords
                </p>
              </div>
            </div >
            <button onClick={() => dispatch(Logout())} className="hover:bg-zinc-100 active:bg-white rounded-md px-3 py-4 flex items-center gap-4">
              <span className="text-zinc-500">
                <MdLogout size={24} />
              </span>
              Logout
            </button>
          </div>
        </div>
        {
          PrivacyPageActive &&
          <PrivacyComponent setPrivacyPageActive={setPrivacyPageActive} />
        }
      </div>
      <div className="hidden md:flex w-full justify-center items-center h-full ">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="w-fit text-zinc-400">
            <MdSettings size={64} />
          </div>
          <h1 className="font-light text-zinc-600 text-3xl">Settings</h1>
        </div>
      </div>
    </div>
  )
}

export default SettingPage