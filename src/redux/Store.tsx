import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User"
import MessageSlice from './message';
import ContactSlice from './Contact';

export const store=configureStore({
    reducer:{
        user:UserSlice,
        message:MessageSlice,
        contact:ContactSlice
    },
});

export type RootState=ReturnType<typeof store.getState>;