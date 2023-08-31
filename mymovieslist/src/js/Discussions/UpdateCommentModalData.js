import { useState } from "react";
import UpdateComment from "./UpdateComment";

export default function UpdateCommentModalData({oldComment,setIsOpen})
{
    const [comment, setComment] = useState(null);
    const Id = oldComment.id;
    const value = oldComment.comment;

    const handleSubmit = (e) => {
        e.preventDefault();
        UpdateComment({
            Id,
            comment,

        }).then(() => {
            setIsOpen(false);
            window.location.reload();
        });
    }

    return(
        <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
            <textarea type="text" className="form-control" defaultValue={value} placeholder="Comment..." onChange={d => setComment(d.target.value)} required >
            </textarea>
        </div>
        <hr />
        <div className="mt-2 d-flex flex-row-reverse">
            <button type="submit" className="col btn btn-outline-info mt-3 p-2">Update comment</button>
            <button className="col btn btn-outline-danger mt-3 p-2" onClick={() => setIsOpen(false)}>Close</button>
        </div>

    </form>

    )



}