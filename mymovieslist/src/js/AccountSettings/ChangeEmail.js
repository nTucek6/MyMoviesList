import config from './../../config.json';
import axios from "axios";
import RefreshToken from './RefreshToken';

export default async function ChangeEmail(User) {
    await axios({
        method: "post",
        url: config.SERVER_URL + "auth/ChangeEmail/",
        headers: { 'Content-Type': 'application/json' },
        data: User
    })
        .then(function (response) {
            if (response) {
                const token = response.data;
                RefreshToken({token});
            }
        })
        .catch(function (response) {
            console.log(response);
        });

}