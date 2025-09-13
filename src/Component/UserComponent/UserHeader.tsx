import { BsThreeDotsVertical } from "react-icons/bs"
import { FaSearch } from "react-icons/fa"

function UserHeader() {
  return (
    <div className="shrink-0 w-full p-2 flex items-center shadow-lg">
      <img src="../profile.jpg" className="w-15 h-15 rounded-full shrink-0 p-1 object-cover"/>
      <div className="flex justify-between p-2 w-full">
        <div className="flex flex-col">
          <p className="font-medium">Name</p>
          <button className="text-[12px] text-teal-600 hover:text-green-700 active:text-[brown]">click here for contact info</button>
        </div>
        <div className="flex gap-10">
          <button><FaSearch/></button>
          <button>
          <BsThreeDotsVertical size={21}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserHeader