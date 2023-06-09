import axios from "axios";
import config from './../../config.json';

export default async function GetGenreMovies({movies,setMovies,postPerPage,page,genre})
{
   await axios({
        method: "get",
        url: config.SERVER_URL + "MovieSearch/GetMoviesByGenre",
        headers: {'Content-Type': 'application/json' },
        params: {
            genre:genre
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
}