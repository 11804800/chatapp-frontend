import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ContactInterface {
    Data: [],
    showContactModal: boolean,
    selectContact: boolean,
    showContactInfo: boolean,
    selectedContact: any[],
    isTyping: string
}

const initialState: ContactInterface = {
    Data: [],
    showContactModal: false,
    selectContact: false,
    showContactInfo: false,
    selectedContact: [],
    isTyping: ""
}

const ContactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        setIsTyping: (state, action: PayloadAction<string>) => {
            state.isTyping = action.payload
        },
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
    setSelectedContact,
    setIsTyping,
} = ContactSlice.actions;