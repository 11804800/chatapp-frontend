import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User"
import MessageSlice from './message';
import ContactSlice from './Contact';
import StatusSlice from "./status";

export const store = configureStore({
    reducer: {
        user: UserSlice,
        message: MessageSlice,
        contact: ContactSlice,
        status: StatusSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;