import config from './../../config.json';
import axios from "axios";

export default async function ChangeProfileImage({User}) {
    console.log(User)
    await axios({
        method: "post",
        url: config.SERVER_URL + "auth/ChangeProfileImage/",
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