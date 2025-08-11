import type { Comment } from "./interfaces.tsx"

interface Props {
  dataJson: Comment[];
}

function CommentSection({dataJson}:Props) {
    return (
        <div className='d-flex align-items-center flex-column'>
            {
                dataJson.map((el, index) => (
                    <>
                        {/* Comment */}
                        <div className="d-flex bg-white rounded-3 p-4 mb-3 w-100 align-items-center" key={index}>
                            <div className="rounded-2 comment-side-div px-2 me-4 d-flex flex-column gap-2">
                                <button className="btn-vote p-0"><img src="./images/icon-plus.svg"></img></button>
                                <h2 className="fs-5 m-0">{el.score}</h2>
                                <button className="btn-vote p-0"><img src="./images/icon-minus.svg"></img></button>
                            </div>

                            <div>
                                <div className="d-flex justify-content-between pb-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <img src={el.user.image.png} width={30} alt={el.user.username} title={el.user.username}></img>
                                        <h2 className="m-0 fs-6">{el.user.username}</h2>
                                        <p className="m-0 p-date">{el.createdAt}</p>
                                    </div>

                                    <button className="d-flex align-items-center gap-2 btn-reply">
                                        <img src="./images/icon-reply.svg" width={15} height={15} alt="reply"></img>
                                        <p className="m-0 p-reply fw-bold">Reply</p>
                                    </button>
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
                                                <p className="m-0 p-date">{reply.createdAt}</p>
                                            </div>

                                            <button className="d-flex align-items-center gap-2 btn-reply">
                                                <img src="./images/icon-reply.svg" width={15} height={15} alt="reply"></img>
                                                <p className="m-0 p-reply fw-bold">Reply</p>
                                            </button>
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