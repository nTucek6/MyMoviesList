import config from './../../config.json';
import axios from "axios";

export default async function UpdateMovie (Movie) {
    await axios({
        method: "post",
        url: config.SERVER_URL + "MoviesAdmin/UpdateMovie",
        headers: { 'Content-Type': 'application/json' },
        data: Movie
    })
        .then(function (response) {
            if (response) {

            }
        })
        .catch(function (response) {
            console.log(response);
        });

}