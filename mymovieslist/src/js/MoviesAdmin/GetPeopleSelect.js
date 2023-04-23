import config from './../../config.json';
import axios from "axios";

export default async function GetPeopleSelect({ setGetDirector, setGetWriters, setGetActors }) {

    await axios({
        method: "get",
        url: config.SERVER_URL + "MoviesAdmin/GetPeopleSelect",
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (response) {
            if (response) {
                setGetDirector(response.data);
                setGetWriters(response.data);
                setGetActors(response.data);
            }
        })
        .catch(function (response) {
            console.log(response);
        });



}