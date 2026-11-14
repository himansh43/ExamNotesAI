import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slices/userSlice";
import noteSlice from "../Slices/notesSlice"

export const store= configureStore({
    reducer:{
        userDetails:userSlice,
        userAllNotes:noteSlice
    }
})
