
import { DateFormatter } from "../../utils/Formatter";

function RenderMessageDate({ createdAt }: any) {
    return (
        <div className="w-full flex justify-center items-center pb-2">
            <p className="px-2 text-[11px] bg-white py-[2px] shadow rounded-md w-fit">
                {DateFormatter(createdAt)}
            </p>
        </div>
    );
}

export default RenderMessageDate;