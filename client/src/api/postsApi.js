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

export const createPost = async (title, content, userId) => {
    try {
        const response = await fetch(`${apiUrl}/api/posts`, {
            method: "POST",
             headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
                userId
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

export const updateReactionsOnPost = async (id, emoji) => {
    try {
        const response = await fetch(`${apiUrl}/api/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ emoji }),  
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to update reactions");
        }
        return data;
    } catch (error) {
        console.error("Error updating reactions:", error);
        throw error;
    }
};

export const updateWholePost = async (id, title, content, reactions, userId) => {
    try {
        const response = await fetch(`${apiUrl}/api/posts/wholePost/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
                reactions,
                userId
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to update post");
        }
        return data;
    } catch (error) {
        console.error('Error updating whole post', error);
        throw error;
    }
}

export const deletePost = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/api/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Failed to delete post");
        }

        return { message: "Post deleted successfully" };
    } catch (error) {
        console.error('Error deleting post', error);
        throw error;
    }
}