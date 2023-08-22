import config from './../../config.json';
import axios from "axios";

export default async function GetUsersRoles({UserId,RoleId,notify}) {

    await axios({
        method: "get",
        url: config.SERVER_URL + "UsersAdmin/ChangeUserRole",
        headers: { 'Content-Type': 'application/json' },
        params:
        {
            UserId: UserId,
            RoleId:RoleId
        }
    })
        .then(function (response) {
           // console.log(response);
            notify();
        })
        .catch(function (response) {
            console.log(response);
        });
}