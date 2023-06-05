import { useState } from "react";
import UpdateReview from "./UpdateReview";

export default function ReviewModalData({setIsOpen,userId,movieId})
{
    const[Review,setReview] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
       UpdateReview({userId,movieId,Review}).then(response=>{
        setIsOpen(false);
       });
    }

    return (<>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
        <textarea rows="10" style={{height:"100%"}} className="form-control" onChange={r=> setReview(r.target.value)} required></textarea>
        </div>
        <hr />
        <div className="mt-2 d-flex flex-row-reverse">
        <button type="submit" className="btn btn-success mt-3 p-2">Save</button>
                <button className="btn btn-outline-danger mt-3 p-2" onClick={() => setIsOpen(false)}>Close</button>
            </div>
    </form>
    </>);
}