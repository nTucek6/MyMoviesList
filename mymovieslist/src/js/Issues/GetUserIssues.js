import config from './../../config.json';
import axios from "axios";

export default async function GetUserIssues({Issues,setIssues,setIsCompleted,postPerPage,page,search}) {

    await axios({
        method: "get",
        url: config.SERVER_URL + "UserSupport/GetUserIssues",
        headers: { 'Content-Type': 'application/json' },
        params: {
            PostPerPage: postPerPage,
            Page: page,
            Search: search
        }
    })
        .then(function (response) {
            //console.log(response);
            setIssues([
                ...Issues,
                ...response.data
            ]);
            setIsCompleted(true);
        })
        .catch(function (response) {
            console.log(response);
        });
}