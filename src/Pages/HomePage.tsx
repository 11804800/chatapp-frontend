import { useContext, useEffect } from "react";
import MainPage from "../Component/Home/MainPage.tsx";
import MessageContainer from "../Component/Home/MessageContainer.tsx";
import { SocketContext } from "../SocketProvider/SockerProvider.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/Store.tsx";
import { addNewMessage, setMessage, updateMessage, updateRecived, updateSeen } from "../redux/message.tsx";
import { AddNewContact, updateLastMessage } from "../redux/User.tsx";
import { AxiosVite } from "../utils/Axios.tsx";

function HomePage() {

  const { socket }: any = useContext(SocketContext);
  const dispatch = useDispatch();

  const RecipentName: any = useSelector((state: RootState) => {
    return state.user.recipientName
  });

  const userData: any = useSelector((state: RootState) => {
    return state.user.userData
  });

  const contact: any = useSelector((state: RootState) => {
    return state.user.contact
  });

  const token: string | null = useSelector((state: RootState) => {
    return state.user.token
  });

  const message = useSelector((state: RootState) => {
    return state.message.messages
  });


  useEffect(() => {
    function GetMessages() {
      if (token) {
        AxiosVite.get("/messages", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then((response: any) => {
          dispatch(setMessage(response.data.data));
        })
          .catch((err: any) => {
            console.log(err);
          });
      }
    }
    GetMessages();
  }, []);


  useEffect(() => {
    if (message) {
      const FilterData: any = message.filter((item: any) => item.consumer == userData._id && item?.recived == false);
      if (FilterData.length >= 1) {
        const isArray = FilterData.map((item: any) => item._id);
        const body: any = {
          idArray: isArray
        };

        AxiosVite.put("/messages", body, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then((response: any) => {
            if (response) {
              socket.emit("message-recived", { data: response.data.reciever });
            }
          }).catch((err: any) => console.log(err));
      }

    }

  }, [message]);



  useEffect(() => {
    socket.emit("connection", { id: userData._id });
    socket.on("new-message", (data: any) => {
      const publisherId = data.data.publisher;
      const contactExists = contact.some((item: any) => item.userId._id === publisherId);
      if (!contactExists) {
        dispatch(addNewMessage(data.data));
        dispatch(updateLastMessage({ id: data.data.publisher, message: data.data.message }));
      }
      else {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        AxiosVite.get(`/users/info/${data.data.publisher}`, config).then((response: any) => {
          dispatch(AddNewContact({
            userId: response.data,
            lastMessage: data.data.message,
            unseenmessagecount: 1
          }));
          dispatch(addNewMessage(data.data));
          dispatch(updateLastMessage({ id: data.data.publisher, message: data.data.message }));
        }).catch((err) => { console.log(err.response.data) });
      }

    });

    socket.on("message-sent", (data: any) => {
      dispatch(updateMessage(data.data));
    });

    socket.on("message-seen-ack", (data: any) => {
      if (data.data) {
        dispatch(updateSeen(data.data));
      }
    })

    socket.on("message-recived-ack", (data: any) => {
      dispatch(updateRecived(data.data.data));
    })



  }, []);

  return (
    <div className={`${RecipentName ? "h-screen" : "h-[90%] md:h-screen"} w-full flex relative`}>
      <MainPage />
      <MessageContainer />
    </div>
  )
}

export default HomePage