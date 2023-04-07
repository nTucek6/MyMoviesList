import config from './../../config.json';
import axios from "axios";
import jwt_decode from "jwt-decode";
import getToken from '../token/gettoken';

export default async function AddDiscussion({discussionTitle,discussion})
{
    const token = getToken();
    const Id = jwt_decode(token).Id;

    await axios({
        method: "get",
        url: config.SERVER_URL + "Discussions/AddDiscussion",
        headers: { 'Content-Type': 'application/json' },
        params: {
            discussionTitle: discussionTitle,
            discussion: discussion,
            UserId:Id
        }
    })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });

}