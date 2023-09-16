import axios from "axios";
import config from './../../config.json';

export default async function GetPersonWriterRoles({setPersonWriterRoles,personId,postperpage,page})
    {
    await axios({
        method: "get",
        url: config.SERVER_URL + "PersonInfo/GetPersonWriterRoles",
        headers: { 'Content-Type': 'application/json' },
        params:{
            personId:personId
        }
         })
        .then(function (response) {
            if(response.data !== null && response.data !== "")
            {
                setPersonWriterRoles(response.data);
            }
            
        })
        .catch(function (response) {
          console.log(response);
        });   
    }