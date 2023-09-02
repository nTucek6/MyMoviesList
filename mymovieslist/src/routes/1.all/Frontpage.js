import { useState, useEffect, useRef } from "react";
import SwiperMovies from "./../../js/frontpage/swiper";
import Discussions from "../../js/frontpage/Discussions";
import { Link } from "react-router-dom";
import LoadRecentMovies from "../../js/frontpage/LoadRecentMovies";

export default function Frontpage() {
    const [RecentMovies, setRecentMovies] = useState(null);

    const shouldLoadData = useRef(true);

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            LoadRecentMovies({ setRecentMovies })
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