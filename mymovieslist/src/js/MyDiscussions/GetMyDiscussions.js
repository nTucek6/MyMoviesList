import config from '../../config.json';
import axios from "axios";

export default async function GetMyDiscussions({ MyDiscussions, setMyDiscusions, setIsCompleted, UserId, postPerPage, page, search }) {
    await axios({
        method: "get",
        url: config.SERVER_URL + "Discussions/GetMyDiscussions",
        headers: { 'Content-Type': 'application/json' },
        params: {
            UserId: UserId,
            PostPerPage: postPerPage,
            Page: page,
            Search:search
        }
    })
        .then(function (response) {
            setMyDiscusions([
                ...MyDiscussions,
                ...response.data]);
            setIsCompleted(true);
        })
        .catch(function (response) {
            console.log(response);
        });

}