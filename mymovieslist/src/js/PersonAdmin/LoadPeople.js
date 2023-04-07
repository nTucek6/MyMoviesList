import config from './../../config.json';
import axios from "axios";

export default async function LoadPeople({ people, setPeople, setIsCompleted,postPerPage,page,search })
{
    await axios({
        method: "get",
        url: config.SERVER_URL + "PersonAdmin/GetPeople",
        headers: { 'Content-Type': 'application/json' },
        params: {
            PostPerPage: postPerPage,
            Page: page,
            Search: search
        }
    })
        .then(function (response) {
            if (response) {
                setPeople([
                    ...people,
                    ...response.data
                ]);
                setIsCompleted(true);
            }
        })
        .catch(function (response) {
            console.log(response);
        });

}