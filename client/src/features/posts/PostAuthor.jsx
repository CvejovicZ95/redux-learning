import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

export const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers)
    
    const author = users.find(user => user._id === userId._id);
    
    return (
        <span> by {author ? author.username : 'Unknown Author'}</span>
    )
}