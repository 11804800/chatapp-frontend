import {  useState } from "react";
import { FaUser } from "react-icons/fa"
import { MdOutlineEdit, MdLogout } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";
function Dashboard() {

  const [EditName, setEditName] = useState(false);
  const [EditDescription, setEditDescription] = useState(false);
  const [name, setName] = useState<string>("Nikhil pathak");
  const [Description, setDescription] = useState("Hey There I am using what's app");

  function UpdateName()
  {
    setEditName(false);
  }

  function UpdateDescription()
  {
    setEditDescription(false);
  }

  return (
    <div className="flex p-2 w-full h-full relative">
      <div className="shrink-0 w-full md:w-[350px] lg:w-[450px] xl:w-[510px] border-r h-full p-4 flex gap-8 flex-col">
        <h1 className="font-medium text-xl">Profile</h1>
        <div className="w-full flex justify-center items-center">
          <div className="rounded-full bg-zinc-100 w-fit text-zinc-500 p-5 overflow-hidden">
            <FaUser size={100} />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-600">Name</p>
          <div className="flex justify-between py-4 items-center">
            {
              !EditName ?
                <>
                  <p className="w-full font-medium">
                    Nikhil Pathak
                  </p>
                  <button onClick={()=>setEditName(true)} className="text-zinc-600 hover:bg-zinc-100 active:bg-white p-2 rounded-full w-fit h-fit">
                    <MdOutlineEdit size={24} />
                  </button>
                </>
                :
                <>
                  <input  type="text" value={name} onChange={(e) => setName(e.target.value)} className="outline-none font-medium border-b w-full" />
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
                  <p className="w-full text-black font-medium">Hey I am Using Chat app</p>
                  <button onClick={()=>setEditDescription(true)} className="text-zinc-600 hover:bg-zinc-100 active:bg-white p-2 rounded-full w-fit h-fit">
                    <MdOutlineEdit size={24} />
                  </button>
                </>
                :
                <>
                  <input  type="text" value={Description} onChange={(e) => setDescription(e.target.value)} className="outline-none font-medium border-b w-full" />
                  <button onClick={UpdateDescription} className="text-zinc-600 hover:bg-zinc-100 active:bg-white p-2 rounded-full w-fit h-fit">
                    <IoCheckmarkSharp size={24} />
                  </button>
                </>
            }
          </div>
        </div>
        <div className="absolute bottom-0 py-10">
          <button className="flex items-center gap-1 font-medium border-[1px] px-2 py-1 rounded-md hover:bg-zinc-100 hover:border-zinc-100 active:bg-white">
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