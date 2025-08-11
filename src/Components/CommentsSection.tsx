import type { Comment, User } from "./interfaces.tsx"

interface Props {
    dataComments: Comment[];
    dataUser: User;
    setCommentsDataJson:React.Dispatch<React.SetStateAction<Comment[]>>;
}

function CommentSection({dataComments, dataUser, setCommentsDataJson}:Props) {
    function handleDelete(id: number) {
    setCommentsDataJson(prevData => 
        prevData
            .filter(comment => comment.id !== id)
            .map(comment => ({
                ...comment,
                replies: comment.replies.filter(reply => reply.id !== id)
            }))
        );
    }


    function handleEdit() {

    }

    function handleReply() {

    }

    return (
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
                                                <p className="m-0 p-delete fw-bold" onClick={() => handleDelete(el.id)}>Delete</p>
                                            </button>
                                            <button className="d-flex align-items-center gap-2 btn-reply">
                                                <img src="./images/icon-edit.svg" width={15} height={15} alt="edit"></img>
                                                <p className="m-0 p-reply fw-bold" onClick={handleEdit}>Edit</p>
                                            </button>
                                        </div> 
                                        :
                                        <button className="d-flex align-items-center gap-2 btn-reply">
                                            <img src="./images/icon-reply.svg" width={15} height={15} alt="reply"></img>
                                            <p className="m-0 p-reply fw-bold" onClick={handleReply}>Reply</p>
                                        </button>
                                    }
                                </div>

                                <div>
                                    <p className="text-start">{el.content}</p>
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

                                    <div>
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
                                                    <p className="m-0 p-delete fw-bold" onClick={() => handleDelete(reply.id)}>Delete</p>
                                                </button>
                                                <button className="d-flex align-items-center gap-2 btn-reply">
                                                    <img src="./images/icon-edit.svg" width={15} height={15} alt="edit"></img>
                                                    <p className="m-0 p-reply fw-bold" onClick={handleEdit}>Edit</p>
                                                </button>
                                            </div> 
                                            :
                                            <button className="d-flex align-items-center gap-2 btn-reply">
                                                <img src="./images/icon-reply.svg" width={15} height={15} alt="reply"></img>
                                                <p className="m-0 p-reply fw-bold" onClick={handleReply}>Reply</p>
                                            </button>
                                            }
                                        </div>

                                        <div>
                                            <p className="text-start">{reply.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ))
            }
        </div>
    )
}

export default CommentSection