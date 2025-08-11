import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CommentSection from './Components/CommentsSection'
import AddComment from './Components/AddComment'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CommentSection></CommentSection>
      <AddComment></AddComment>
    </>
  )
}

export default App
