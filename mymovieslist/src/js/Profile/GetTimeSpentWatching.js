import axios from "axios";
import config from './../../config.json';

export default async function GetTimeSpentWatching({ setTimeSpentWatching, username }) {
    await axios({
        method: "get",
        url: config.SERVER_URL + "Profile/GetTimeSpentWatching",
        headers: { 'Content-Type': 'application/json' },
        params: {
            username: username,
        },
    })
        .then(function (response) {
            setTimeSpentWatching(response.data);
        })
        .catch(function (response) {
            console.log(response);
        });
}