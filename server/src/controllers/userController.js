import { getAllUsers, addUser } from "../service/userService.js";

export const getAllUsersController = async (req, res) => {
    try {
        const allUsers = await getAllUsers()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json('Server error')
    }
}

export const addNewUserController = async (req, res) => {
    try {
        const { username } = req.body
        const newUser = await addUser(username)

        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json('Server error')
    }
}