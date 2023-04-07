import config from './../../config.json';
import axios from "axios";

export default async function UpdatePerson (Person)
{
    await axios({
        method: "post",
        url: config.SERVER_URL + "PersonAdmin/SavePerson",
        headers: { 'Content-Type': 'application/json' },
        data: Person
    })
        .then(function (response) {
            if (response) {
            
            }
        })
        .catch(function (response) {
            console.log(response);
        });

}