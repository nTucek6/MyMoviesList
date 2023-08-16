import config from '../../config.json';
import axios from "axios";

export default async function GetMyDiscussionsCount({setMyDiscusionsCount,UserId})
{
    await axios({
        method: "get",
        url: config.SERVER_URL + "Discussions/GetMyDiscussionsCount",
        headers: { 'Content-Type': 'application/json' },
        params: {
            UserId: UserId
        }
    })
        .then(function (response) {
         setMyDiscusionsCount(response.data);
        })
        .catch(function (response) {
            console.log(response);
        });

}