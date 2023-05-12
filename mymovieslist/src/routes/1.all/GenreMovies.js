import { useEffect, useRef } from "react";
import SearchBarMovies from "../../js/MovieSearch/SearchBarMovies";
import { useLocation } from "react-router-dom";
import GetGenreMovies from "../../js/MovieSearch/GetGenreMovies";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GenreMovies() {

    const location = useLocation();
    const genre = location.state;

    const [movies, setMovies] = useState([]);

    const [page, setPage] = useState(1);
    const postPerPage = 10;

    const shouldLoadData = useRef(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            GetGenreMovies({ movies, setMovies, postPerPage, page, genre });
        }

    }, [])


    const toMovieInfo = (link, data) => {
        sessionStorage.setItem("movieName", data.movieName);
        navigate(link, { state: data.id });
    }


    //   return (<div className="col" key={movie.id} style={{ cursor: "pointer" }} onClick={() => toMovieInfo('/movie/' + movie.movieName, movie)}>{movie.movieName}</div>)

    return (
        <>
            <div className="container">
                <SearchBarMovies />
                <div>
                    <h6>Movies</h6>
                    <hr />
                    <div className="row row-cols-3 mt-5 ">
                        {
                            movies.map((movie,index) => {
                                return (
                                <div className={index == 0 ? "col d-flex justify-content-center" : "col d-flex justify-content-center mt-2"} key={movie.id} style={{ cursor: "pointer" }} onClick={() => toMovieInfo('/movie/' + movie.movieName, movie)}>
                                <div className="card" style={{width: "12rem"}}>
                                    <img src={"data:image/png;base64," + movie.movieImageData} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <p className="card-text">{movie.movieName}</p>
                                        </div>
                                </div>
                                </div>)


                            })
                        }
                    </div>
                </div>

            </div>

        </>
    );
}