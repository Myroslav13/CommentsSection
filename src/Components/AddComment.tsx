import { useState } from "react"
import type { User, Comment } from "../interfaces.tsx"
import { lastIdFinding } from "../lastIdFinding.tsx"

interface Props {
    dataJson: User;
    commentsDataJson: Comment[];
    setCommentsDataJson:React.Dispatch<React.SetStateAction<Comment[]>>
}

function AddComment({dataJson, commentsDataJson, setCommentsDataJson}:Props) {
    const [commentText, setCommentText] = useState("")

    function handleSend() {
        setCommentsDataJson(prevData => {
            const lastId = lastIdFinding(commentsDataJson)

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
        <div className="d-block d-md-flex justify-content-between bg-white rounded-3 p-4 w-100 gap-3 div-add-comments">
            <div className="d-flex gap-3 w-100">
                <img className="d-none d-md-block" src={dataJson.image.png} alt={dataJson.username} title={dataJson.username} width={30} height={30}></img>

                <div className="form-floating rounded-2 w-100">
                    <textarea className="form-control" placeholder="Add a comment..." id="floatingTextarea2" style={{height: "70px"}} onChange={(e) => setCommentText(e.target.value)} value={commentText}></textarea>
                    <label htmlFor="floatingTextarea2">Add a comment...</label>
                </div>
            </div>

            <div className="d-flex justify-content-between d-md-none pt-3">
                <img src={dataJson.image.png} alt={dataJson.username} title={dataJson.username} width={30} height={30}></img>
                <button className="text-white btn-send py-1 px-4" style={{height: "40px"}} onClick={handleSend}>SEND</button>
            </div>

            <button className="d-none d-md-block text-white btn-send py-1 px-4" style={{height: "40px"}} onClick={handleSend}>SEND</button>
        </div>
    )
}

export default AddComment