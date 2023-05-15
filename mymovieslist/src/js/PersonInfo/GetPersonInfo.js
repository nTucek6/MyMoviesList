import axios from "axios";
import config from './../../config.json';

export default async function GetPersonInfo({setPerson,personId})
    {
    await axios({
        method: "get",
        url: config.SERVER_URL + "PersonInfo/GetPersonInfo",
        headers: { 'Content-Type': 'application/json' },
        params:{
            personId:personId
        }
         })
        .then(function (response) {
            setPerson(response.data);
        })
        .catch(function (response) {
          console.log(response);
        });   
    }