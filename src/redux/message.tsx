import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MessagesInterface {
    messages: any[],
    selectMessage: boolean
    selectedMessage: any[]
}

const initialState: MessagesInterface = {
    messages: [],
    selectedMessage: [],
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
        },
        deleteMessages: (state, action: PayloadAction<any>) => {
            state.messages = state.messages.filter((item: any) => !action.payload.includes(item?._id));
        },
        addToSelectedMessage: (state, action: PayloadAction<any>) => {
            if (state.selectedMessage.includes(action.payload)) {
                const newArray = state.selectedMessage.filter((item: string) => item !== action.payload);
                state.selectedMessage = newArray;
            }
            else {
                state.selectedMessage.push(action.payload);
            }
        },
        setSelectedMessages: (state) => {
            state.selectedMessage = []
        },
        filterMessage: (state, action: PayloadAction<any>) => {
            state.messages = state.messages.filter((item: any) => !(item.consumer === action.payload || item.publisher === action.payload));
        }
    }
})

export default MessageSlice.reducer;
export const { setMessage,
    addNewMessage,
    toggleSelectMessage,
    updateMessage,
    updateSeen,
    updateRecived,
    deleteMessages,
    addToSelectedMessage,
    filterMessage,
    setSelectedMessages } = MessageSlice.actions;