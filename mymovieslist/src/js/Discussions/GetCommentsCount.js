import config from './../../config.json';
import axios from "axios";

export default async function GetCommentsCount({setCommentCount,discussionId})
{
    await axios({
        method: "get",
        url: config.SERVER_URL + "Discussions/GetCommentsCount",
        headers: { 'Content-Type': 'application/json' },
        params: {
            DiscussionId: discussionId,
        }
    })
        .then(function (response) {
          //console.log(response);
          setCommentCount(response.data);
        })
        .catch(function (response) {
            console.log(response);
        });

}