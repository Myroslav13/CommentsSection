import { useState } from "react";
import type { Comment, User } from "./interfaces.tsx"

interface Props {
    dataComments: Comment[];
    dataUser: User;
    setCommentsDataJson:React.Dispatch<React.SetStateAction<Comment[]>>;
}

function CommentSection({dataComments, dataUser, setCommentsDataJson}:Props) {
    const [deleteBtnClicked, setDeleteBtnClicked] = useState(false)
    const [editBtnClicked, setEditBtnClicked] = useState(false)
    const [replyBtnClicked, setReplyBtnClicked] = useState(false)

    const [commentIdToDelete, setCommentIdToDelete] = useState(-1)
    const [commentIdToEdit, setCommentIdToEdit] = useState(-1)
    const [commentIdToReply, setCommentIdToReply] = useState(-1)

    const [editText, setEditText] = useState("")

    function handleDelete(id: number) {
        setCommentsDataJson(prevData =>
            prevData
                .map(comment => ({
                    ...comment,
                    replies: comment.replies.filter(reply => reply.id !== id)
                }))
                .filter(comment => comment.id !== id)
        );
    }
    

    function handleEdit(id: number) {
        setCommentsDataJson(prevData => 
            prevData.map(comment => {
                if (comment.id === id) {
                    return {...comment, content: editText};
                } else {
                    return {
                        ...comment,
                        replies: comment.replies.map(reply => 
                        reply.id === id 
                            ? {...reply, content: editText} 
                            : reply
                        )
                    };
                }
            })
        );

        setEditBtnClicked(false)
    }

    function handleReply() {

    }

    return (
        <>
            {deleteBtnClicked === true ? 
                <>
                    <div className="modal-backdrop fade show"></div>

                    <div className="modal show d-block">
                        <div className="modal-dialog modal-dialog-centered w-25">
                            <div className="modal-content text-start p-4">
                                <h5>Delete comment</h5>
                            
                                <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                                
                                <div className="d-flex gap-3 justify-content-between align-items-center">
                                    <button type="button" className="btn w-50" data-bs-dismiss="modal" onClick={() => setDeleteBtnClicked(false)} style={{backgroundColor: "gray", color: "white"}}>NO, CANCEL</button>
                                    <button type="button" className="btn w-50" onClick={() => {setDeleteBtnClicked(false); handleDelete(commentIdToDelete)}} style={{backgroundColor: "#ed6565", color: "white"}}>YES, DELETE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <></>
            }

            <div className='d-flex align-items-center flex-column'>
                {
                    dataComments.map((el, index) => (
                        <>
                            {/* Comment */}
                            <div className="d-flex bg-white rounded-3 p-4 mb-3 w-100 align-items-center" key={index}>
                                <div className="rounded-2 comment-side-div px-2 me-4 d-flex flex-column gap-2">
                                    <button className="btn-vote p-0"><img src="./images/icon-plus.svg"></img></button>
                                    <h2 className="fs-5 m-0">{el.score}</h2>
                                    <button className="btn-vote p-0"><img src="./images/icon-minus.svg"></img></button>
                                </div>

                                <div className="w-100">
                                    <div className="d-flex justify-content-between pb-2 w-100">
                                        <div className="d-flex align-items-center gap-2">
                                            <img src={el.user.image.png} width={30} alt={el.user.username} title={el.user.username}></img>
                                            <h2 className="m-0 fs-6">{el.user.username}</h2>               
                                            {dataUser.username === el.user.username ? <p className="m-0 p-you">you</p> : null}
                                            <p className="m-0 p-date">{el.createdAt}</p>
                                        </div>

                                        {dataUser.username === el.user.username ? 
                                            <div className="d-flex">
                                                <button className="d-flex align-items-center gap-2 btn-delete">
                                                    <img src="./images/icon-delete.svg" width={15} height={15} alt="delete"></img>
                                                    <p className="m-0 p-delete fw-bold" onClick={() => {setDeleteBtnClicked(true); setCommentIdToDelete(el.id)}}>Delete</p>
                                                </button>
                                                <button className="d-flex align-items-center gap-2 btn-reply">
                                                    <img src="./images/icon-edit.svg" width={15} height={15} alt="edit"></img>
                                                    <p className="m-0 p-reply fw-bold" onClick={() => {setEditBtnClicked(true); setEditText(el.content); setCommentIdToEdit(el.id)}}>Edit</p>
                                                </button>
                                            </div> 
                                            :
                                            <button className="d-flex align-items-center gap-2 btn-reply">
                                                <img src="./images/icon-reply.svg" width={15} height={15} alt="reply"></img>
                                                <p className="m-0 p-reply fw-bold" onClick={handleReply}>Reply</p>
                                            </button>
                                        }
                                    </div>

                                    <div className="w-100">
                                        {editBtnClicked === true && el.id === commentIdToEdit ? 
                                        <div className="d-flex gap-3">
                                            <div className="form-floating rounded-2 w-100">
                                                <textarea className="form-control" placeholder="Add a comment..." id="floatingTextarea2" style={{height: "70px"}} onChange={(e) => setEditText(e.target.value)} value={editText}></textarea>
                                                <label htmlFor="floatingTextarea2">Edit message</label>
                                            </div>

                                            <button className="text-white btn-send py-1 px-4" style={{height: "40px"}} onClick={() => handleEdit(commentIdToEdit)}>UPDATE</button>
                                        </div>
                                        :
                                        <p className="text-start">{el.content}</p>
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Replies */}
                            <div className="d-flex align-items-end flex-column div-replies position-relative">
                                {el.replies.map((reply, indexReply) => (
                                    <div className="d-flex bg-white rounded-3 p-4 mb-3 align-items-center" key={indexReply} style={{width: "85%"}}>
                                        <div className="rounded-2 comment-side-div px-2 me-4 d-flex flex-column gap-2">
                                            <button className="btn-vote p-0"><img src="./images/icon-plus.svg"></img></button>
                                            <h2 className="fs-5 m-0">{reply.score}</h2>
                                            <button className="btn-vote p-0"><img src="./images/icon-minus.svg"></img></button>
                                        </div>

                                        <div className="w-100">
                                            <div className="d-flex justify-content-between pb-2">
                                                <div className="d-flex align-items-center gap-2">
                                                    <img src={reply.user.image.png} width={30} alt={reply.user.username} title={reply.user.username}></img>
                                                    <h2 className="m-0 fs-6">{reply.user.username}</h2>
                                                    {dataUser.username === reply.user.username ? <p className="m-0 p-you">you</p> : null}
                                                    <p className="m-0 p-date">{reply.createdAt}</p>
                                                </div>
                                                
                                                {dataUser.username === reply.user.username ? 
                                                <div className="d-flex">
                                                    <button className="d-flex align-items-center gap-2 btn-delete">
                                                        <img src="./images/icon-delete.svg" width={15} height={15} alt="delete"></img>
                                                        <p className="m-0 p-delete fw-bold" onClick={() => {setDeleteBtnClicked(true); setCommentIdToDelete(reply.id)}}>Delete</p>
                                                    </button>
                                                    <button className="d-flex align-items-center gap-2 btn-reply">
                                                        <img src="./images/icon-edit.svg" width={15} height={15} alt="edit"></img>
                                                        <p className="m-0 p-reply fw-bold" onClick={() => {setEditBtnClicked(true); setEditText(reply.content); setCommentIdToEdit(reply.id)}}>Edit</p>
                                                    </button>
                                                </div> 
                                                :
                                                <button className="d-flex align-items-center gap-2 btn-reply">
                                                    <img src="./images/icon-reply.svg" width={15} height={15} alt="reply"></img>
                                                    <p className="m-0 p-reply fw-bold" onClick={handleReply}>Reply</p>
                                                </button>
                                                }
                                            </div>

                                            <div className="w-100">
                                                {editBtnClicked === true && reply.id === commentIdToEdit ? 
                                                <div className="d-flex gap-3">
                                                    <div className="form-floating rounded-2 w-100">
                                                        <textarea className="form-control" placeholder="Add a comment..." id="floatingTextarea2" style={{height: "70px"}} onChange={(e) => setEditText(e.target.value)} value={editText}></textarea>
                                                        <label htmlFor="floatingTextarea2">Edit message</label>
                                                    </div>

                                                    <button className="text-white btn-send py-1 px-4" style={{height: "40px"}} onClick={() => handleEdit(commentIdToEdit)}>UPDATE</button>
                                                </div>
                                                :
                                                <p className="text-start">{reply.content}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ))
                }
            </div>
        </>
    )
}

export default CommentSection