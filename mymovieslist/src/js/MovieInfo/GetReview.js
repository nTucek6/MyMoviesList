import axios from "axios";
import config from './../../config.json';

export default async function GetReview({setRecentReviews,movieId, postPerPage,page, firstLoad})
    {
      
    await axios({
        method: "get",
        url: config.SERVER_URL + "MovieInfo/GetReviews",
        headers: { 'Content-Type': 'application/json' },
        params:{
            movieId:movieId,
            PostPerPage: postPerPage,
            Page: page
        }
         })
        .then(function (response) {
            if(response.data !== null || response.data !== "")
            {
                if(firstLoad)
                {
                    setRecentReviews(response.data);
                }
                else
                {
                    setRecentReviews(prevData => [...prevData, ...response.data]);
                }
            }
        })
        .catch(function (response) {
          console.log(response);
        });   
    }