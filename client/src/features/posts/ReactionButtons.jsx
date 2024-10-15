import React from "react";
import { useDispatch } from "react-redux";
import { updateReaction } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: { emoji: "👍", type: "thumbsUp" },
    love: { emoji: "❤️", type: "love" },
    laugh: { emoji: "😂", type: "laugh" },
    surprised: { emoji: "😮", type: "surprised" },
    sad: { emoji: "😢", type: "sad" },
};

export const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => dispatch(updateReaction({ postId: post._id, emoji: name}))
                }
            >
                {emoji.emoji} {post.reactions[name]}
            </button>
        )
    })
    
    return <div>{reactionButtons}</div>
}