import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, selectAllPosts } from './postsSlice';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from './ReactionButtons';

export const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const sortedPosts = posts.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const renderedPosts = sortedPosts.map((post) => (
        <article key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <PostAuthor userId={post.userId}/>
            <TimeAgo timestamp={post.created_at}/>
            <ReactionButtons post={post} />
        </article>
    ));

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};
