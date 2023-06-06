import config from '../../config.json';
import axios from "axios";

export default async function WriteComment({comment,discussionId,userId})
{
    await axios({
        method: "post",
        url: config.SERVER_URL + "Discussions/AddDiscussionComment",
        headers: { 'Content-Type': 'application/json' },
        data: {
            DiscussionId: discussionId,
            Comment: comment,
            UserId:userId
        }
    })
        .then(function (response) {
         
          console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });

}