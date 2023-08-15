import config from './../../config.json';
import axios from "axios";

export default async function SubmitInquiry({email,issue,inquiry}) {

    await axios({
        method: "post",
        url: config.SERVER_URL + "UserSupport/SubmitInquiry",
        headers: { 'Content-Type': 'application/json' },
        data:
        {
            Email: email,
            IssueType:issue,
            InquiryText:inquiry
        }
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
}