import axios from "axios";
import config from './../../config.json';

export default async function GetPersonActorRoles({setPersonActorRoles,personId,postperpage,page})
    {
    await axios({
        method: "get",
        url: config.SERVER_URL + "PersonInfo/GetPersonActorRoles",
        headers: { 'Content-Type': 'application/json' },
        params:{
            personId:personId
        }
         })
        .then(function (response) {
            if(response.data !== null && response.data !== "")
            {
                setPersonActorRoles(response.data);
            }
           
        })
        .catch(function (response) {
          console.log(response);
        });   
    }