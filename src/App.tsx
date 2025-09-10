import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router"
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><p>Loading...</p></div>}>
          <Home />
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
