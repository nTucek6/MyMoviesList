import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';

import GetTopMovies from "../../js/TopMovies/GetTopMovies";
import GetTopMoviesCount from "../../js/TopMovies/GetTopMoviesCount";


export default function TopMovies() {

    const [movies, setMovies] = useState([]);
    const [movieCount, setMoviesCount] = useState(0);
    const navigate = useNavigate();

    const postPerPage = 30;
    const [page, setPage] = useState(1);
    const [HasMoreData, setHasMoreData] = useState(false);

    const shouldLoadMore = useRef(true);

    useEffect(() => {
        if (shouldLoadMore.current) {
            shouldLoadMore.current = false;
            GetTopMovies({ setMovies, postPerPage, page });
            GetTopMoviesCount({ setMoviesCount });
            setPage(page + 1);
        }
    }, []);

    useEffect(() => {
        if (movieCount !== movies.length) {
            setHasMoreData(true);
        }
        else {
            setHasMoreData(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movies]);


    const fetchMoreData = () => {

        setPage(page + 1);
        setTimeout(() => {
            GetTopMovies({setMovies, postPerPage, page });
        }, 500);
    }

    return (
        <div className="container">
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
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Movie name</th>
                            <th>Score</th>
                            <th>Raters</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies.map((movie, index) => {
                                return (<tr key={movie.id} style={{ cursor: "pointer" }} onClick={() => navigate('/movie/' + movie.id + '/' + movie.movieName, movie)}>
                                    <td>{index + 1}</td>
                                    <td><img className="img-fluid img-thumbnail" style={{ width: "50px", height: "70px" }} src={"data:image/png;base64," + movie.movieImageData} alt="" /> {movie.movieName}</td>
                                    <td>{movie.rating}</td>
                                    <td>{movie.ratingsCount}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>

            </InfiniteScroll>
        </div>
    )

}