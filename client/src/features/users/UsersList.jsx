import { useSelector } from "react-redux"
import { selectAllUsers } from "./usersSlice"
import { Link } from 'react-router-dom'

export const UsersList = () => {
    const users = useSelector(selectAllUsers)
    
    const renderedUsers = users.map(user => (
        <li key={user._id}>
            <Link to={`/user/${user._id}`}>{user.username}</Link>
        </li>
    ))

    return (
        <section>
            <h2>Users</h2>
            <ul>{renderedUsers}</ul>
        </section>
    )
}