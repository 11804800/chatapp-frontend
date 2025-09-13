import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User{
   username:string | null; 
   token:string | null;
   user:object | null;
}


function GetUser()
{
    return localStorage.getItem("user");
}

function GetToken()
{
    return localStorage.getItem("token");
}

const initialState:User={
    username:GetUser(),
    token:GetToken(),
    user:null
}

const UserSlice=createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        setUserData:(state,action:PayloadAction<any>)=>{
            state.user=action.payload
        },
        setToken:(state,action:PayloadAction<string>)=>{
            state.token=action.payload
        },
        setUsername:(state,action:PayloadAction<string>)=>{
            state.username=action.payload
        }
    }
})


export default UserSlice.reducer;
export const {setUserData,setToken,setUsername}=UserSlice.actions;