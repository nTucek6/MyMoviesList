import axios from "axios";
import config from '../../config.json';

export default async function GetPersonDirectorRoles({setPersonDirectorRoles,personId,postperpage,page})
    {
    await axios({
        method: "get",
        url: config.SERVER_URL + "PersonInfo/GetPersonDirectorRoles",
        headers: { 'Content-Type': 'application/json' },
        params:{
            personId:personId
        }
         })
        .then(function (response) {
            setPersonDirectorRoles(response.data);
        })
        .catch(function (response) {
          console.log(response);
        });   
    }