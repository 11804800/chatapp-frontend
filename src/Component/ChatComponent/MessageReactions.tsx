import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../../SocketProvider/SockerProvider";
import { updateReaction } from "../../redux/message";
import { setLastMessage } from "../../redux/User";

function MessageReactions({ user, setShowReactionOption, ItemId }: any) {

    const RecientName: string | null = useSelector((state: RootState) => {
        return state.user.recipientName
    });

    const UserData: any = useSelector((state: RootState) => {
        return state.user.userData
    });

    const dispatch = useDispatch();

    const OptionRef = useRef<any>(null);

    useEffect(() => {
        const handler = (e: any) => {
            if (!OptionRef.current.contains(e.target)) {
                setShowReactionOption(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }

    }, []);

    const { socket }: any = useContext(SocketContext);

    function SentReaction(reaction: string) {
        setShowReactionOption(false);
        const body = {
            messageId: ItemId,
            consumer: RecientName,
            publisher: UserData?._id,
            reaction: reaction
        }
        socket.emit("reaction", body);
        dispatch(updateReaction(body));
        dispatch(setLastMessage({
            id: RecientName,
            message: "Reacted to message"
        }));
    }

    return (
        <div ref={OptionRef} className={`absolute z-[999] -top-[45px] md:-top-[32px] ${user == RecientName ? "right-28 md:right-40" : "left-28 md:left-40"} bg-white shadow rounded-full px-4 py-2 flex gap-3`}>
            <button onClick={() => SentReaction("sad")}>
                <img src="/sad.png" className="w-7 h-7" />
            </button>
            <button onClick={() => SentReaction("shocked")}>
                <img src="/shocked.png" className="w-7 h-7" />
            </button>
            <button onClick={() => SentReaction("heart")}>
                <img src="/heart.png" className="w-7 h-7" />
            </button>
            <button onClick={() => SentReaction("thumbsup")}>
                <img src="/thumbsup.png" className="w-full h-7" />
            </button>
            <button onClick={() => SentReaction("namaste")}>
                <img src="/namaste.png" className="w-full h-7" />
            </button>
            <button onClick={() => SentReaction("shocked2")}>
                <img src="/shocked2.png" className="w-full h-7" />
            </button>
        </div>
    )
}

export default MessageReactions