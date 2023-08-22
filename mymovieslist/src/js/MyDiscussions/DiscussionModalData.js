import DeleteMyDiscussions from "./DeleteMyDiscussion";
import { format } from 'date-fns'

export default function DiscussionModalData({ discussion, setIsOpen }) {
    const handleSubmit = async e => {
        e.preventDefault();
        const Id = discussion.id
        DeleteMyDiscussions({ Id }).then(() => {
            setIsOpen(false);
            window.location.reload();
        });


    }

    return (<>
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-2 mt-2">
                <h5>Title: {discussion.title}</h5>
            </div>
            <div className="form-group mb-2 mt-2">
                <h6>Time added: {format(new Date(discussion.timePosted), 'dd/MM/yyyy HH:mm:ss')}</h6>
            </div>
            <div className="form-group mb-2">
                <p>Discussion: {discussion.discussion}</p>
            </div>
            <button className="btn btn-outline-danger">Delete</button>
        </form>

    </>)

}