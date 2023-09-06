import { useEffect, useState } from "react";
import getToken from "../../js/token/gettoken";
import jwt_decode from "jwt-decode";
import { format } from 'date-fns'
import { ThreeDots } from 'react-loader-spinner';
import { useRef } from "react";

import GetMyDiscussionsCount from "../../js/MyDiscussions/GetMyDiscussionsCount";
import GetMyDiscussions from "../../js/MyDiscussions/GetMyDiscussions";
import ShowModal from "../../js/modal/modal";
import customStyles from "./../../js/MovieInfo/customStyles";
import DiscussionModalData from "../../js/MyDiscussions/DiscussionModalData";


export default function MyDiscussions() {
    const token = getToken();
    const UserId = jwt_decode(token).Id;
    const [MyDiscussions, setMyDiscusions] = useState([]);
    const [MyDiscussionsCount, setMyDiscusionsCount] = useState([]);
    const [discussion, setDiscussion] = useState(null);

    const postPerPage = 10;
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    const shouldLoadData = useRef(true);

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            GetMyDiscussionsCount({ setMyDiscusionsCount, UserId });
            GetMyDiscussions({ MyDiscussions, setMyDiscusions, setIsCompleted, UserId, postPerPage, page, search });
        }
        else if (page > 1) {
            GetMyDiscussions({ MyDiscussions, setMyDiscusions, setIsCompleted, UserId, postPerPage, page, search });
        }
        else if (search !== null) {
            setTimeout(() => {
                GetMyDiscussions({ MyDiscussions, setMyDiscusions, setIsCompleted, UserId, postPerPage, page, search });
            }, 400);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search])



    const LoadMore = () => {
        setIsCompleted(false);
        setPage(page + 1);
    }

    const LoadMoreButton = () => {
        if (MyDiscussionsCount === MyDiscussions.length) {
            return <button type="button" className="btn btn-danger" disabled>Load More</button>;
        }
        else {
            return <button onClick={LoadMore} type="button" className="btn btn-danger" >Load More</button>;
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(p) {
        setDiscussion(p);
        setIsOpen(true);
    }

    const Search = (data) => {
        setMyDiscusions([]);
        setSearch(data);
        setPage(1);
    }


    return (
        <>
            <div className="container">
                <div className="row" >
                    <div className="form-group col-xs-3 col-md-3">
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="form-group col-xs-3 col-md-4">
                        <input type="search" className="form-control mb-2" placeholder="Search discussion..." onChange={s => Search(s.target.value)} />
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-condensed table-striped">
                        <thead>
                            <tr>
                                <th>Rbr.</th>
                                <th>Discussion</th>
                                <th>Time added</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MyDiscussions.map((p, index) => {
                                return (
                                    <tr key={p.id} style={{ cursor: "pointer" }} onClick={() => openModal(p)}>
                                        <td>{index + 1}</td>
                                        <td>{p.title}</td>
                                        <td>{format(new Date(p.timePosted), 'dd/MM/yyyy HH:mm:ss')}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center">
                    {isCompleted ? (
                        <LoadMoreButton />
                    ) : (
                        <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="#4fa94d"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    )}
                </div>
            </div>
            <ShowModal modalIsOpen={modalIsOpen} closeModal={closeModal} customStyles={customStyles} ModalData={() => DiscussionModalData({ discussion, setIsOpen })} text={"Disucssion"} />
        </>
    );
}