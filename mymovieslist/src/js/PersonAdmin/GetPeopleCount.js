import config from './../../config.json';
import axios from "axios";

export default async function GetPeopleCount({setPeopleCount}) {

    await axios({
        method: "get",
        url: config.SERVER_URL + "PersonAdmin/GetPeopleCount",
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (response) {
            setPeopleCount(response.data);
        })
        .catch(function (response) {
            console.log(response);
        });
}