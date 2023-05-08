import { useEffect, useRef } from "react";
import SearchBarMovies from "../../js/MovieSearch/SearchBarMovies";
import { useLocation } from "react-router-dom";
import GetGenreMovies from "../../js/MovieSearch/GetGenreMovies";
import { useState } from "react";

export default function GenreMovies() {

    const location = useLocation();
    const genre = location.state;

    const [movies,setMovies] = useState([]);

    const [page, setPage] = useState(1);
    const postPerPage = 10;

    const shouldLoadData = useRef(true);

    useEffect(()=>{
    if(shouldLoadData.current)
    {
        shouldLoadData.current = false;
        GetGenreMovies({movies,setMovies,postPerPage,page,genre});
    }
    
    },[])

    return (
        <>
            <div className="container">
                <SearchBarMovies />
                <div>
                    <h6>Movies</h6>
                    <hr />
                    <div className="row row-cols-3 text-center mt-5">
                    {
                    movies.map(movie =>
                        {
                            return (<div className="col" key={movie.id}>{movie.movieName}</div>)
                        })
                    }

                    </div>
                </div>

            </div>

        </>
    );
}