import config from './../../config.json';
import axios from "axios";

export default async function GetPeopleCount({setPeopleCount}) {

    let cancel;

    await axios({
        method: "get",
        url: config.SERVER_URL + "PersonAdmin/GetPeopleCount",
        headers: { 'Content-Type': 'application/json' },
        cancelToken : new axios.CancelToken(c => cancel = c)
    })
        .then(function (response) {
            setPeopleCount(response.data);
        })
        .catch(function (response) {
            if(axios.isCancel(cancel)) return
            console.log(response);
        });
}