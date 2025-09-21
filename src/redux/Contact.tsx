import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

// interface ContactInterface={
//     Data:[] | null
// }

const initialState={
    Data:[
        {
            id:1,
            name:"nikhil"
        },
        {
            id:2,
            name:"Nikhil Pathak",
        },
        {
            id:3,
            name:"Nikhil Kumar"
        }
    ],
    showContactModal:false
}

const ContactSlice=createSlice({
    name:"contact",
    initialState,
    reducers:{
        setShowContactModal:(state)=>{
            state.showContactModal=!state.showContactModal
        }
    }
});

export default ContactSlice.reducer;
export const {setShowContactModal}=ContactSlice.actions;