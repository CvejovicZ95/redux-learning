import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    { id:'0', name:'Zoran' },
    { id:'1', name:'Marko' },
    { id:'2', name:'Darko' },
]

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{}
})

export const selectAllUsers = (state) => state.users

export default usersSlice.reducer