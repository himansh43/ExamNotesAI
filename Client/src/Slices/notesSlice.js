import { createSlice } from "@reduxjs/toolkit"

const notesSlice=createSlice({
    name:"userAllNotes",
    initialState:{
        allNotes:null
    },
    reducers:{
        setAllNotes:(state,action)=>{    
            state.allNotes= action.payload
        }
    }
})


export const {setAllNotes}= notesSlice.actions
export default notesSlice.reducer