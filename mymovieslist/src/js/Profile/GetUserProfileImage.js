import axios from "axios";
import config from './../../config.json';

export default async function GetUserProfileImage({setProfileImage,username})
    {
    await axios({
        method: "get",
        url: config.SERVER_URL + "Profile/GetProfileImage",
        headers: { 'Content-Type': 'application/json' },
        params:{
            username:username
        },
         })
        .then(function (response) {
            setProfileImage(response.data);
        })
        .catch(function (response) {
          console.log(response);
        });   
    }