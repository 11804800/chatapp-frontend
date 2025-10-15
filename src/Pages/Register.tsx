import { useEffect, useState } from "react"
import { Link } from "react-router"
import Loading from "../Component/Authentication/Loading.js";
import { AxiosVite } from "../utils/Axios.js";
import { useDispatch } from "react-redux";
import { SetUser } from "../redux/User.js";
import ProfileSetup from "../Component/Authentication/ProfileSetup.js";

interface User {
  firstname: string,
  lastname: string,
  username: string,
  password: string
}

function Register() {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [AccountCreated, setAccountCreated] = useState(false);

  useEffect(() => {
    function SetTitle() {
      document.title = "Register"
    }
    SetTitle();
  }, []);


  const [user, setUser] = useState<User>({
    firstname: "",
    lastname: "",
    username: "",
    password: ""
  });


  function InputChange(e: any) {
    setUser((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  function SubmitForm(e: any) {

    e.preventDefault();
    const body: object = {
      username: user.username,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname
    }
    setLoading(true);
    AxiosVite.post("/users/register", body)
      .then((response: any) => {
        dispatch(SetUser(user));
        localStorage.setItem("token", response.data.token);
        setLoading(false);
        setAccountCreated(true);
      }).catch((err: any) => {
        setLoading(false);
        setFormError(err.response.data.message.message);
      })
  }

  return (
    <div className="w-full h-full flex justify-center relative">
      <div className="w-[100%] sm:w-[500px] flex flex-col justify-center items-center h-full p-4">
        <div className="py-8 w-full flex flex-col">
          <h1 className="text-4xl font-semibold text-start pb-2">Sign Up</h1>
          <p className="text-[12px] font-medium text-slate-600">Welcome here !!</p>
        </div>
        <form className="w-full flex flex-col gap-4" onSubmit={SubmitForm}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-1 w-full">
            <div className="flex flex-col gap-2 bg-zinc-200 px-4 py-3 w-full sm:w-1/2 rounded-[8px] shrink-0">
              <label htmlFor="firstname" className="font-medium text-zinc-700 text-[13px]">First Name</label>
              <input required name="firstname" id="firstname" onChange={InputChange} type="text" className="outline-none text-sm" />
            </div>
            <div className="flex flex-col gap-2 bg-zinc-200 px-4 py-3 w-full sm:w-1/2 rounded-[8px] shrink-0">
              <label htmlFor="lastname" className="font-medium text-zinc-700 text-[13px]">Last Name</label>
              <input required name="lastname" id="lastname" onChange={InputChange} type="text" className="outline-none text-sm" />
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-zinc-200 px-4 py-3 rounded-[8px]">
            <label htmlFor="username" className="font-medium text-zinc-700 text-[13px]">Email</label>
            <input required onChange={InputChange} name="username" id="username" type="text" className="outline-none text-sm" />
          </div>
          <div className="flex flex-col gap-2 bg-zinc-200 px-4 py-3 rounded-[8px]">
            <label htmlFor="password" className="font-medium text-zinc-700 text-[13px]">Password</label>
            <input required onChange={InputChange} name="password" id="password" type="text" className="outline-none text-sm" />
          </div>
          <p className="text-[brown] font-medium text-sm">{formError}</p>
          <div className="w-full">
            <button type="submit" className="bg-black rounded-[8px] flex justify-center text-white px-4 py-2 shadow-md font-medium w-full hover:bg-black/85 active:bg-black active:shadow-none">
              {
                loading ?
                  <Loading />
                  : "Sign Up"
              }
            </button>
          </div>
        </form>
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
        <div className="text-[13px] text-slate-600 font-medium flex gap-1">
          <p>Already have an account?</p>
          <Link to="/login" className="active:text-[brown] hover:text-blue-700">Sign In</Link>
          <p>Here</p>
        </div>
      </div>
      {
        AccountCreated &&
        <ProfileSetup setAccountCreated={setAccountCreated} />
      }
    </div>
  )
}

export default Register