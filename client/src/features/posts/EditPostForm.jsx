import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById, updatePost, deleteSignlePost } from './postsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { selectAllUsers } from '../users/usersSlice';

export const EditPostForm  = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, postId))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post ? post.title : ''); 
    const [content, setContent] = useState(post ? post.content : '');
    const [userId, setUserId] = useState(post ? post.userId : '');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const dispatch = useDispatch()

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
            setUserId(post.userId);
        }
    }, [post]);

    if (!post) {
        return (
            <section>
                <h2>Post not found</h2>
            </section>
        )
    }

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                dispatch(updatePost({ id: post._id, title, content, reactions: post.reactions, userId })).unwrap()

                setTitle('');
                setContent('');
                setUserId('');
                navigate(`/post/${postId}`)
            } catch (error) {
                console.error('Failed to save edited post', error)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    let usersOptions = users.map((user) => (
        <option key={user._id} value={user._id}>
            {user.username}
        </option>
    ));

    const onDeletePostClick = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                dispatch(deleteSignlePost({ id: post._id })).unwrap()

                setTitle('');
                setContent('');
                setUserId('');
                navigate('/')
            } catch (error) {
                console.error('Failed to delete post', error)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    return (
        <section>
            <h2>Edit post</h2>
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
                disabled={!canSave}
            >
                Save Edit
            </button>

            <button 
                type="button" 
                onClick={onDeletePostClick}
                className='deletePost'
            >
                Delete Post
            </button>
        </form>
        </section>
    )
};
