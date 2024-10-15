import { getAllPosts, addPost } from "../service/postService.js";

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