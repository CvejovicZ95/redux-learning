import { Post } from "../models/postSchema.js";

export const getAllPosts = async () => {
    try {
        const allPosts = await Post.find().populate('userId')
        return allPosts
    } catch (error) {
        throw new Error('Error fetcing data')
    }
}

export const addPost = async (title, content, userId) => {
    try {
        const newPost = new Post({
            title,
            content,
            userId
        })
        await newPost.save()
        return newPost
    } catch (error) {
        throw new Error('Error adding post')
    }
}