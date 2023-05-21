import { useState } from "react";
import config from './../../config.json';
import axios from "axios";
import { useEffect } from "react";

export default function GetUserBio({ username }) {
    const [Bio, setBio] = useState(null);

    useEffect(() => {
        GetBioData();
    }, []);

    async function GetBioData() {
        await axios({
            method: "get",
            url: config.SERVER_URL + "Profile/GetUserBio",
            headers: { 'Content-Type': 'application/json' },
            params: { 
                username:username 
            }
        })
            .then(function (response) {
                if (response) {
                    setBio(response.data);
                }
            })
            .catch(function (response) {
                console.log(response);
            });
    }

    if (Bio !== null && Bio !== "") {
        return (
            <div className="col mb-5">
                <h6 className="">About user</h6>
                <hr className="mt-0" />
                <p>{Bio}</p>
                <hr className="" />
            </div>
        );
    }
    else {
        return null;
    }

}