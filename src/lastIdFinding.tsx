export function lastIdFinding(prevData: any[]){
    let lastId = prevData.length > 0 ? prevData[prevData.length - 1].id : 0

    const allReplies = prevData.flatMap(comment => comment.replies);

    const maxReplyId = allReplies.length > 0
    ? Math.max(...allReplies.map(r => r.id))
    : 0;

    if (maxReplyId > lastId) {
        lastId = maxReplyId
    }

    return lastId
}