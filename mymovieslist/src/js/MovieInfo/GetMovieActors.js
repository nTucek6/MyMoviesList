
import axios from "axios";
import config from './../../config.json';

export default async function GetMovieActors({setMovieActors,movieId,page,postperpage})
    {
    await axios({
        method: "get",
        url: config.SERVER_URL + "MovieSearch/GetMovieActors",
        headers: { 'Content-Type': 'application/json' },
        params:{
            movieId:movieId,
            Page:page,
            PostPerPage:postperpage
        }
         })
        .then(function (response) {
            setMovieActors(response.data);
        })
        .catch(function (response) {
          console.log(response);
        });   
    }