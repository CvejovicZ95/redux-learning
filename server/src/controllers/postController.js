import { getAllPosts, addPost, updatePostReactions, updateWholePost, deletePost } from "../service/postService.js";

export const getAllPostsController = async (req, res) => {
    try {
        const allPosts = await getAllPosts()
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(500).json('Server error')
    }
}

export const addPostController = async (req, res) => {
    try {
        const { title, content, userId} = req.body
        const newPost = await addPost(title, content, userId)

        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json('Server error')
    }
}

export const updatePostReactionsController = async (req, res) => {
    try {
        const { id } = req.params;  
        const { emoji } = req.body;  

        const updatedPost = await updatePostReactions(id, emoji);

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateWholePostController = async (req, res) => {
    try {
        const postId = req.params.id
        const newData = req.body
        const updatedPost = await updateWholePost(postId, newData)
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}

export const deletePostController = async (req, res) => {
    try {
        const postId = req.params.id
        await deletePost(postId)
        res.status(200).json({ message: 'Post deleted successfully'})
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}