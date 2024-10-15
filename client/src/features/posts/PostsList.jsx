import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, selectAllPosts } from './postsSlice';
import { PostAuthor } from './PostAuthor';

export const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const renderedPosts = posts.map((post) => (
        <article key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <PostAuthor userId={post.userId}/>
        </article>
    ));

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};
