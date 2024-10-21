import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { getPosts, createPost, updateReactionsOnPost, updateWholePost, deletePost } from '../../api/postsApi';

const postsAdapter = createEntityAdapter({
    selectId: (post) => post._id,
    sortComparer: (a, b) => new Date(b.created_at) - new Date(a.created_at)
});

const initialState = postsAdapter.getInitialState({
    status: 'idle', // 'idle', | 'loading' | 'succeeded', | 'error' 
    error: null,
    count:0
});

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
    reducers: {
        increaseCount(state, action) {
            state.count = state.count + 1
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                postsAdapter.setAll(state, action.payload)
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                postsAdapter.addOne(state, action.payload)
            })
            .addCase(updateReaction.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                postsAdapter.updateOne(state, {
                    id:updatedPost._id,
                    changes: {reactions: updatedPost.reactions}
                })
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
                postsAdapter.updateOne(state , {
                    id:updatedPost._id,
                    changes: {
                        title: updatedPost.title,
                        content: updatedPost.content,
                        reactions: updatedPost.reactions,
                        userId: updatedPost.userId
                    }
                })
            })
            .addCase(deleteSignlePost.fulfilled, (state, action) => {
                const postToDelete = action.meta.arg.id; 
                postsAdapter.removeOne(state, postToDelete)
            })
    }
});

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)

export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error
export const getCount = (state) => state.posts.count

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId._id === userId)
)

export const { increaseCount } = postsSlice.actions

export default postsSlice.reducer;
