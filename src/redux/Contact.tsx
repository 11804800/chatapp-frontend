import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ContactInterface {
    Data: [],
    showContactModal: boolean,
    selectContact: boolean,
    showContactInfo: boolean,
    selectedContact: any[]
}

const initialState: ContactInterface = {
    Data: [],
    showContactModal: false,
    selectContact: false,
    showContactInfo: false,
    selectedContact: []
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
        },
        toggleContactInfo: (state) => {
            state.showContactInfo = !state.showContactInfo
        },
        addToSelectContact: (state, action: PayloadAction<any>) => {
            if (state.selectedContact.includes(action.payload)) {
                const newArray = state.selectedContact.filter((item: string) => item !== action.payload);
                state.selectedContact = newArray;
            }
            else {
                state.selectedContact.push(action.payload);
            }
        },
        setSelectedContact: (state) => {
            state.selectedContact = []
        }
    }
});

export default ContactSlice.reducer;
export const {
    setShowContactModal,
    setContactData,
    toggleSelectContact,
    toggleContactInfo,
    addToSelectContact,
    setSelectedContact } = ContactSlice.actions;