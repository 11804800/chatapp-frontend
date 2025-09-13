import MainPage from "../Component/Home/MainPage.tsx";
import MessageContainer from "../Component/Home/MessageContainer.tsx";
import SideNavigation from "../Component/SideNav/SideNavigation.tsx";
function Home() {

  return (
    <div className="relative h-screen w-full flex flex-col-reverse md:flex-row">
      <SideNavigation/>
      <MainPage/>
      <MessageContainer/>
    </div>
  )
}

export default Home