import config from '../../config.json';
import axios from "axios";

export default async function GetSearchUsers({ setSearchData,search })
{
    await axios({
        method: "get",
        url: config.SERVER_URL + "Profile/SearchUsers",
        headers: { 'Content-Type': 'application/json' },
        params:{
            Search : search,
        },
    })
        .then(function (response) {
            if (response) {
                setSearchData(response.data);
            }
        })
        .catch(function (response) {
            console.log(response);
        });

}