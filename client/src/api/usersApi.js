const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getUsers = async () => {
    try {
        const res = await fetch(`${apiUrl}/api/users`)
        const data = await res.json()
        if (data.error) {
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}