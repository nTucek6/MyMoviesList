import config from './../../config.json';
import axios from "axios";

export default async function GetMoviesCount({setMoviesCount}) {

    await axios({
        method: "get",
        url: config.SERVER_URL + "MoviesAdmin/GetMoviesCount",
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (response) {
            setMoviesCount(response.data);
        })
        .catch(function (response) {
            console.log(response);
        });
}