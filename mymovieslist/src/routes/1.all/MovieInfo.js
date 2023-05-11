import { useLocation } from "react-router-dom";
import GetMovieInfo from "../../js/MovieInfo/GetMovieInfo";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import GetStatus from "../../js/MovieInfo/GetStatus";
import jwt_decode from "jwt-decode";
import getToken from "../../js/token/gettoken";
import GetWatchStatus from '../../js/MovieInfo/GetWatchStatus';
import UpdateMovieUserList from "../../js/MovieInfo/UpdateMovieUserList";
import GetUserScore from "../../js/MovieInfo/GetUserScore";

export default function MovieInfo() {
    const location = useLocation();
    const movieId = location.state;

    const shouldLoadData = useRef(true);

    const userId = jwt_decode(getToken()).Id;

    const [movie, setMovie] = useState(null);
    const [statusList, setStatusList] = useState([]);
    const [watchStatus, setWatchStatus] = useState(null);
    const [score, setScore] = useState(0);

    const [isNotAdded, setIsNotAdded] = useState(true);

    const imageStyle =
    {
        width: '200px',
        height: '300px'
    };



    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            GetMovieInfo({ setMovie, movieId })
            GetStatus({ setStatusList });
            GetWatchStatus({ setWatchStatus, setIsNotAdded, userId, movieId });
            GetUserScore({ setScore, userId, movieId });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (movie == null)
        return null;


  /*  const CheckWatchStatus = () => {
        if (watchStatus === null || watchStatus === "") {
            return (<button className="btn btn-info" onClick={() => AddMovieToList({ userId, movieId })}>Add to List</button>)
        }
        else {
            return (<Select
                name="watchstatus"
                options={statusList}
                defaultValue={watchStatus}
                onChange={s => UpdateUserListStatus(s.value)}
            />)
        }
    } */

    const GetAddButton = () => {

        return (<button className="btn btn-info" onClick={() => AddMovieToList({ userId, movieId })}>Add to List</button>);
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

        UpdateMovieUserList({ userId, movieId }).then(()=>{
                setIsNotAdded(false);
        });
    }


    const UpdateUserListStatus = (statusId) => {

        UpdateMovieUserList({ userId, movieId, score, statusId })
    }

    const UpdateUserListScore = (score) => {
        UpdateMovieUserList({ userId, movieId, score })
    }

    return (
        <div className="container">
            <div className="row container m-0 p-0">
                <div className="col-3  border border-start-0 border-top-0 border-bottom-0 d-flex align-items-stretch">
                    <img style={imageStyle} src={"data:image/png;base64," + movie.movieImageData} />
                </div>

                <div className="col-9 ">
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
                        <h6>Characters & Actors</h6>
                        <hr className="mt-0" />

                    </div>

                </div>
            </div>
        </div>

    );
}