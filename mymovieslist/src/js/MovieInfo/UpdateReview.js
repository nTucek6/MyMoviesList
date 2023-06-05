import axios from "axios";
import config from './../../config.json';

export default async function UpdateReview({userId,movieId,Review})
    {
    await axios({
        method: "post",
        url: config.SERVER_URL + "MovieInfo/UpdateReview",
        headers: { 'Content-Type': 'application/json' },
        data:{
            UserId:userId,
            MovieId:movieId,
            ReviewText:Review
        }
         })
        .then(function (response) {
           console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });   
    }