import { Outlet } from 'react-router'
import Navigation from '../Component/Navbar/Navigation'
import { useContext, useEffect } from 'react'
import { SocketContext } from '../SocketProvider/SockerProvider'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/Store'
import { updateUserOnlineStatus } from '../redux/User'


function HomeLayout() {

    const dispatch = useDispatch();

    const userData: any = useSelector((state: RootState) => {
        return state.user.userData
    });

    const { socket }: any = useContext(SocketContext);
    useEffect(() => {
        socket.emit("connection", { id: userData._id });

        socket.on("user-online", (data: any) => {
            dispatch(updateUserOnlineStatus({
                id: data.data,
                online: true
            }));
        });

        socket.on("user-offline", (data: any) => {
            dispatch(updateUserOnlineStatus({
                id: data.data,
                online: false,
                onlineTime: new Date().toISOString()
            }));
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <div className='relative flex flex-col-reverse md:flex-row h-screen'>
            <Navigation />
            <Outlet />
        </div>
    )
}

export default HomeLayout