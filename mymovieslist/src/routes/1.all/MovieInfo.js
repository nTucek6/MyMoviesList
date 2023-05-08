import { useLocation } from "react-router-dom";
import GetMovieInfo from "../../js/MovieInfo/GetMovieInfo";
import { useRef, useEffect, useState } from "react";
import { Button } from "bootstrap";

export default function MovieInfo() {
    const location = useLocation();
    const movieId = location.state;

    const shouldLoadData = useRef(true);

    const [movie, setMovie] = useState(null);

    const imageStyle =
    {
        width: '200px',
        height: '300px'
    };


    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            GetMovieInfo({ setMovie, movieId })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (movie == null)
        return null;


    const GetWatchStatus = () => {
        if (true) {
            return (<button className="btn btn-info">Add to List</button>)
        }
        else {

        }
    }

    return (
        <div className="container">
            <div className="row container m-0 p-0">
                <div className="col-3  border border-start-0 border-top-0 border-bottom-0 d-flex align-items-stretch">
                    <img style={imageStyle} src={"data:image/png;base64," + movie.movieImageData} />
                </div>

                <div className="col-9 ">

                    <div className="row">
                        <div className="col">
                            <GetWatchStatus />
                        </div>
                    </div>

                    <br />

                    <div className="row">
                        <h6>Synopsis</h6>
                        <hr className="mt-0" />
                        {movie.synopsis}
                    </div>
                </div>

            </div>
        </div>

    );
}