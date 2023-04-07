import { useState,useEffect } from "react";
import Swiper from "./../../js/frontpage/swiper";
import Discussions from "../../js/frontpage/Discussions";
import axios from "axios";
import config from './../../config.json';
import { Link } from "react-router-dom";

export default function Frontpage() {
    const [RecentMovies, setRecentMovies] = useState(null);

    useEffect(() => {
       // LoadRecentMovies();
    }, []);

    async function LoadRecentMovies()
    {
    await axios({
        method: "post",
        url: config.SERVER_URL + "Frontpage/GetRecentMovies",
        headers: { "Content-Type": "multipart/form-data" },
         })
        .then(function (response) {
            setRecentMovies(response.data);
            //console.log(response);
        })
        .catch(function (response) {
          //handle error
          //console.log(response);
        });   
    }

    return (
        <>
        <div className="container">
            <div>
             <h6>Newly added</h6>
              <hr />
                    <Swiper RecentMovies={RecentMovies} />
             </div>

            <div className="mt-5">
             <div className="row ">
              <h6 className="col-6">Discussions</h6>
              <Link to="/discussions" className="col-6"><p className="float-end">View more</p></Link>
              <hr />
              <Discussions />
             </div>
           
            </div>
             
        </div>
        </>
    );

}