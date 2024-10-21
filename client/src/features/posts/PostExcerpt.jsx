import React from "react";
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

export const PostsExcerpt = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId))

    return (
        <article key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <Link to={`/post/${post._id}`}><h2>View Post</h2></Link>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.created_at}/>
            <ReactionButtons post={post}/>
        </article>
    )
}