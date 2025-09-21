import { Outlet } from 'react-router'
import Navigation from '../Component/Navbar/Navigation'


function HomeLayout() {
    return (
        <div className='relative flex flex-col-reverse md:flex-row h-screen'>
            <Navigation/>
            <Outlet />
        </div>
    )
}

export default HomeLayout