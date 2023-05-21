import { useState } from "react";
import GetUserBio from "../../js/Profile/UserBio";
import GetTimeSpentWatching from "../../js/Profile/GetTimeSpentWatching";
import { useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GetStatusInfo from "../../js/Profile/GetStatusInfo";
import GetLastUpdate from "../../js/Profile/GetLastUpdate";
import GetUserProfileImage from "../../js/Profile/GetUserProfileImage";
import format from "date-fns/format";

export default function Profile() {

    const [TimeSpentWatching, setTimeSpentWatching] = useState(0);
    const [StatusInfo, setStatusInfo] = useState([]);
    const [LastUpdate, setLastUpdate] = useState([]);
    const [ProfileImage,setProfileImage] = useState(null);

    const postperpage = 3;
    const page = 1;

    const navigate = useNavigate();

    const { username } = useParams();

    const shouldLoadData = useRef(true);

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
        }

        GetTimeSpentWatching({ setTimeSpentWatching, username });
        GetStatusInfo({ setStatusInfo, username });
        GetLastUpdate({ setLastUpdate, postperpage, page, username });
        GetUserProfileImage({setProfileImage,username});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);



    const toStatusInfo = (link, data) => {
        //sessionStorage.setItem("movieName",data.movieName);
        navigate(link, { state: data });
    }

    const toMovieInfo = (link, data) => {
        sessionStorage.setItem("movieName",data.movieName);
        navigate(link, { state: data.id });
      }


    return (
        <div className="container">
            <div className="row container m-0 p-0">
                <div className="col-3  border border-start-0 border-top-0 border-bottom-0 d-flex align-items-stretch">
                    <img className="img-fluid img-thumbnail" src={"data:image/png;base64," + ProfileImage} alt="" />
                </div>

                <div className="col-9 ">

                    <GetUserBio username={username} />

                    <h6>Statistics</h6>
                    <hr className="mt-0" />
                    <div className="row">
                        <div className="col-6">
                            <h6 className="">Movies stats</h6>
                            <hr className="mt-0" />
                            <h6>Days: {TimeSpentWatching.toFixed(2)}</h6>
                            <br />
                            {
                                StatusInfo.length > 0 ? StatusInfo.map(s => {
                                    return (
                                        <div className="row" key={s.id}>
                                            <div className="col" style={{ cursor: "pointer" }} onClick={() => toStatusInfo('/movieslist/' + username, s.id)} > {s.status} </div>
                                            <div className="col">{s.statusCount}</div>
                                        </div>
                                    )
                                }) : null

                            }
                        </div>
                        <div className="col-6  ">
                            <h6 className="">Last update</h6>
                            <hr className="mt-0" />
                            {
                                LastUpdate.length > 0 ? LastUpdate.map((movie,index) => {
                                    return (
                                        <div className={index=== 0 ? "row" : "row mt-2"} key={movie.id}>
                                         <img className="img-fluid img-thumbnail col-2" style={{width:"50px",height:"60px"}} src={"data:image/png;base64," + movie.movieImageData} alt="" />
                                         <h6 className="col" style={{cursor:"pointer"}} onClick={() => toMovieInfo('/movie/' + movie.movieName, movie)}>{movie.movieName}</h6>
                                        <small className="col"> {format(new Date(movie.timeAdded), 'dd.MM.yyyy HH:mm:ss')}</small>
                                        </div>
                                    )
                                }) : null

                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}