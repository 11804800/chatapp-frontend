import { useEffect, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Link } from "react-router"
import Loading from "../Component/Authentication/Loading.jsx";

interface User{
  username:string;
  password:string;
}
function Login() {

  const [loading,setLoading]=useState(false);
  
  const [user,setUser]=useState<User>({
    username:"",
    password:""
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    function SetTitle() {
      document.title = "Sign In"
    }
    SetTitle();
  }, []);

  function InputChange(e)
  {
    setUser((prev)=>({
      ...prev,[e.target.name]:e.target.value
    }));
  }

  function FormSubmit()
  {
    console.log(user);
    setLoading(true);
  }

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-[100%] sm:w-[500px]  flex flex-col justify-center items-center h-full p-4">
        <div className="py-8 w-full flex flex-col">
          <h1 className="text-4xl font-semibold text-start pb-2">Sign In</h1>
          <p className="text-[12px] font-medium text-slate-600">Welcome back !!</p>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2 bg-zinc-200 px-4 py-3 rounded-[8px]">
            <label htmlFor="username" className="font-medium text-zinc-700 text-[13px]">Email</label>
            <input onChange={InputChange} required name="username" id="username" type="text" className="outline-none text-sm" />
          </div>
          <div className="flex flex-col gap-2 bg-zinc-200 px-4 py-3 rounded-[8px]">
            <label htmlFor="password" className="font-medium text-zinc-700 text-[13px]">Password</label>
            <div className="w-full flex justify-between">
              <input onChange={InputChange} required name="password" id="password" type={!showPassword ? "password":"text"} className="outline-none w-[90%] text-sm" />
                {
                  showPassword ?
                    <button onClick={()=>{setShowPassword(false)}}>
                      <GoEye /> 
                    </button>
                    :
                    <button onClick={()=>setShowPassword(true)}>
                      <GoEyeClosed />
                    </button>
                }
            </div>
          </div>
          <div className="text-[12px] w-full flex justify-end font-medium">
            <Link to="/" className="hover:text-blue-600 active:text-[brown]">Forgot Password ?</Link>
          </div>
          <div>
            <button onClick={FormSubmit} className="bg-black rounded text-white px-4 py-2 shadow-md font-medium w-full flex justify-center items-center hover:bg-black/85 active:bg-black active:shadow-none">
              {
                loading ?
                <Loading/>:"Sign In"
              }
            </button>
          </div>
        </div>
        <div className="pt-7 text-[12px] text-slate-500 font-medium w-[200px] flex justify-center items-center gap-1">
          <span className="border-b h-[1px] w-1/2 border-slate-500"></span>
          <p className="text-nowrap">or continue with</p>
          <span className="border-b h-[1px] w-1/2 border-slate-500"></span>
        </div>
        <div className="flex gap-4 py-8">
          <button className="border border-slate-500 p-1 rounded-full flex justify-center w-[80px]">
            <img src="../google.png" className="w-[24px] rounded-full" />
          </button>
          <button className="border border-slate-500 p-1 rounded-full flex justify-center w-[80px]">
            <img src="../fb.png" className="w-[24px] h-[24px] rounded-full" />
          </button>
          <button className="border border-slate-500 p-1 rounded-full flex justify-center w-[80px]">
            <img src="../x.png" className="w-[24px] rounded-full h-[24px]" />
          </button>
        </div>
        <div className="text-[13px] text-slate-600 font-medium flex gap-1 py-2">
          <p>Don't have an account yet?</p>
          <Link to="/signup" className="active:text-[brown] hover:text-blue-700">Sign Up</Link>
          <p>for free</p>
        </div>
      </div>
    </div>
  )
}

export default Login