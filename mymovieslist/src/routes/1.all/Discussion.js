import { useLocation, useParams } from "react-router-dom";
import { format } from 'date-fns'
import { useEffect, useState } from "react";
import GetDiscussionComments from "../../js/Discussions/GetDiscussionsComments";
import WriteComment from "../../js/Discussions/WriteComment";
import jwt_decode from "jwt-decode";
import getToken from "../../js/token/gettoken";
import GetDiscussion from "../../js/Discussions/GetDiscussion";

export default function Discussion() {

    const [Discusion, setDiscusion] = useState(null);

    const {id} = useParams();
    const discussionId = id;
   
    const token = getToken();
    let userId = null;
    if (token !== null) {
        userId = jwt_decode(token).Id;
    }

    const [toggleComments, setToggleComments] = useState(true);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(null);
    const PostPerPage = 10;
    const [Page, setPage] = useState(1);


    useEffect(() => {
        GetDiscussion({setDiscusion,discussionId});
        GetDiscussionComments({ setComments, discussionId, PostPerPage, Page });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        WriteComment({ comment, discussionId, userId });
    }

    if(Discusion === null)return;

    sessionStorage.setItem("user",Discusion.user.username);

    return (
        <>
            <div className="container">
                <h6>Time created: {format(new Date(Discusion.timePosted), 'dd.MM.yyyy HH:mm:ss')}</h6>
                <hr />
                <h5 className="mb-3">Discussion title: {Discusion.title}</h5>
                <p>{Discusion.discussion}</p>

                <h6 className="mt-5">Join the Discussion!</h6>
                <hr />
                <div>
                    {
                        token === null ?
                            <p>Login to comment</p> :
                            <form onSubmit={handleSubmit}>
                                <textarea rows={4} className="form-control mb-2" placeholder="Write a comment..." onChange={d => setComment(d.target.value)}></textarea>
                                <button type="submit" className="btn btn-secondary float-end">Comment</button>
                            </form>
                    }
                    <br className="mb-4" />

                    <hr />
                    <div className="row">
                        <p className="col">{comments.length} comments</p>
                        <div className="col">
                            {toggleComments ?
                                <button className="btn float-end" onClick={() => setToggleComments(false)}>Hide comments</button> :
                                <button className="btn float-end" onClick={() => setToggleComments(true)}>Show comments</button>
                            }
                        </div>
                    </div>

                    {
                        toggleComments ?
                            comments.map(c => {
                                return (
                                    <div key={c.id}>
                                        <h6>User: {c.username}</h6>
                                        <p>Comment: {c.comment}</p>
                                    </div>
                                )
                            })
                            :
                            null
                    }
                </div>
            </div>
        </>
    );

}