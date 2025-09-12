import { CiSettings } from "react-icons/ci"
import { MdMessage } from "react-icons/md"

function SideNavigation() {
    return (
        <div className=" bg-white w-full border-t md:w-fit md:border-r-[1px] border-zinc-200 flex flex-row md:flex-col justify-between h-fit md:h-full px-2">
            <div className="md:py-4 flex flex-row md:flex-col gap-2 p-2">
                <button className="hover:bg-zinc-200  p-2 rounded-full active:bg-white">
                    <MdMessage size={30}/>
                </button>
                <button className="hover:bg-zinc-200 p-2 rounded-full active:bg-white">
                    <img src="../status.png" className="w-8" />
                </button>
            </div>
            <div className="flex flex-row md:flex-col gap-2 md:py-4 p-2">
                <button className="hover:bg-zinc-200 p-2 rounded-full active:bg-white">
                    <CiSettings size={30} />
                </button>
            </div>
        </div>
    )
}

export default SideNavigation