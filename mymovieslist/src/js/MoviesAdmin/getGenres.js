import config from './../../config.json';
import axios from "axios";

export default async function GetGenresAPI({ setGetGenres })
{
    await axios({
        method: "get",
        url: config.SERVER_URL + "MoviesAdmin/GetGenres",
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (response) {
            if (response) {
                setGetGenres(response.data);
            }
        })
        .catch(function (response) {
            console.log(response);
        });

}