import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MessagesInterface {
    messages: any[],
    selectMessage: boolean
}

const initialState: MessagesInterface = {
    messages: [],
    selectMessage: false
}

const MessageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<any>) => {
            state.messages = action.payload
        },
        addNewMessage: (state, action: PayloadAction<any>) => {
            state.messages.push(action.payload);
        },
        toggleSelectMessage: (state) => {
            state.selectMessage = !state.selectMessage
        }
    }
})

export default MessageSlice.reducer;
export const { setMessage, addNewMessage, toggleSelectMessage } = MessageSlice.actions;