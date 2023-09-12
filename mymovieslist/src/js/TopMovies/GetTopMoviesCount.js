import axios from "axios";
import config from './../../config.json';

export default async function GetTopMoviesCount({setMoviesCount})
{
   await axios({
        method: "get",
        url: config.SERVER_URL + "MovieSearch/GetTopMoviesCount",
        headers: {'Content-Type': 'application/json' },  
    })
        .then(function (response) {
            if (response) {
                setMoviesCount(response.data);
            }
        })
        .catch(function (response) {
            console.log(response);
        });
}