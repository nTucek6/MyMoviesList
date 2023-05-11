import axios from "axios";
import config from '../../config.json';

export default async function UpdateMovieUserList({isSuccessful,userId,movieId,score,statusId})
    {
    await axios({
        method: "get",
        url: config.SERVER_URL + "MovieInfo/UpdateMovieUserList",
        headers: { 'Content-Type': 'application/json' },
        params:{
            userId:userId,
            movieId:movieId,
            score:score,
            statusId:statusId
        }
         })
        .then(function (response) {
           // console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });   
    }