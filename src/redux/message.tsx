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
        },
        updateMessage: (state, action: PayloadAction<any>) => {
            const index = state.messages.findIndex((item: any) => item.sent == false && item.consumer == action.payload.consumer && item.publisher == action.payload.publisher);
            state.messages[index] = action.payload;
        },
        updateRecived: (state, action: PayloadAction<any>) => {
            state.messages = state.messages.map((item: any) => {
                if (item.consumer == action.payload) {
                    return { ...item, recived: true };
                }
                return item;
            });
        },
        updateSeen: (state, action: PayloadAction<any>) => {
            state.messages = state.messages.map((item: any) => {
                if (item.consumer == action.payload) {
                    return { ...item, seen: true };
                }
                return item;
            });
        }
    }
})

export default MessageSlice.reducer;
export const { setMessage, addNewMessage, toggleSelectMessage, updateMessage, updateSeen, updateRecived } = MessageSlice.actions;