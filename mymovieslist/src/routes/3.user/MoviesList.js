import { useState } from 'react';
import GetMoviesStatus from '../../js/MoviesList/GetMoviesStatus';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GetUserList from '../../js/MoviesList/GetUserList';


export default function MoviesList() {
    const [StatusList, setStatusList] = useState([]);
    const [UserList, setUserList] = useState([]);
    const [Status,setStatus] = useState("All movies");

    const navigate = useNavigate();
    const location = useLocation();

    const [GetStatusId,setGetStatusId] = useState(location.state === null ? 0 : location.state); 

    const { username } = useParams();

   // const shouldLoadData = useRef(true);

    useEffect(() => {
      /*  if (shouldLoadData.current) {
            shouldLoadData.current = false;
           
        } */
        GetMoviesStatus({ setStatusList });
        const statusId = location.state === null ? 0 : location.state;
        GetUserList({ setUserList, username, statusId });

    }, [username]);

    const ChangeStatus = (statusId,status) => {  
        if(GetStatusId !== statusId)
        {
            setGetStatusId(statusId);
            GetUserList({ setUserList, username, statusId });
            setStatus(status);
        }
    }

    const toMovieInfo = (link, data) => {
        sessionStorage.setItem("movieName",data.movieName);
        navigate(link);
      }


    return (
        <>
            <div className='container'>
                <div className="row">
                    {
                        StatusList.map(s => {
                            return (<div className='col text-center' key={s.value}><div style={{ cursor: "pointer" }} onClick={() => ChangeStatus(s.value,s.label)} ><button className={GetStatusId === s.value ? "btn btn-info" :'btn'}>{s.label}</button></div></div>)
                        })
                    }
                </div>
                <hr />

                <h5 className='text-center mt-5'>{Status}</h5>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Movie name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (UserList.length > 0) ? UserList.map((movie, index) => {
                                return (<tr key={movie.id} style={{cursor:"pointer"}} onClick={() => toMovieInfo('/movie/' + movie.id + '/' + movie.movieName, movie)}>
                                    <td>{index + 1}</td>
                                    <td><img className="img-fluid img-thumbnail" style={{width:"50px",height:"70px"}} src={"data:image/png;base64," + movie.movieImageData} alt="" /></td>
                                    <td>{movie.movieName}</td>
                                    <td>{(movie.score != null) ? movie.score : "-"}</td>
                                </tr>)
                            }) : null
                        }
                    </tbody>
                </table>

            </div>
        </>
    );
}