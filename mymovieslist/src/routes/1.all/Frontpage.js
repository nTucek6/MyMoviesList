import { useState, useEffect, useRef } from "react";
import SwiperMovies from "./../../js/frontpage/swiper";
import Discussions from "../../js/frontpage/Discussions";
import { Link } from "react-router-dom";
import LoadRecentMovies from "../../js/frontpage/LoadRecentMovies";
import GetTopMovies from "../../js/TopMovies/GetTopMovies";

export default function Frontpage() {
    const [RecentMovies, setRecentMovies] = useState(null);
    const [movies, setMovies] = useState([]);
    const postPerPage = 8;
    const page = 1;

    const shouldLoadData = useRef(true);

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            LoadRecentMovies({ setRecentMovies });
            GetTopMovies({setMovies,postPerPage,page});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="container">
                <div>
                    <h6>Newly added</h6>
                    <hr />
                    <SwiperMovies RecentMovies={RecentMovies} />
                </div>
                <div className="mt-5">
                    <h6>Top movies</h6>
                    <hr />
                    <SwiperMovies RecentMovies={movies} />
                </div>
                <div className="mt-5">
                    <div className="row ">
                        <h6 className="col-6">Discussions</h6>
                        <Link to="/discussions" className="col-6 text-dark"><p className="float-end">View more</p></Link>
                        <hr />
                        <Discussions />
                    </div>
                </div>
            </div>
        </>
    );
}