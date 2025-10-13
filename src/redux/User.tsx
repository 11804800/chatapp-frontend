import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface User {
    token: string | null;
    user: object | null;
    recipientName: string | null;
    userData: {},
    contact: any[]
}

function GetToken() {
    return localStorage.getItem("token");
}

const initialState: User = {
    token: GetToken(),
    user: null,
    recipientName: null,
    userData: {},
    contact: []
}

const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        SetUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setRecipientName: (state, action: PayloadAction<string>) => {
            state.recipientName = action.payload
        },
        setUserData: (state, action: PayloadAction<any>) => {
            state.userData = action.payload
        },
        setContact: (state, action: PayloadAction<any>) => {
            state.contact = action.payload
        },
        AddNewContact: (state, action: PayloadAction<any>) => {
            state.contact.push(action.payload);
        }
    }
})


export default UserSlice.reducer;
export const { SetUser, setToken, setRecipientName, setUserData, AddNewContact, setContact } = UserSlice.actions;