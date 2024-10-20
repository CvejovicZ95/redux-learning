import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, createPost, updateReactionsOnPost, updateWholePost, deletePost } from '../../api/postsApi';

const initialState = {
    posts:[],
    status: 'idle', // 'idle', | 'loading' | 'succeeded', | 'error' 
    error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
    try {
        const response = await getPosts();
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost, { rejectWithValue }) => {
    try {
        const response = await createPost(newPost.title, newPost.content, newPost.userId);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateReaction = createAsyncThunk('posts/updateReaction', async ({ postId, emoji }, { rejectWithValue }) => {
    try {
        const response = await updateReactionsOnPost(postId, emoji);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, title, content, reactions, userId }, { rejectWithValue }) => {
    try {
        const response = await updateWholePost(id, title, content, reactions, userId);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteSignlePost = createAsyncThunk('posts/deletePost' , async({ id }, { rejectWithValue }) => {
    try {
        const response = await deletePost(id);
        return response;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = action.payload; 
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updateReaction.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                const existingPost = state.posts.find(post => post._id === updatedPost._id)
                if (existingPost) {
                    existingPost.reactions = updatedPost.reactions
                }
            })
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload
            })
            .addCase(addNewPost.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(updateReaction.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                const existingPost = state.posts.find(post => post._id === updatedPost._id);
                if (existingPost) {
                    existingPost.title = updatedPost.title;
                    existingPost.content = updatedPost.content;
                    existingPost.reactions = updatedPost.reactions;
                    existingPost.userId = updatedPost.userId;
                }
            })
            .addCase(deleteSignlePost.fulfilled, (state, action) => {
                const idToDelete = action.meta.arg.id; 
                state.posts = state.posts.filter(post => post._id !== idToDelete);
            })
    }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error

export const selectPostById = (state, postId) => 
    state.posts.posts.find(post => post._id === postId) 

export default postsSlice.reducer;
