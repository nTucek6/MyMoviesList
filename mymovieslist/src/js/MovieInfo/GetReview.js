import axios from "axios";
import config from './../../config.json';

export default async function GetReview({setRecentReviews,movieId})
    {
    await axios({
        method: "get",
        url: config.SERVER_URL + "MovieInfo/GetRecentReviews",
        headers: { 'Content-Type': 'application/json' },
        params:{
            movieId:movieId
        }
         })
        .then(function (response) {
            setRecentReviews(response.data);
        })
        .catch(function (response) {
          console.log(response);
        });   
    }