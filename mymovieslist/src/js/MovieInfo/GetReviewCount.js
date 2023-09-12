import axios from "axios";
import config from './../../config.json';

export default async function GetReviewCount({setReviewsCount,movieId})
    {
    await axios({
        method: "get",
        url: config.SERVER_URL + "MovieInfo/GetReviewsCount",
        headers: { 'Content-Type': 'application/json' },
        params:{
            movieId: movieId
        }
         })
        .then(function (response) {
            setReviewsCount(response.data);
        })
        .catch(function (response) {
          console.log(response);
        });   
    }