import axios from "axios";
import config from './../../config.json';

export default async function GetStatusInfo({ setStatusInfo, username }) {
    await axios({
        method: "get",
        url: config.SERVER_URL + "Profile/GetStatusInfo",
        headers: { 'Content-Type': 'application/json' },
        params: {
            username: username,
        },
    })
        .then(function (response) {
            setStatusInfo(response.data);
        })
        .catch(function (response) {
            console.log(response);
        });
}