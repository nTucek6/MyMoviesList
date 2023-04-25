import config from './../../config.json';
import axios from "axios";

export default async function LoadUsers({ users, setUsers, setIsCompleted, postPerPage, page, search }) {

    await axios({
        method: "get",
        url: config.SERVER_URL + "UsersAdmin/GetUsers",
        headers: { 'Content-Type': 'application/json' },
        params: {
            PostPerPage: postPerPage,
            Page: page,
            Search: search
        },
      
    })
        .then(function (response) {
            if (response) {
                setUsers([
                    ...users,
                    ...response.data
                ]);
                setIsCompleted(true);
            }
        })
        .catch(function (response) {
            console.log(response);
        });
}