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
            const isExist = state.contact.some((item: any) => item.userId._id == action.payload.userId._id);
            if (!isExist) {
                state.contact.push(action.payload);
            }
        },
        setLastMessage: (state, action: PayloadAction<any>) => {
            const index = state.contact.findIndex((item: any) => item.userId._id == action.payload.id);
            state.contact[index].lastMessage = action.payload.message;
        },
        updateLastMessage: (state, action: PayloadAction<any>) => {
            const index = state.contact.findIndex((item: any) => item.userId._id == action.payload.id);
            state.contact[index].lastMessage = action.payload.message;
            state.contact[index].unseenmessagecount = state.contact[index].unseenmessagecount + 1;
        },
        setUnseenMessageCount: (state, action: PayloadAction<any>) => {
            const index = state.contact.findIndex((item: any) => item.userId._id == action.payload);
            state.contact[index].unseenmessagecount = 0;
        },
        removeContact: (state, action: PayloadAction<any>) => {
            const { index } = action.payload;
            console.log(state.contact.find((item: any, i: number) => i == index));
        }
        ,
        Logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
        }
    }
})


export default UserSlice.reducer;
export const { SetUser, setToken, setRecipientName, setUserData, AddNewContact, setContact, Logout, removeContact, updateLastMessage, setUnseenMessageCount, setLastMessage } = UserSlice.actions;