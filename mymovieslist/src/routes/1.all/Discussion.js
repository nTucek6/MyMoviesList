import { useParams } from "react-router-dom";
import { format } from 'date-fns'
import { useEffect, useState } from "react";
import GetDiscussionComments from "../../js/Discussions/GetDiscussionsComments";
import WriteComment from "../../js/Discussions/WriteComment";
import jwt_decode from "jwt-decode";
import getToken from "../../js/token/gettoken";
import GetDiscussion from "../../js/Discussions/GetDiscussion";
import DeleteComment from "../../js/Discussions/DeleteComment";
import ShowModal from "../../js/modal/modal";
import customStyles from "../../js/MovieInfo/customStyles";
import UpdateCommentModalData from "../../js/Discussions/UpdateCommentModalData";
import GetCommentsCount from "../../js/Discussions/GetCommentsCount";

import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from 'react-loader-spinner';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRef } from "react";

export default function Discussion() {

    const [Discusion, setDiscusion] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);

    const { id } = useParams();
    const discussionId = id;

    const token = getToken();
    let userId = null;
    let Role = "User";
    let username = null;
    if (token !== null) {
        userId = jwt_decode(token).Id;
        Role = jwt_decode(token).Role;
        username = jwt_decode(token).Username;
    }

    const [toggleComments, setToggleComments] = useState(true);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(null);
    const [commentCount, setCommentCount] = useState(0);
    const [oldComment, setOldComment] = useState(null);
    const PostPerPage = 30;
    const [Page, setPage] = useState(1);
    const [HasMoreData, setHasMoreData] = useState(false);

    const shouldLoadData = useRef(true);


    useEffect(() => {

        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            GetDiscussion({ setDiscusion, discussionId });
            GetDiscussionComments({ setComments, discussionId, PostPerPage, Page });
            GetCommentsCount({ setCommentCount, discussionId });
            setPage(Page + 1);
        }


    }, []);

    useEffect(() => {
        if (commentCount !== comments.length) {
            setHasMoreData(true);
        }
        else {
            setHasMoreData(false);
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comments,commentCount]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (comment.trim() !== "") {
            WriteComment({ comment, discussionId, userId }).
                then(function (response) {
                    window.location.reload();
                });
        }

    }

    if (Discusion === null) return;

    sessionStorage.setItem("user", Discusion.user.username);

    const handleDelete = Id => {
        DeleteComment({ Id }).then(() => {
            //GetDiscussionComments({ setComments, discussionId, PostPerPage, Page });
            window.location.reload();
        });
    }


    function ActionButton({ comment, isUser }) {

        const Id = comment.id;

        return (
            <>
                <div className="col-3"></div>
                <div className="col-2">
                    <Navbar className="p-0" >
                        <Navbar.Toggle />
                        <Navbar.Collapse  >
                            <Nav >
                                <NavDropdown title="Action" className="text-center">
                                    {
                                        isUser || username === comment.username ?
                                            <NavDropdown.Item className="" onClick={() => openModal(comment)}>Edit</NavDropdown.Item> : null
                                    }
                                    <NavDropdown.Item onClick={() => handleDelete(Id)} className="">Delete</NavDropdown.Item>
                                </NavDropdown>
                            </Nav >
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </>
        )
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(comment) {
        setOldComment(comment)
        setIsOpen(true);
    }

    const fetchMoreData = () => {

        setPage(Page + 1);
        setTimeout(() => {

         GetDiscussionComments({ setComments, discussionId, PostPerPage, Page });    

        }, 1000);
    }

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
                                <textarea rows={4} className="form-control mb-2" placeholder="Write a comment..." onChange={d => setComment(d.target.value)} required></textarea>
                                <button type="submit" className="btn btn-secondary float-end">Comment</button>
                            </form>
                    }
                    <br className="mb-4" />

                    <hr />
                    <div className="row">
                        <p className="col">{commentCount} comments</p>
                        <div className="col">
                            {toggleComments ?
                                <button className="btn float-end" onClick={() => setToggleComments(false)}>Hide comments</button> :
                                <button className="btn float-end" onClick={() => setToggleComments(true)}>Show comments</button>
                            }
                        </div>
                    </div>
                    <InfiniteScroll
                        dataLength={comments.length}
                        next={fetchMoreData}
                        hasMore={HasMoreData}
                        className="mb-5"
                        loader={
                            <div className="d-flex justify-content-center">
                                <ThreeDots
                                    height="80"
                                    width="80"
                                    radius="9"
                                    color="#4fa94d"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    visible={true}
                                />
                            </div>

                        }
                        style={{
                            overflowX: "hidden",
                            overflowY: "visible"
                        }}>
                        {
                            toggleComments ?
                                comments.map(c => {
                                    return (
                                        <div key={c.id}>
                                            <div className="row ">
                                                <div className="col-7">
                                                    <h6 className="d-inline">User: {c.username}, </h6>
                                                    <small className="d-inline">Time created: {format(new Date(c.timePosted), 'dd.MM.yyyy HH:mm:ss')}</small>
                                                    {c.timeUpdated !== null ? <small className="d-inline">, Time updated: {format(new Date(c.timeUpdated), 'dd.MM.yyyy HH:mm:ss')}</small> : <small className="d-inline"></small>}
                                                </div>

                                                {
                                                    Role === "Admin" ?
                                                        <ActionButton comment={c} isUser={false} />
                                                        :
                                                        c.username === username ?
                                                            <ActionButton comment={c} isUser={true} />
                                                            :
                                                            null
                                                }

                                            </div>
                                            <p>Comment: {c.comment}</p>
                                            <hr></hr>
                                        </div>
                                    )
                                })
                                :
                                null
                        }
                    </InfiniteScroll>
                </div>
            </div>

            <ShowModal modalIsOpen={modalIsOpen} closeModal={closeModal} customStyles={customStyles} ModalData={() => UpdateCommentModalData({ oldComment, setIsOpen })} text={"Update comment"} />
        </>
    );

}