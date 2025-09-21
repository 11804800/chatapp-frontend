import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
    token: string | null;
    user: object | null;
    recipientName: string | null;
}

function GetToken() {
    return localStorage.getItem("token");
}

const initialState: User = {
    token: GetToken(),
    user: null,
    recipientName:null
}

const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<any>) => {
            state.user = action.payload
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setRecipientName:(state,action:PayloadAction<string>)=>{
            state.recipientName=action.payload
        }
    }
})


export default UserSlice.reducer;
export const { setUserData, setToken,setRecipientName } = UserSlice.actions;