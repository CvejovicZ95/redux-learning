import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';
import { selectAllUsers, fetchUsers } from "../users/usersSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers);

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch]);

    

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(addNewPost({ title, content, userId }));
            setTitle('');
            setContent('');
            setUserId('')
        }
    };

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const usersOptions = users.map((user) => (
        <option key={user._id} value={user._id}>
            {user.username}
        </option>
    ))

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

            <label htmlFor='postAuthor'>Author:</label>
            <select
                id='postAuthor'
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            >
                <option value={""}></option>
                {usersOptions}
            </select>

            <label htmlFor="postContent">Content</label>
            <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button 
                type="button" 
                onClick={onSavePostClicked}
                disabled = {!canSave}
                >
                Save
            </button>
        </form>
    );
};
