import axios from "axios";
import config from './../../config.json';

export default async function GetDiscussionsCount({setDiscussionsCount}) {
   
           await axios({
                method: "get",
                url: config.SERVER_URL + "Discussions/GetDiscussionCount",
                headers: { 'Content-Type': 'application/json' },
            })
                .then(function (response) {
                    setDiscussionsCount(response.data);
    
                })
                .catch(function (response) {
                    console.log(response);
                });
        }