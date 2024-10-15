import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUsers } from "../../api/usersApi";

const initialState= []

export const fetchUsers = createAsyncThunk('posts/fetchUsers', async () => {
    const response = await getUsers()
    return response
})

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export const selectAllUsers = (state) => state.users

export default usersSlice.reducer