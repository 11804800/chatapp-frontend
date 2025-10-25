import { lazy, Suspense, } from "react"
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router"
import type { RootState } from "./redux/Store";
const HomePage = lazy(() => import("./Pages/HomePage"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/all";
import ShowAllUserModal from "./Component/Modals/ShowAllUserModal";
import StatusView from "./Component/StatusComponent/StatusView";
import LoadingComponent from "./Component/LoadingComponent";
import ForwardModal from "./Component/Modals/ForwardModal";
import MessageInfo from "./Component/Modals/MessageInfo";
import MediaCarousel from "./Component/Modals/MediaCarousel";
const HomeLayout = lazy(() => import("./Layout/HomeLayout"));
const SettingPage = lazy(() => import("./Pages/SettingPage"));
const StatusPage = lazy(() => import("./Pages/StatusPage"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
gsap.registerPlugin(ScrollTrigger);

function App() {

  const location = useLocation();

  const isAuthenticated = useSelector((state: RootState) => {
    return state.user.token
  });

  const showContactModal = useSelector((state: RootState) => {
    return state.contact.showContactModal
  });


  const PrivateRoute = ({ children }: any) => {
    return isAuthenticated ? (
      children
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };

  const AuthenticatedRoute = ({ children }: any) => {
    return !isAuthenticated ?
      (children) :
      (
        <Navigate to="/" state={{ from: location }} replace />
      );
  }

  const showStatus: string = useSelector((state: RootState) => {
    return state.status.showStatus
  });

  const ForwardMessage: boolean = useSelector((state: RootState) => {
    return state.message.forwardMessage
  });

  const ShowMessageInfo: boolean = useSelector((state: RootState) => {
    return state.message.showMessageInfo
  });

  const showCarousel: boolean = useSelector((state: RootState) => {
    return state.message.showCarousel
  });

  return (
    <>
      {
        showCarousel &&
        <MediaCarousel />
      }
      {
        ShowMessageInfo && <MessageInfo />
      }
      {
        showStatus && <StatusView />
      }
      {
        ForwardMessage && <ForwardModal />
      }
      {
        showContactModal
        &&
        <ShowAllUserModal />
      }
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<LoadingComponent />}>
            <PrivateRoute>
              <HomeLayout />
            </PrivateRoute>
          </Suspense>
        } >
          <Route index element={<HomePage />} />
          <Route path="status" element={<StatusPage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={
          <Suspense fallback={<LoadingComponent />}>
            <AuthenticatedRoute>
              <Login />
            </AuthenticatedRoute>
          </Suspense>
        } />
        <Route path="/signup" element={
          <Suspense fallback={<LoadingComponent />}>
            <AuthenticatedRoute>
              <Register />
            </AuthenticatedRoute>
          </Suspense>
        } />
      </Routes>
    </>
  )
}

export default App
