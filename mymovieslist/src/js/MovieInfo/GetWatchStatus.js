import axios from "axios";
import config from './../../config.json';

export default async function GetWatchStatus({ setWatchStatus, setIsNotAdded, userId, movieId }) {
    await axios({
        method: "get",
        url: config.SERVER_URL + "MovieInfo/GetWatchStatus",
        headers: { 'Content-Type': 'application/json' },
        params: {
            userId: userId,
            movieId: movieId
        }
    })
        .then(function (response) {
            if (response.data !== null && response.data !== "") {
                setWatchStatus(response.data);
                setIsNotAdded(false);
            }
        })
        .catch(function (response) {
            console.log(response);
        });
}