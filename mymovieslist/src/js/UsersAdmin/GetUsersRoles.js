import config from './../../config.json';
import axios from "axios";

export default async function GetUsersRoles({setUsersRoles}) {

    await axios({
        method: "get",
        url: config.SERVER_URL + "UsersAdmin/GetUserRoles",
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (response) {
            setUsersRoles(response.data);
        })
        .catch(function (response) {
            console.log(response);
        });
}