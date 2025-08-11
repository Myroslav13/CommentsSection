import { useState } from "react"
import type { User, Comment } from "./interfaces.tsx"

interface Props {
    dataJson: User,
    setCommentsDataJson:React.Dispatch<React.SetStateAction<Comment[]>>
}

function AddComment({dataJson, setCommentsDataJson}:Props) {
    const [commentText, setCommentText] = useState("")

    function handleSend() {
        setCommentsDataJson(prevData => {
            let lastId = prevData.length > 0 ? prevData[prevData.length - 1].id : 0

            const allReplies = prevData.flatMap(comment => comment.replies);

            const maxReplyId = allReplies.length > 0
            ? Math.max(...allReplies.map(r => r.id))
            : 0;

            if (maxReplyId > lastId) {
                lastId = maxReplyId
            }

            const newComment = {
                id: (lastId + 1),
                content: commentText,
                createdAt: "just now",
                score: 0,
                user: dataJson,
                replies: []
            }

            return [...prevData, newComment]
        })

        setCommentText("")
    }

    return (
        <div className="d-flex justify-content-between bg-white rounded-3 p-4 w-100 gap-3" style={{height: "120px"}}>
            <div className="d-flex gap-3 w-100">
                {/* <img src={dataJson.image.png} alt={dataJson.username} title={dataJson.username} width={30} height={30}></img> */}

                <div className="form-floating rounded-2 w-100">
                    <textarea className="form-control" placeholder="Add a comment..." id="floatingTextarea2" style={{height: "70px"}} onChange={(e) => setCommentText(e.target.value)} value={commentText}></textarea>
                    <label htmlFor="floatingTextarea2">Add a comment...</label>
                </div>
            </div>

            <button className="text-white btn-send py-1 px-4" style={{height: "40px"}} onClick={handleSend}>SEND</button>
        </div>
    )
}

export default AddComment