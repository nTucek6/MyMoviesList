import config from './../../config.json';
import axios from "axios";

export default async function SubmitInquiry({email,issue,inquiry,ClearData,notify}) {

    await axios({
        method: "post",
        url: config.SERVER_URL + "UserSupport/SubmitInquiry",
        headers: { 'Content-Type': 'application/json' },
        data:
        {
            Email: email,
            IssueType:issue.value,
            InquiryText:inquiry
        }
    })
        .then(function (response) {
           // console.log(response);
            ClearData();
            notify();
            
        })
        .catch(function (response) {
            console.log(response);
        });
}