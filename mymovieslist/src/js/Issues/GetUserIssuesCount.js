import config from './../../config.json';
import axios from "axios";

export default async function GetUserIssuesCount({setIssuesCount}) {

    await axios({
        method: "get",
        url: config.SERVER_URL + "UserSupport/GetUserIssuesCount",
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (response) {
            //console.log(response);
            setIssuesCount(response.data);
        })
        .catch(function (response) {
            console.log(response);
        });
}