import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const SinglePostPage = () => {
    const { postId } = useParams();

    const post = useSelector((state) => selectPostById(state, postId));

    if (!post) {
        return (
            <section>
                <h2>Post not found...</h2>
            </section>
        );
    }

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <Link to={`/post/edit/${post._id}`}>Edit Post</Link>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.created_at}/>
            <ReactionButtons post={post}/>
        </article>
    );
};
