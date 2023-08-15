import config from './../../config.json';
import axios from "axios";

export default async function GetSupportInquiry({setInquiryoptions}) {

    await axios({
        method: "get",
        url: config.SERVER_URL + "UserSupport/GetUserInquirySelect",
        headers: { 'Content-Type': 'application/json' },
   
    })
        .then(function (response) {
            //console.log(response);
            setInquiryoptions(response.data);
            //notify();
        })
        .catch(function (response) {
            console.log(response);
        });
}