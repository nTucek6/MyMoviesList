import config from './../../config.json';
import axios from "axios";

export default async function CalculateMovieRating()
{
    await axios({
        method: "post",
        url: config.SERVER_URL + "MoviesAdmin/UpdateMoviesScore",
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });

}