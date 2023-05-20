import axios from "axios";
import config from './../../config.json';

export default async function GetMoviesStatus({setStatusList})
    {
    await axios({
        method: "get",
        url: config.SERVER_URL + "Profile/GetProfileStatus",
        headers: { 'Content-Type': 'application/json' },
         })
        .then(function (response) {
            setStatusList(response.data);
        })
        .catch(function (response) {
          console.log(response);
        });   
    }