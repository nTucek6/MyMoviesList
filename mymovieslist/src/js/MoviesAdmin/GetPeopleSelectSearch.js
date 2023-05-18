import config from './../../config.json';
import axios from "axios";

export default async function GetPeopleSelectSearch({search}) {

    let result = []
      await axios({
        method: "get",
        url: config.SERVER_URL + "MoviesAdmin/GetPeopleSelectSearch",
        headers: { 'Content-Type': 'application/json' },
        params: {search:search}
    })
        .then(function (response) {
            //setGetActors(response.data);
                result = response.data;
          //  console.log(response.data)
        })
        .catch(function (response) {
            console.log(response);
        });

        return result;
      
}