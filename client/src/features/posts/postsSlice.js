import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, createPost } from '../../api/postsApi';

const initialState = [];

// Thunk za učitavanje postova
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await getPosts();
    return response;
});

// Thunk za dodavanje posta
export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
    const response = await createPost(newPost.title, newPost.content);
    return response;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                return action.payload; // Puni stanje sa postovima kad se uspešno dohvatilo
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.push(action.payload); // Dodaje novi post u stanje
            });
    }
});

export const selectAllPosts = (state) => state.posts;

export default postsSlice.reducer;
