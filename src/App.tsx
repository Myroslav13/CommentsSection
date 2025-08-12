import { useEffect, useState } from "react";
import './App.css';
import CommentSection from './Components/CommentsSection';
import AddComment from './Components/AddComment';

function App() {
  const [dataCommentsJson, setCommentsDataJson] = useState<any[]>([]);
  const [dataUserJson, setUserDataJson] = useState<any>({});

  useEffect(() => {
    let commentsFromStorage: any[] = [];
    let userFromStorage: any = null;

    const commentsLS = localStorage.getItem("comments");
    const userLS = localStorage.getItem("user");

    if (commentsLS) commentsFromStorage = JSON.parse(commentsLS);
    if (userLS) userFromStorage = JSON.parse(userLS);

    if (commentsFromStorage.length && userFromStorage) {
      setCommentsDataJson(commentsFromStorage);
      setUserDataJson(userFromStorage);
    } else {
      fetch("./data.json")
        .then(response => response.json())
        .then(data => {
          setCommentsDataJson(data.comments);
          setUserDataJson(data.currentUser);

          localStorage.setItem("comments", JSON.stringify(data.comments));
          localStorage.setItem("user", JSON.stringify(data.currentUser));
        });
    }
  }, []);

  useEffect(() => {
    if (dataCommentsJson.length > 0) {
      localStorage.setItem("comments", JSON.stringify(dataCommentsJson));
    }
  }, [dataCommentsJson]);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9">
          <CommentSection dataComments={dataCommentsJson} dataUser={dataUserJson} commentsDataJson={dataCommentsJson} setCommentsDataJson={setCommentsDataJson} />
          <AddComment dataJson={dataUserJson} commentsDataJson={dataCommentsJson} setCommentsDataJson={setCommentsDataJson} />
        </div>
      </div>
    </div>
  );
}

export default App;
