import { useLocation, useNavigate } from "react-router-dom";
import GetMovieInfo from "../../js/MovieInfo/GetMovieInfo";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
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

export default function MovieInfo() {
    const location = useLocation();
    const movieId = location.state;

    const shouldLoadData = useRef(true);

    const navigate = useNavigate();

    const token = getToken();

    let userId = token !== null ? jwt_decode(token).Id : 0;

    const [movie, setMovie] = useState(null);
    const [movieActors, setMovieActors] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [watchStatus, setWatchStatus] = useState(null);
    const [score, setScore] = useState(0);

    const postperpage = 4;

    const [page, setPage] = useState(1);

    const [isNotAdded, setIsNotAdded] = useState(true);

    const imageStyle =
    {
        width: '200px',
        height: '300px'
    };

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            GetMovieInfo({ setMovie, movieId });
            GetMovieActors({ setMovieActors, movieId, page, postperpage });
            if (token !== null) {
                GetStatus({ setStatusList });
                GetWatchStatus({ setWatchStatus, setIsNotAdded, userId, movieId });
                GetUserScore({ setScore, userId, movieId });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (movie == null)
        return null;

    // console.log(movie);

    const GetAddButton = () => {
        if (token === null) {
            return (<button className="btn btn-info" disabled>Add to List</button>);
        }
        else {
            return (<button className="btn btn-info" onClick={() => AddMovieToList({ userId, movieId })}>Add to List</button>);
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

    const AddMovieToList = () => {

        UpdateMovieUserList({ userId, movieId }).then(() => {
            GetWatchStatus({ setWatchStatus, setIsNotAdded, userId, movieId });
            toast("Successfuly addded to list!");
           // setIsNotAdded(false);
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

    //d-flex align-items-stretch

    function WritePerson({ array }) {
        let data = array.map((d, index) => {
            if (array.length == index + 1) {
                return <p key={d.id} className="d-inline" style={{ cursor: "pointer" }} onClick={() => toPersonInfo("/person/" + d.firstName + " " + d.lastName, d)}>{d.firstName + " " + d.lastName}</p>;
            }
            else {
                return <p key={d.id} className="d-inline" style={{ cursor: "pointer" }} onClick={() => toPersonInfo("/person/" + d.firstName + " " + d.lastName, d)}>{d.firstName + " " + d.lastName}, </p>;
            }
        })
        return data;
    }

    function WriteGenres({ array }) {
        let data = array.map((d, index) => {
            if (array.length == index + 1) {
                return <p key={d.value} className="d-inline" style={{ cursor: "pointer" }} onClick={() => toGenre('/moviessearch/genre/' + d.label, d)}>{d.label}</p>;

            }
            else {
                return <p key={d.value} className="d-inline" style={{ cursor: "pointer" }} onClick={() => toGenre('/moviessearch/genre/' + d.label, d)}>{d.label}, </p>;
            }

        })
        return data;
    }

    const toPersonInfo = (link, data) => {
        sessionStorage.setItem("person", data.firstName + " " + data.lastName);
        navigate(link, { state: data.id });
    }

    const toGenre = (link, data) => {
        sessionStorage.setItem('genre', data.label)
        navigate(link, { state: data });
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
                            {// <FontAwesomeIcon icon={faStar} /> 
                            }
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
                            <Link to="" className="col-6"><p className="float-end">View more</p></Link>
                        </div>

                        <hr className="mt-0" />
                        {
                            movieActors.map((actor, index) => {
                                return (
                                    <div className={index === 0 ? "row mt-0" : "row mt-1"} key={actor.id} style={{ cursor: "pointer" }} onClick={() => toPersonInfo("/person/" + actor.firstName + " " + actor.lastName, actor)}>
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
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

// style={{ width: '70px', height: '70px' }} 