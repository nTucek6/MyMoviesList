
import axios from "axios";
import config from './../../config.json';

export default async function GetMovieInfo({setMovie,movieId})
    {
    await axios({
        method: "get",
        url: config.SERVER_URL + "MovieSearch/GetMovieInfo",
        headers: { 'Content-Type': 'application/json' },
        params:{
            movieId:movieId
        }
         })
        .then(function (response) {
            setMovie(response.data);
        })
        .catch(function (response) {
          console.log(response);
        });   
    }