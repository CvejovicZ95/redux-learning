import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUsers } from "../../api/usersApi";

const initialState = {
    users: [],
    status: 'idle', // 'idle', | 'loading' | 'succeeded', | 'error' 
    error: null
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await getUsers();
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status= 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload
                state.status = 'succeeded'
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })            
    }
})

export const selectAllUsers = (state) => state.users.users
export const getUsersStatus = (state) => state.users.status
export const getUsersError = (state) => state.users.error

export default usersSlice.reducer