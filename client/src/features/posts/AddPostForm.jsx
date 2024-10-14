import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost } from './postsSlice';

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(addNewPost({ title, content }));
            setTitle('');
            setContent('');
        }
    };

    return (
        <form>
            <label htmlFor="postTitle">Title</label>
            <input
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="postContent">Content</label>
            <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="button" onClick={onSavePostClicked}>
                Save
            </button>
        </form>
    );
};
