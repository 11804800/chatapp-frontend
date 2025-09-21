import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// interface MessagesInterface={
//     messages:[] | null
// }

const initialState = {
    messages: [
        {
            id: 1,
            reciver: "nikhil",
            message: "Hi"
        },
        {
            id: 2,
            reciver: "nikhilpa",
            message: "Hi"
        },
        {
            id: 3,
            reciver: "nikhil",
            message: "Hi"
        },
        {
            id: 4,
            reciver: "nikhilpa",
            message: "Hi"
        },
        {
            id: 5,
            reciver: "nikhilpa",
            message: "Hi"
        },
        {
            id: 6,
            reciver: "nikhil",
            message: "Hi"
        },
        {
            id: 7,
            reciver: "nikhilpa",
            message: "Hi"
        },
        {
            id: 8,
            reciver: "nikhil",
            message: "Hi"
        },
        {
            id: 9,
            reciver: "nikhil",
            message: "Hi"
        },
        {
            id: 11,
            reciver: "nikhilpa",
            message: "Hi"
        },
        {
            id: 8,
            reciver: "nikhil",
            message: "Hi"
        },
        {
            id: 9,
            reciver: "nikhil",
            message: "Hi"
        },
        {
            id: 11,
            reciver: "nikhilpa",
            message: "Hi"
        },
        
    ]
}

const MessageSlice=createSlice({
    name:"message",
    initialState,
    reducers:{
        addNewMessage:(state,action:PayloadAction<any>)=>{
            state.messages.push(action.payload);
        }
    }
})

export default MessageSlice.reducer;
export const {addNewMessage}= MessageSlice.actions;