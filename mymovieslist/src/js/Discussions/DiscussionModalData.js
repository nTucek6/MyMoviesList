import { useState } from "react";
import AddDiscussion from "./AddDiscussion";
import { useNavigate } from 'react-router-dom'

export default function DiscussionModalData({ setIsOpen }) {
    const [discussionTitle, setDiscussionTitle] = useState(null);
    const [discussion, setDiscussion] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        AddDiscussion({
            discussionTitle,
            discussion,

        }).then(() => {
            setIsOpen(false);
            navigate(0);

        });
    }

    return (<>
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
                <input type="text" placeholder="Discussion title" className="form-control" onChange={d => setDiscussionTitle(d.target.value)} required />
            </div>
            <div className="form-group mb-2">
                <textarea type="text" className="form-control" placeholder="Discussion" onChange={d => setDiscussion(d.target.value)} required >
                </textarea>
            </div>
            <hr />
            <div className="mt-2 d-flex flex-row-reverse">
                <button type="submit" className="btn btn-outline-danger mt-3 p-2">Add discussion</button>
                <button className="btn btn-outline-danger mt-3 p-2" onClick={() => setIsOpen(false)}>Close</button>
            </div>

        </form>

    </>);


}