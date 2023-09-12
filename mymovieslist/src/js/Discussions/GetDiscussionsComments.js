import config from '../../config.json';
import axios from "axios";

export default async function GetDiscussionComments({setComments,discussionId,PostPerPage,Page})
{
    await axios({
        method: "get",
        url: config.SERVER_URL + "Discussions/GetDiscussionsComments",
        headers: { 'Content-Type': 'application/json' },
        params: {
            discussionId: discussionId,
            PostPerPage: PostPerPage,
            Page:Page
        }
    })
        .then(function (response) {
            if(response.data !== null && response.data !== "")
            {
                setComments(prevData => [...prevData, ...response.data]);
            }
         // console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });

}