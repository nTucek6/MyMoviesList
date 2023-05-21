import axios from "axios";
import config from './../../config.json';

export default async function GetLastUpdate({ setLastUpdate, postperpage, page ,username }) {
    await axios({
        method: "get",
        url: config.SERVER_URL + "Profile/GetLastUpdate",
        headers: { 'Content-Type': 'application/json' },
        params: {
            PostPerPage: postperpage,
            Page:page,
            username: username,
        },
    })
        .then(function (response) {
            setLastUpdate(response.data);
        })
        .catch(function (response) {
            console.log(response);
        });
}