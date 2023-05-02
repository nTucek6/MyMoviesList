import axios from "axios";
import config from './../../config.json';

export default async function LoadRecentMovies({setRecentMovies})
    {
    await axios({
        method: "post",
        url: config.SERVER_URL + "Frontpage/GetRecentMovies",
        headers: { "Content-Type": "multipart/form-data" },
         })
        .then(function (response) {
            setRecentMovies(response.data);
            //console.log(response);
        })
        .catch(function (response) {
          //handle error
          //console.log(response);
        });   
    }