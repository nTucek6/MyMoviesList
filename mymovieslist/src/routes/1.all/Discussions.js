import GetDiscussions from "../../js/Discussions/GetDiscussions";
import GetDiscussionsCount from "../../js/Discussions/GetDiscussionsCount";
import ShowModal from '../../js/modal/modal';
import customStyles from "../../js/MovieInfo/customStyles";
import DiscussionModalData from "../../js/Discussions/DiscussionModalData";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns'
import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from 'react-loader-spinner';
import getToken from "../../js/token/gettoken";

export default function Discussions() {

    const [modalIsOpen, setIsOpen] = useState(false);

    const [Discussions, setDiscussions] = useState([]);
    const [DiscussionCount, setDiscussionsCount] = useState(0);
    const [HasMoreData, setHasMoreData] = useState(false);
    const navigate = useNavigate();
    const PostPerPage = 30;
    const [page, setPage] = useState(1);

    const token = getToken();

    const shouldLoadData = useRef(true);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            GetDiscussionsCount({ setDiscussionsCount });
            GetDiscussions({ setDiscussions, page, PostPerPage });
            setPage(page + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (DiscussionCount !== Discussions.length) {
            setHasMoreData(true);
        }
        else {
            setHasMoreData(false);
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Discussions,DiscussionCount]);


    const fetchMoreData = () => {

        setPage(page + 1);
        setTimeout(() => {
        GetDiscussions({ setDiscussions, page, PostPerPage });

        }, 1000);
    }

    const toDiscussion = (link, data) => {
        sessionStorage.setItem('user', data.user.username)
        navigate(link, { state: data });
    }

    return (
        <>
            <div className="container">
                <div className="text-center">
                    {
                        token === null ?
                        <button className="btn btn-info" disabled>Login to add discussion!</button>:
                        <button className="btn btn-info" onClick={openModal}>Add discussion</button>

                    }
                </div>
                <hr />
                <InfiniteScroll
                    dataLength={Discussions.length}
                    next={fetchMoreData}
                    hasMore={HasMoreData}
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
                        overflow: 'hidden',
                    }}
                >
                    <div className="row row-cols-3 text-center mt-5">
                        {Discussions.map(discussion => {
                            return (
                                <div className="col mb-3" key={discussion.id}>
                                    <div style={{ cursor: "pointer" }} onClick={() => toDiscussion('discussion/' + discussion.id + '/' + discussion.title, discussion)}>
                                        <h5>{discussion.title}</h5>
                                        <h6>User: {discussion.user.username}, posted: {format(new Date(discussion.timePosted), 'dd.MM.yyyy HH:mm:ss')}</h6>
                                        <small>Comments: {discussion.commentsCount}</small>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </InfiniteScroll>
            </div>

            <ShowModal modalIsOpen={modalIsOpen} closeModal={closeModal} customStyles={customStyles} ModalData={() => DiscussionModalData({ setIsOpen })} text={"Create discussion"} />
        </>
    );
}