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
      <div className='w-75'>
        <CommentSection dataJson={dataCommentsJson}></CommentSection>
        <AddComment dataJson={dataUserJson}></AddComment>
      </div>
    </div>
  )
}

export default App
