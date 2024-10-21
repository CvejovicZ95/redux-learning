import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";
import { Link, useParams } from "react-router-dom";

export const UserPage = () => {
    const { userId } = useParams()

    const user = useSelector(state => selectUserById(state, userId))

    const postsForUser = useSelector(state => selectPostsByUser(state, userId))

    const postTitles = postsForUser.map(post => (
        <li key={post._id}>
            <Link to={`/post/${post._id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2>{user?.username}</h2>
            <ol>{postTitles}</ol>
        </section>
    )
}