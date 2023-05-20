import axios from "axios";
import config from './../../config.json';

export default async function GetUserList({setUserList,username,statusId})
    {
    await axios({
        method: "get",
        url: config.SERVER_URL + "Profile/GetUserList",
        headers: { 'Content-Type': 'application/json' },
        params: {
            username : username,
            statusId : statusId
        },
         })
        .then(function (response) {
            setUserList(response.data);
        })
        .catch(function (response) {
          console.log(response);
        });   
    }