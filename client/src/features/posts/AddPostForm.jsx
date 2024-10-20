import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';
import { selectAllUsers, fetchUsers, getUsersStatus, getUsersError } from "../users/usersSlice";
import { useNavigate } from 'react-router-dom';


export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);
    const usersStatus = useSelector(getUsersStatus);
    const error = useSelector(getUsersError);

    useEffect(() => {
        if (usersStatus === 'idle') {
            dispatch(fetchUsers());
        }
    }, [usersStatus, dispatch]);

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, content, userId})).unwrap()

                setTitle('');
                setContent('');
                setUserId('');
                navigate('/')
            } catch (error) {
                console.error('Failed to save the post', error)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    };

    let usersOptions = users.map((user) => (
        <option key={user._id} value={user._id}>
            {user.username}
        </option>
    ))

    if (usersStatus === 'loading') {
        return <p>Loading users...</p>;
    }

    if (usersStatus === 'failed') {
        return <p>{error}</p>;
    }

    if (users.length === 0) {
        usersOptions = <option value="">No users available</option>;
    }

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
