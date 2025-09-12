import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User{
   user:object; 
}


const initialState:User={
    user:{}
}

const UserSlice=createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        setUserData:(state,action:PayloadAction<any>)=>{
            state.user=action.payload
        }
    }
})


export default UserSlice.reducer;
export const {setUserData}=UserSlice.actions;