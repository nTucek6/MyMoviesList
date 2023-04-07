import config from './../../config.json';
import axios from "axios";

export default async function GetUsersCount({setUsersCount}) {

    await axios({
        method: "get",
        url: config.SERVER_URL + "UsersAdmin/GetUsersCount",
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (response) {
            setUsersCount(response.data);
        })
        .catch(function (response) {
            console.log(response);
        });
}