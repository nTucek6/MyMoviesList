import { useNavigate, useParams } from "react-router-dom";
import GetMovieInfo from "../../js/MovieInfo/GetMovieInfo";
import { useRef, useEffect, useState } from "react";
import Select from 'react-select'
import { Link } from "react-router-dom";
import GetStatus from "../../js/MovieInfo/GetStatus";
import jwt_decode from "jwt-decode";
import getToken from "../../js/token/gettoken";
import GetWatchStatus from '../../js/MovieInfo/GetWatchStatus';
import UpdateMovieUserList from "../../js/MovieInfo/UpdateMovieUserList";
import GetUserScore from "../../js/MovieInfo/GetUserScore";
import GetMovieActors from "../../js/MovieInfo/GetMovieActors";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewModalData from "../../js/MovieInfo/ReviewModalData";
import ShowModal from "../../js/modal/modal";
import GetReview from "../../js/MovieInfo/GetReview";
import { format } from 'date-fns'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        height: "70%",
        overflowy: "auto",
    }
}

export default function MovieInfo() {

    const { id } = useParams();

    const movieId = id;

    const shouldLoadData = useRef(true);

    const navigate = useNavigate();

    const token = getToken();

    let userId = token !== null ? jwt_decode(token).Id : 0;

    const [modalIsOpen, setIsOpen] = useState(false);

    const [movie, setMovie] = useState(null);
    const [movieActors, setMovieActors] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [watchStatus, setWatchStatus] = useState(null);
    const [score, setScore] = useState(0);
    const [RecentReviews, setRecentReviews] = useState(null);

    const postperpage = 4;

    const [page, setPage] = useState(1);

    const [isNotAdded, setIsNotAdded] = useState(true);

    const imageStyle =
    {
        width: '200px',
        height: '300px'
    };

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;

        }
        GetMovieInfo({ setMovie, movieId });
        GetMovieActors({ setMovieActors, movieId, page, postperpage });
        GetReview({ setRecentReviews, movieId });
        if (token !== null) {
            GetStatus({ setStatusList });
            GetWatchStatus({ setWatchStatus, setIsNotAdded, userId, movieId });
            GetUserScore({ setScore, userId, movieId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieId]);


    if (movie === null)
        return null;

    const GetAddButton = () => {
        if (token === null) {
            return (<button className="btn btn-info" disabled>Add to List</button>);
        }
        else {
            return (<button className="btn btn-info" onClick={() => AddMovieToList({ userId, movieId })}>Add to List</button>);
        }
    }

    const GetReviewButton = () => {
        if (token === null) {
            return (<button className="btn btn-outline-info" disabled>Leave a review</button>);
        }
        else {
            return (<button className="btn btn-outline-info" onClick={openModal} >Leave a review</button>);
        }
    }

    const GetStatusSelect = () => {

        return (<Select
            name="watchstatus"
            options={statusList}
            defaultValue={watchStatus}
            onChange={s => UpdateUserListStatus(s.value)}
        />)
    }

    const GetMovieScore = () => {
        return (
            <Select
                name="score"
                placeholder="Select score"
                options={
                    [
                        { value: 5, label: 5 },
                        { value: 4, label: 4 },
                        { value: 3, label: 3 },
                        { value: 2, label: 2 },
                        { value: 1, label: 1 }
                    ]
                }
                defaultValue={score !== 0 ? { value: score, label: score } : null}
                isDisabled={isNotAdded}
                onChange={s => UpdateUserListScore(s.value)}
            />
        )
    }

    const AddMovieToList = () => {

        UpdateMovieUserList({ userId, movieId }).then(() => {
            GetWatchStatus({ setWatchStatus, setIsNotAdded, userId, movieId });
            toast("Successfuly addded to list!");

        });
    }

    const UpdateUserListStatus = (statusId) => {

        UpdateMovieUserList({ userId, movieId, score, statusId });
        toast("Successfuly updated list!");
    }

    const UpdateUserListScore = (score) => {
        UpdateMovieUserList({ userId, movieId, score });
        toast("Successfuly updated score!");
    }

    function WritePerson({ array }) {
        let data = array.map((d, index) => {
            if (array.length == index + 1) {
                return <p key={d.id} className="d-inline" style={{ cursor: "pointer" }} onClick={() => navigate("/person/" + d.id + "/" + d.firstName + " " + d.lastName, d)}>{d.firstName + " " + d.lastName}</p>;
            }
            else {
                return <p key={d.id} className="d-inline" style={{ cursor: "pointer" }} onClick={() => navigate("/person/" + d.id + "/" + d.firstName + " " + d.lastName, d)}>{d.firstName + " " + d.lastName}, </p>;
            }
        })
        return data;
    }

    function WriteGenres({ array }) {
        let data = array.map((d, index) => {
            if (array.length == index + 1) {
                return <p key={d.value} className="d-inline" style={{ cursor: "pointer" }} onClick={() => navigate('/moviessearch/genre/' + d.value + '/' + d.label)}>{d.label}</p>;

            }
            else {
                return <p key={d.value} className="d-inline" style={{ cursor: "pointer" }} onClick={() => navigate('/moviessearch/genre/' + d.value + '/' + d.label)}>{d.label}, </p>;
            }

        })
        return data;
    }

    const GetRecentComments = () => {
        if (RecentReviews !== null && RecentReviews !== "") {
            return (RecentReviews.map((review, index) =>
            (
                <div key={index}>
                    <h6>User: {review.userName}, Time created: {format(new Date(review.timeCreated), 'dd.MM.yyyy HH:mm:ss')}</h6>
                    <p>{review.reviewText}</p>
                    <hr />
                </div>
            )
            ));
        }
    }

    return (
        <div className="container">
            <div className="row container m-0 p-0">
                <div className="col-md-3 border border-start-0 border-top-0 border-bottom-0 ">
                    <div>
                        <img style={imageStyle} src={"data:image/png;base64," + movie.movieImageData} />
                    </div>

                    <div className="mt-2">
                        <small>Director: <WritePerson array={movie.director} /></small>
                    </div>

                    <div className="mt-2">
                        <small>Writers: <WritePerson array={movie.writers} /></small>
                    </div>

                    <div className="mt-2">
                        <small>Duration: {Math.floor(movie.duration / 60)}h {(movie.duration % 60) !== 0 ? (movie.duration % 60) + "m" : ""}</small>
                    </div>

                    <div className="mt-2">
                        <small>Genres: <WriteGenres array={movie.genres} /></small>
                    </div>

                </div>

                <div className="col-md-9 ">
                    <div className="row border border-start-0">
                        <div className="col-1">
                            <h6 className="text-center">Score</h6>
                            <h4 className="text-center">N/A</h4>

                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-auto">
                            {isNotAdded ? <GetAddButton /> : <GetStatusSelect />}
                        </div>
                        <div className="col-auto">
                            <GetMovieScore />
                        </div>
                        <div className="col-auto">
                            {!isNotAdded ? <GetReviewButton /> : null}
                        </div>
                    </div>

                    <br />

                    <div className="row">
                        <h6>Synopsis</h6>
                        <hr className="mt-0" />
                        <p> {movie.synopsis}</p>
                    </div>

                    <br />

                    <div className="row">
                        <div className="col-6">
                            <h6>Characters & Actors</h6>
                        </div>
                        <div className="col-6">
                            <div style={{ cursor: "pointer" }} onClick={() => navigate("/movie/" + movie.id + "/" + movie.movieName + "/characters&actors")}><p className="float-end" >View more</p></div>
                        </div>

                        <hr className="mt-0" />
                        {
                            movieActors.map((actor, index) => {
                                return (
                                    <div className={index === 0 ? "row mt-0" : "row mt-1"} key={actor.id} style={{ cursor: "pointer" }} onClick={() => navigate("/person/" + actor.id + "/" + actor.firstName + " " + actor.lastName)}>
                                        <div className="col-md-1"><img className="img-fluid img-thumbnail" src={"data:image/png;base64," + actor.personImageData} alt="" /> </div>
                                        <div className="col-md-11">
                                            <div className="card-body">
                                                <div className="card-title">
                                                    <h5>Character name: {actor.characterName}</h5>
                                                </div>
                                                <h6>Actor name: {actor.firstName} {actor.lastName}</h6>
                                            </div>
                                        </div>
                                        <hr className=" mt-1" />
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="row mt-5">
                        <div className="col-6">
                            <h6>Reviews</h6>
                        </div>
                        <div className="col-6">
                            <Link className="col-6"><p className="float-end">View more</p></Link>
                        </div>

                        <hr />
                        <GetRecentComments />
                    </div>

                </div>
            </div>

            <ShowModal modalIsOpen={modalIsOpen} closeModal={closeModal} customStyles={customStyles} ModalData={() => ReviewModalData({ setIsOpen, userId, movieId })} text={"Write a review"} />
            <ToastContainer />
        </div>
    );
}