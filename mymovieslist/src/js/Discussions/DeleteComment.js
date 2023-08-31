import config from '../../config.json';
import axios from "axios";

export default async function DeleteComment({ Id }) {
    await axios({
        method: "get",
        url: config.SERVER_URL + "Discussions/DeleteComment",
        headers: { 'Content-Type': 'application/json' },
        params: {
            Id: Id,

        }
    })
        .then(function (response) {
            //console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });

}