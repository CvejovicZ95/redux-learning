import { User } from "../models/usersSchema.js"

export const getAllUsers = async () => {
    try {
        const allUsers = await User.find()
        return allUsers
    } catch (error) {
        throw new Error('Error fetcing data')
    }
}

export const addUser = async (username) => {
    try {
        const newUser = new User({
            username,
        })
        await newUser.save()
        return newUser
    } catch (error) {
        throw new Error('Error adding new user')
    }
}