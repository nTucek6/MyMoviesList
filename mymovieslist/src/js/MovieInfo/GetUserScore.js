import axios from "axios";
import config from './../../config.json';

export default async function GetUserScore({ setScore, userId, movieId }) {
    await axios({
        method: "get",
        url: config.SERVER_URL + "MovieSearch/GetUserScore",
        headers: { 'Content-Type': 'application/json' },
        params: {
            userId: userId,
            movieId: movieId
        }
    })
        .then(function (response) {
            if (response.data !== null && response.data !== "") {
                setScore(response.data);
            }
        })
        .catch(function (response) {
            console.log(response);
        });
}