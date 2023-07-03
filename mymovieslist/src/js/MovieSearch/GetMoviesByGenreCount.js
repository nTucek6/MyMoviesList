import axios from "axios";
import config from './../../config.json';

export default async function GetMoviesByGenreCount({setMoviesCount,genre})
{
   await axios({
        method: "get",
        url: config.SERVER_URL + "MovieSearch/GetMoviesByGenreCount",
        headers: {'Content-Type': 'application/json' },
        params: {
            genre:genre,
        }    
    })
        .then(function (response) {
            if (response) {
                setMoviesCount(response.data);
            }
        })
        .catch(function (response) {
            console.log(response);
        });
}