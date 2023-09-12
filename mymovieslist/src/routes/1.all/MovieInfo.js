import { useNavigate, useParams } from "react-router-dom";
import GetMovieInfo from "../../js/MovieInfo/GetMovieInfo";
import { useRef, useEffect, useState } from "react";
import Select from 'react-select'
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
import customStyles from "../../js/MovieInfo/customStyles";
import GetReviewCount from "../../js/MovieInfo/GetReviewCount";

import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from 'react-loader-spinner';

export default function MovieInfo() {

    const { id } = useParams();

    const movieId = id;

    // const shouldLoadData = useRef(true);

    const navigate = useNavigate();

    const token = getToken();

    let userId = token !== null ? jwt_decode(token).Id : 0;

    const [modalIsOpen, setIsOpen] = useState(false);

    const [movie, setMovie] = useState(null);
    const [movieActors, setMovieActors] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [watchStatus, setWatchStatus] = useState(null);
    const [score, setScore] = useState(0);
    const [RecentReviews, setRecentReviews] = useState([]);
    const [ReviewsCount, setReviewsCount] = useState(0);
    const [HasMoreData, setHasMoreData] = useState(false);

    const postPerPage = 10;
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

        GetMovieInfo({ setMovie, movieId });
        GetMovieActors({ setMovieActors, movieId, page: 1, postperpage: 4 });
        GetReview({ setRecentReviews, movieId, postPerPage, page: 1, firstLoad: true });
        GetReviewCount({ setReviewsCount, movieId });

        if (token !== null) {
            GetStatus({ setStatusList });
            GetWatchStatus({ setWatchStatus, setIsNotAdded, userId, movieId });
            GetUserScore({ setScore, userId, movieId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieId]);

    useEffect(() => {
        if (ReviewsCount !== RecentReviews.length) {
            setHasMoreData(true);
        } else {
            setHasMoreData(false);
        }
    }, [ReviewsCount, RecentReviews]);


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
            onChange={s => UpdateUserListStatus(s)}
        />)
    }

    const GetMovieScore = () => {
        return (
            <Select
                name="score"
                placeholder="Select score from 1 to 5"
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

    const UpdateUserListStatus = (status) => {

        const statusId = status.value;
        setWatchStatus(status);

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

    const fetchMoreData = () => {

        setPage(page + 1);
        setTimeout(() => {

            GetReview({ setRecentReviews, movieId, postPerPage, page: page + 1, firstLoad: false });

        }, 1000);
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
                        <div className="col-1 mt-2 mb-2 border border-start-0 border-top-0 border-bottom-0">
                            <h6 className="text-center">Score</h6>
                            {movie.rating === null ? <h4 className="text-center">N/A</h4> : <h4 className="text-center">{movie.rating}</h4>}
                            {movie.rating === null ? null : movie.ratingsCount > 1 ? <p className="text-center text-muted">{movie.ratingsCount} users</p> : <p className="text-center text-muted">{movie.ratingsCount} user</p>}
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
                                                    <h5><b>{actor.firstName} {actor.lastName}</b></h5>
                                                </div>
                                                <span style={{ opacity: 0.8 }}>{actor.characterName}</span>
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
                            {
                                //<Link className="col-6"><p className="float-end">View more</p></Link> 
                            }
                        </div>

                        <hr />
                        <InfiniteScroll
                            dataLength={RecentReviews.length}
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
                                RecentReviews.length !== 0 ? RecentReviews.map((review, index) =>
                                (
                                    <div key={index}>
                                        <h6>User: {review.userName}, Time created: {format(new Date(review.timeCreated), 'dd.MM.yyyy HH:mm:ss')}</h6>
                                        <p>{review.reviewText}</p>
                                        <hr />
                                    </div>
                                )
                                )
                                    :
                                    null
                            }
                        </InfiniteScroll>



                    </div>

                </div>
            </div>

            <ShowModal modalIsOpen={modalIsOpen} closeModal={closeModal} customStyles={customStyles} ModalData={() => ReviewModalData({ setIsOpen, userId, movieId })} text={"Write a review"} />
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                closeOnClick={false}
                newestOnTop={true}
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
            />
        </div>
    );
}