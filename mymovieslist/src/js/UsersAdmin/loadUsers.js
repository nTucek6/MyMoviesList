import config from './../../config.json';
import axios from "axios";

export default  function LoadUsers({ users, setUsers, setIsCompleted, postPerPage, page, search }) {

    let cancel;

     axios({
        method: "get",
        url: config.SERVER_URL + "UsersAdmin/GetUsers",
        headers: { 'Content-Type': 'application/json' },
        params: {
            PostPerPage: postPerPage,
            Page: page,
            Search: search
        },
        cancelToken : new axios.CancelToken(c => cancel = c)
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
            if(axios.isCancel(cancel)) return

            console.log(response);
        });
}