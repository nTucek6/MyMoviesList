import { useEffect } from "react";
import { useState, useRef } from "react";
import { ThreeDots } from 'react-loader-spinner';
import { format } from 'date-fns'
import GetUserIssues from "../../js/Issues/GetUserIssues";
import GetUserIssuesCount from "../../js/Issues/GetUserIssuesCount";
import ShowModal from "../../js/modal/modal";
import IssueModalData from "../../js/Issues/IssueModalData";
import customStyles from "./../../js/MovieInfo/customStyles";

export default function Issues() {
    const postPerPage = 10;
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);

    const [Issues, setIssues] = useState([]);
    const [Issue, setIssue] = useState(null);
    const [IssuesCount, setIssuesCount] = useState(null)

    const shouldLoadData = useRef(true);
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            GetUserIssuesCount({ setIssuesCount });
            GetUserIssues({ Issues, setIssues, setIsCompleted, postPerPage, page, search });
        }
        else if (page > 1) {
            GetUserIssues({ Issues, setIssues, setIsCompleted, postPerPage, page, search });
        }
        else if (search !== null) {
            setTimeout(() => {
                GetUserIssues({ Issues, setIssues, setIsCompleted, postPerPage, page, search });
            }, 400);

        }
    }, [page, search])

    const LoadMore = () => {
        setIsCompleted(false);
        setPage(page + 1);
    }

    const LoadMoreButton = () => {
        if (IssuesCount === Issues.length) {
            return (<button type="button" className="btn btn-danger" disabled> Load More</button>)
        }
        else {
            return (<button onClick={LoadMore} type="button" className="btn btn-danger">Load More</button>)
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(issue) {
        setIssue(issue);
        setIsOpen(true);
    }

    return (<>
        <div className="container">
            <div className="table-responsive">
                <table className="table table-bordered table-hover table-condensed table-striped">
                    <thead>
                        <tr>
                            <th>Rbr.</th>
                            <th>Email</th>
                            <th>Issue type or suggestions</th>
                            <th>Time Added</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Issues.map((issue, index) => {
                            return (
                                <tr key={issue.id} onClick={() =>  openModal(issue)}  style={{ cursor: "pointer" }} >
                                    <td>{index + 1}</td>
                                    <td>{issue.email}</td>
                                    <td>{issue.issueType}</td>
                                    <td>{format(new Date(issue.timeAdded), 'dd.MM.yyyy HH:mm:ss')}</td>
                                    <td>{issue.isResolved === false ? "Unresolved" : "Resolved"}</td>
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
        <ShowModal modalIsOpen={modalIsOpen} closeModal={closeModal} customStyles={customStyles} ModalData={() => IssueModalData({ Issue,setIsOpen })} text={"Issue or recommendation"} />
    </>);
}