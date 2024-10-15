import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, createPost, updateReactionsOnPost } from '../../api/postsApi';

const initialState = [];

// Thunk za učitavanje postova
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await getPosts();
    return response;
});

// Thunk za dodavanje posta
export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
    const response = await createPost(newPost.title, newPost.content, newPost.userId);
    return response;
});

export const updateReaction = createAsyncThunk('post/updateReaction', async ({ postId, emoji}) => {
    const response = await updateReactionsOnPost(postId, emoji);
    return response
})

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
            })
            .addCase(updateReaction.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                const existingPost = state.find(post => post._id === updatedPost._id)
                if (existingPost) {
                    existingPost.reactions = updatedPost.reactions
                }
            })
    }
});

export const selectAllPosts = (state) => state.posts;

export default postsSlice.reducer;
