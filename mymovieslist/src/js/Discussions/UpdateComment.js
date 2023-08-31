import config from '../../config.json';
import axios from "axios";

export default async function UpdateComment({ Id,comment }) {
    await axios({
        method: "get",
        url: config.SERVER_URL + "Discussions/UpdateComment",
        headers: { 'Content-Type': 'application/json' },
        params: {
            Id: Id,
            comment:comment

        }
    })
        .then(function (response) {
            //console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });

}