import { createSlice } from "@reduxjs/toolkit";

const transferSlice = createSlice({
    name: "transfer",
    initialState:{
        selectedTransfer:null
    },
    reducers: {
        setSelectedTrasfer: (state,action) => {
            state.selectedTransfer = action.payload
        }
    }
})

export const { setSelectedTrasfer } = transferSlice.actions;
export default transferSlice.reducer;