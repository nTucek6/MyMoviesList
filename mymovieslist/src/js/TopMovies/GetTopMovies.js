import axios from "axios";
import config from './../../config.json';

export default async function GetTopMovies({setMovies,postPerPage,page})
{
   await axios({
        method: "get",
        url: config.SERVER_URL + "MovieSearch/GetTopMovies",
        headers: {'Content-Type': 'application/json' },
        params: {
            PostPerPage:postPerPage,
            Page:page
        }    
    })
        .then(function (response) {
            if (response) {
                setMovies(prevData => [...prevData, ...response.data]);
            }
        })
        .catch(function (response) {
            console.log(response);
        });
}