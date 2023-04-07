import SearchBarMovies from "../../js/MovieSearch/SearchBarMovies";
import { useLocation } from "react-router-dom";

export default function GenreMovies() {

    const location = useLocation();
    const data = location.state;

    return (
        <>
            <div className="container">
                <SearchBarMovies />

                <div>
                    <h6>Movies</h6>
                    <hr />
                    <div className="row row-cols-3 text-center mt-5">

                    </div>
                </div>

            </div>

        </>
    );
}