import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, selectAllPosts, getPostsStatus, getPostsError } from './postsSlice';
import { PostsExcerpt } from './PostExcerpt';

export const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    useEffect(() => {
        if (postStatus === 'idle'){
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    let content;
    if (postStatus === 'loading') {
        content = <p>Loading...</p>
    } else if (postStatus === 'succeeded') {
        const sortedPosts = posts.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        content = sortedPosts.map(post => <PostsExcerpt key={post._id} post={post} /> )
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>
    }

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    );
};
