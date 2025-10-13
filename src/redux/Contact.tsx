import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ContactInterface {
    Data: [],
    showContactModal: boolean,
    selectContact: boolean
}

const initialState: ContactInterface = {
    Data: [],
    showContactModal: false,
    selectContact: false
}

const ContactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        setShowContactModal: (state) => {
            state.showContactModal = !state.showContactModal
        },
        setContactData: (state, action: PayloadAction<any>) => {
            state.Data = action.payload
        },
        toggleSelectContact: (state) => {

            state.selectContact = !state.selectContact
        }
    }
});

export default ContactSlice.reducer;
export const { setShowContactModal, setContactData, toggleSelectContact } = ContactSlice.actions;