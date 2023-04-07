import config from './../../config.json';
import axios from "axios";

export default async function ChangePassword(User) {
    await axios({
        method: "post",
        url: config.SERVER_URL + "auth/ChangePassword/",
        headers: { 'Content-Type': 'application/json' },
        data: User
    })
        .then(function (response) {
            if (response) {
               
            }
        })
        .catch(function (response) {
            console.log(response);
        });

}