import { useEffect, useRef } from "react";
import SearchBarMovies from "../../js/MovieSearch/SearchBarMovies";
import { useParams } from "react-router-dom";
import GetGenreMovies from "../../js/MovieSearch/GetGenreMovies";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from 'react-loader-spinner';
import GetMoviesByGenreCount from "../../js/MovieSearch/GetMoviesByGenreCount";
import axios from "axios";
import config from "../../config.json";

export default function GenreMovies() {

    const { id } = useParams();
    const genre = id;

    const [movies, setMovies] = useState([]);
    const [moviesCount, setMoviesCount] = useState(0);
    const [HasMoreData, setHasMoreData] = useState(false);

    const [page, setPage] = useState(1);
    const postPerPage = 3;

    const shouldLoadData = useRef(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            GetMoviesByGenreCount({setMoviesCount,genre});
            GetGenreMovies({ movies, setMovies, postPerPage, page, genre });
            setPage(page + 1);
        }

    }, [])

    useEffect(() => {

        if(moviesCount !== movies.length)
        {
            setHasMoreData(true);
        }
        else
        {
            setHasMoreData(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movies]);

    const fetchMoreData = () => {

        setPage(page + 1);
        setTimeout(() => {

            axios({
                method: "get",
                url: config.SERVER_URL + "MovieSearch/GetMoviesByGenre",
                headers: {'Content-Type': 'application/json' },
                params: {
                    genre:genre,
                    PostPerPage:postPerPage,
                    Page:page
                }    
            })
                .then(function (response) {
                    if (response) {
                        setMovies([
                            ...movies,
                            ...response.data
                        ]);
                    }
                })
                .catch(function (response) {
                    console.log(response);
                });

        }, 1000);
    }



    const toMovieInfo = (link) => {
        navigate(link);
    }

    return (
        <>
            <div className="container">
                <SearchBarMovies />
                <div>
                    <h6>Movies</h6>
                    <hr />

                    <InfiniteScroll
                        dataLength={movies.length}
                        next={fetchMoreData}
                        hasMore={HasMoreData}
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
                            overflow: 'hidden',
                        }}
                    >
                        <div className="row row-cols-3 mt-5 ">

                            {
                                movies.map((movie, index) => {
                                    return (
                                        <div className={index == 0 ? "col d-flex justify-content-center" : "col d-flex justify-content-center mt-2"} key={movie.id} style={{ cursor: "pointer" }} onClick={() => toMovieInfo('/movie/' + movie.id + '/' + movie.movieName)}>
                                            <div className="card" style={{ width: "12rem" }}>
                                                <img src={"data:image/png;base64," + movie.movieImageData} className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <p className="card-text">{movie.movieName}</p>
                                                </div>
                                            </div>
                                        </div>)
                                })
                            }
                        </div>

                    </InfiniteScroll>


                </div>
            </div>
        </>
    );
}