import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User"

export const store=configureStore({
    reducer:{
        user:UserSlice,
    },
});

export type RootState=ReturnType<typeof store.getState>;