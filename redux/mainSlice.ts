import { TUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const mainSlice = createSlice({
    name: 'main',
    initialState: {
        _id: "",
        name: "dsd",
        email: "",
        createdAt: "",
        isAuthenticated: false
    } as TUser, // Explicitly specify initial state type
    reducers: {
        loginDetails: (state: TUser, action: PayloadAction<TUser>) => {
            state._id = action.payload._id;
            state.createdAt = action.payload.createdAt;
            state.email = action.payload.email;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.name = action.payload.name;
        }
    },
});

export const { loginDetails } = mainSlice.actions;
export default mainSlice.reducer;