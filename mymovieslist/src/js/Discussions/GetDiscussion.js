import config from '../../config.json';
import axios from "axios";

export default async function GetDiscussion({setDiscusion,discussionId})
{
    await axios({
        method: "get",
        url: config.SERVER_URL + "Discussions/GetDiscussion",
        headers: { 'Content-Type': 'application/json' },
        params: {
            DiscussionId: discussionId
        }
    })
        .then(function (response) {
          setDiscusion(response.data);
          console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });

}