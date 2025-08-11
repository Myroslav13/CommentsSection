import type { User } from "./interfaces.tsx"

interface Props {
    dataJson: User,
}

function AddComment({dataJson}:Props) {

    return (
        <div className="d-flex justify-content-between bg-white rounded-3 p-4 w-100 gap-3" style={{height: "120px"}}>
            <div className="d-flex gap-3 w-100">
                <img src={dataJson.image.png} alt={dataJson.username} title={dataJson.username} width={30} height={30}></img>

                <div className="form-floating rounded-2 w-100">
                    <textarea className="form-control" placeholder="Add a comment..." id="floatingTextarea2" style={{height: "70px"}}></textarea>
                    <label htmlFor="floatingTextarea2">Add a comment...</label>
                </div>
            </div>

            <button className="text-white btn-send py-1 px-4" style={{height: "40px"}}>SEND</button>
        </div>
    )
}

export default AddComment