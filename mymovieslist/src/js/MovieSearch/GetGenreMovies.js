import axios from "axios";
import config from './../../config.json';

export default async function GetGenreMovies({setMovies,postPerPage,page,genre})
{
   await axios({
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
                setMovies(prevData => [...prevData, ...response.data]);
            }
        })
        .catch(function (response) {
            console.log(response);
        });
}