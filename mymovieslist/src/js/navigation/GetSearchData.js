import config from '../../config.json';
import axios from "axios";

export default async function GetSearchData({ setSearchData,search,type })
{
    await axios({
        method: "get",
        url: config.SERVER_URL + "MovieSearch/SearchBar",
        headers: { 'Content-Type': 'application/json' },
        params:{
            Search : search,
            type : type
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