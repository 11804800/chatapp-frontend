import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"

function PermissionSetting({ Permissions, SetPermission }: any) {

  const [option,setSelectOption]=useState("Everyone");
  return (
    <div className='absolute top-0 left-0 h-full w-full bg-white p-2 flex flex-col gap-8'>
      <div className="flex items-center gap-2">
        <button onClick={() => SetPermission(false)}>
          <BiArrowBack size={21} />
        </button>
        <h1 className="font-medium">
          {Permissions}
        </h1>
      </div>
      <div className=" flex flex-col gap-2">
        <p className="text-green-600 lowercase px-4 font-medium">Who can see my {Permissions}</p>
        <div className="py-2 flex flex-col gap-3">
          <div className="flex items-center gap-2 font-medium py-4 p-4">
            <button onClick={()=>setSelectOption("Everyone")} className={`border-2 ${option=="Everyone" ? "border-green-600":"border-zinc-500"} rounded-full p-[3px] flex justify-center items-center w-fit h-fit`}>
              <span className={`${option=="Everyone" && "bg-green-600"} w-[9px] h-[9px]  block rounded-full`}></span>
            </button>
            <p>Everyone</p>
          </div>
          <div className="flex items-center gap-2 font-medium py-4 px-4">
            <button onClick={()=>setSelectOption("My Contacts")} className={`${option=="My Contacts" ? "border-green-600":"border-zinc-500"} border-2 border-zinc-500 rounded-full p-[3px] flex justify-center items-center w-fit h-fit`}>
              <span className={`${option=="My Contacts" && "bg-green-600"} w-[9px] h-[9px]  block rounded-full`}></span>
            </button>
            <p>My Friends Only</p>
          </div>
          <div className="flex items-center gap-2 font-medium px-4 py-4">
            <button onClick={()=>setSelectOption("Nobody")} className={`${option=="Nobody" ? "border-green-600":"border-zinc-500"}  border-2 border-zinc-500 rounded-full p-[3px] flex justify-center items-center w-fit h-fit`}>
              <span className={` ${option=="Nobody" && "bg-green-600"} w-[9px] h-[9px]  block rounded-full`}></span>
            </button>
            <p>Nobody</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PermissionSetting