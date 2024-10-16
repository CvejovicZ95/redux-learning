import React from "react";
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

export const PostsExcerpt = ({ post }) => {
    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.created_at}/>
            <ReactionButtons post={post}/>
        </article>
    )
}