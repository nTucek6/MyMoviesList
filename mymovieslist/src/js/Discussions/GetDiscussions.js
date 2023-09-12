import axios from "axios";
import config from './../../config.json';

export default async function GetDiscussions({setDiscussions,page,PostPerPage}) {
   
           await axios({
                method: "get",
                url: config.SERVER_URL + "Discussions/GetDiscussions",
                headers: { 'Content-Type': 'application/json' },
                params:{
                    PostPerPage:PostPerPage,
                    Page:page
                }
            })
                .then(function (response) {
                    setDiscussions(prevData => [...prevData, ...response.data]);
    
                })
                .catch(function (response) {
                    console.log(response);
                });
        }