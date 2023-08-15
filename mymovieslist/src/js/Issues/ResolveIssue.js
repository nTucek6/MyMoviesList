import config from './../../config.json';
import axios from "axios";

export default async function ResolveIssue({Id}) {

    await axios({
        method: "get",
        url: config.SERVER_URL + "UserSupport/ResolveIssue",
        headers: { 'Content-Type': 'application/json' },
        params:{
            Id:Id
        }
    })
        .then(function (response) {
            console.log(response);
            //notify();
        })
        .catch(function (response) {
            console.log(response);
        });
}