import { useEffect, useState } from "react"
import './App.css'
import CommentSection from './Components/CommentsSection'
import AddComment from './Components/AddComment'

function App() {
  const [dataCommentsJson, setCommentsDataJson] = useState<any[]>([]);
  const [dataUserJson, setUserDataJson] = useState<any>({});

  useEffect(() => {
      fetch("./data.json").then(response => response.json()).then(data => {setCommentsDataJson(data.comments); setUserDataJson(data.currentUser)})
  }, [])

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9">
            <CommentSection dataComments={dataCommentsJson} dataUser={dataUserJson} commentsDataJson={dataCommentsJson} setCommentsDataJson={setCommentsDataJson}></CommentSection>
            <AddComment dataJson={dataUserJson} commentsDataJson={dataCommentsJson} setCommentsDataJson={setCommentsDataJson}></AddComment>
        </div>
      </div>
    </div>
  )
}

export default App
