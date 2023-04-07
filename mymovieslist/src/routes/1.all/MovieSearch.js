
import GetGenres from '../../js/MovieSearch/GetGenres';
import SearchBarMovies from '../../js/MovieSearch/SearchBarMovies';

export default function MovieSearch() {
   
    return (
        <>
            <div className="container">
                    <SearchBarMovies />

                <div>
                    <h6>Genres</h6>
                    <hr />
                    <div className="row row-cols-3 text-center mt-5">
                    <GetGenres />
                </div>
                </div>

               

            </div>
        </>
    );

}