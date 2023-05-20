import { useState } from "react";
import GetUserBio from "../../js/Profile/UserBio";
import GetTimeSpentWatching from "../../js/Profile/GetTimeSpentWatching";
import { useRef } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GetStatusInfo from "../../js/Profile/GetStatusInfo";

export default function Profile() {
    const UserId = sessionStorage.getItem('ProfileId');

    const [TimeSpentWatching , setTimeSpentWatching] = useState(0);
    const [StatusInfo,setStatusInfo] = useState ([]);

    const navigate = useNavigate();

    const { username } = useParams();

    const shouldLoadData = useRef(true);

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
        }

        GetTimeSpentWatching({setTimeSpentWatching,username});
        GetStatusInfo({setStatusInfo,username});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);


    const toStatusInfo = (link, data) => {
        //sessionStorage.setItem("movieName",data.movieName);
        navigate(link, { state: data });
      }

    return (
        <div className="container">
            <div className="row container m-0 p-0">
                <div className="col-3  border border-start-0 border-top-0 border-bottom-0 d-flex align-items-stretch">
                    <img src={null} />
                </div>

                <div className="col-9 ">

                    <GetUserBio Id={UserId} />

                    <h6>Statistics</h6>
                    <hr className="mt-0" />
                    <div className="row">
                        <div className="col-6">
                            <h6 className="">Movies stats</h6>
                            <hr className="mt-0" />
                            <h6>Days: {TimeSpentWatching.toFixed(2)}</h6>
                            <br />
                            {
                              StatusInfo.length ? StatusInfo.map(s =>{
                                    return(
                                       <div className="row" key={s.id}>
                                            <div className="col" style={{ cursor: "pointer" }} onClick={()=> toStatusInfo('/movieslist/'+username,s.id)} > {s.status} </div>
                                            <div className="col">{s.statusCount}</div>
                                       </div> 
                                    )
                                }) : null

                            }
                        </div>

                        <div className="col-6  ">
                            <h6 className="">Last update</h6>
                            <hr className="mt-0" />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}