import { lazy, Suspense} from "react"
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router"
import type { RootState } from "./redux/Store";
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));

function App() {

  const isAuthenticated=useSelector((state:RootState)=>{
    return state.user.username
  });
  
  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><p>Loading...</p></div>}>
          {
            isAuthenticated ? 
            <Home />
            :
            <Login/>
          }
        </Suspense>
      } />
      <Route path="/login" element={
        <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><p>Loading...</p></div>}>
          <Login />
        </Suspense>
      } />
      <Route path="/signup" element={
        <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><p>Loading...</p></div>}>
          <Register />
        </Suspense>
      } />
    </Routes>
  )
}

export default App
