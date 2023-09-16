import { useEffect, useState } from "react";
import UpdateReview from "./UpdateReview";
import GetModalReview from "./GetModalReview";

export default function ReviewModalData({setIsOpen,userId,movieId})
{
    const[Review,setReview] = useState("");
    const[OldReview,setOldReview] = useState("");

    useEffect(()=>{
        GetModalReview({setOldReview,movieId,userId})

    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
       UpdateReview({userId,movieId,Review}).then(response=>{
        setIsOpen(false);
        window.location.reload();
       });
    }

    return (<>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
        <textarea rows="10" style={{height:"100%"}} className="form-control" defaultValue={OldReview.reviewText} onChange={r=> setReview(r.target.value)} required></textarea>
        </div>
        <hr />
        <div className="mt-2 d-flex flex-row-reverse">
        <button type="submit" className="col btn btn-outline-info mt-3 p-2">Save</button>
            <button className="col btn btn-outline-danger mt-3 p-2" onClick={() => setIsOpen(false)}>Close</button>
            </div>
    </form>
    </>);
}