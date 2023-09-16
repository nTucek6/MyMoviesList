import axios from "axios";
import config from './../../config.json';

export default async function GetModalReview({setOldReview,movieId,userId })
    {
      
    await axios({
        method: "get",
        url: config.SERVER_URL + "MovieInfo/GetModalReview",
        headers: { 'Content-Type': 'application/json' },
        params:{
            movieId:movieId,
            userId:userId
        }
         })
        .then(function (response) {
            if(response.data !== null || response.data !== "")
            {  
                setOldReview(response.data);   
            }
        })
        .catch(function (response) {
          console.log(response);
        });   
    }