import config from './../../config.json';
import axios from "axios";

export default async function LoadPeople({ people, setPeople, setIsCompleted,postPerPage,page,search })
{
   let cancel;

    await axios({
        method: "get",
        url: config.SERVER_URL + "PersonAdmin/GetPeople",
        headers: { 'Content-Type': 'application/json' },
        params: {
            PostPerPage: postPerPage,
            Page: page,
            Search: search
        },
        //cancelToken : new axios.CancelToken(c => cancel = c)
    })
        .then(function (response) {
                setPeople([
                    ...people,
                    ...response.data
                ]);
                setIsCompleted(true);
        })
        .catch(function (response) {
            //if(axios.isCancel(cancel)) return
            console.log(response);
        });


}