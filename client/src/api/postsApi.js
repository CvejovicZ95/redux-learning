const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getPosts = async () => {
    try {
        const res = await fetch(`${apiUrl}/api/posts`)
        const data = await res.json()
        if (data.error) {
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const createPost = async (title, content) => {
    try {
        const response = await fetch(`${apiUrl}/api/posts`, {
            method: "POST",
             headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
            }),
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.error || "Failed to create term");
          }
        return data;
    } catch (error) {
        console.error("Error creating term:", error);
        throw error;
    }
}