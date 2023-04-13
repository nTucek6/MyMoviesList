import config from './../../config.json';
import axios from "axios";

export default async function UpdatePerson({ Person }) {
   
    await axios({
        method: "POST",
        url: config.SERVER_URL + "PersonAdmin/SavePerson",
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: Person
    })
        .then(function (response) {
            console.log(response);
          
        })
        .catch(function (response) {
            console.log(response);
        });

}