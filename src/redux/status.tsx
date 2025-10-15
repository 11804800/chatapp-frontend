import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface StatusInterface {
    showStatus: string,
    myStatus: any[],
    status: any[]
}
const initialState: StatusInterface = {
    showStatus: "",
    myStatus: [],
    status: []
}

const StatusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        SetStatus: (state, action: PayloadAction<any>) => {
            state.status = action.payload
        },
        setMyStatus: (state, action: PayloadAction<any>) => {
            state.myStatus = action.payload
        },
        updateMyStatus: (state, action: PayloadAction<any>) => {
            state.myStatus.push(action.payload)
        },
        addNewStatus: (state, action: PayloadAction<any>) => {
            state.status.push(action.payload);
        },
        setShowStatus: (state, action: PayloadAction<string>) => {
            state.showStatus = action.payload
        },
        deleteStatus: (state, action: PayloadAction<any>) => {
            state.myStatus.splice(action.payload, 1);
        }
    }
});

export default StatusSlice.reducer;
export const { SetStatus, addNewStatus, setMyStatus, updateMyStatus, setShowStatus, deleteStatus } = StatusSlice.actions;