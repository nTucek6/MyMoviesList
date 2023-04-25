import { useState, useEffect, useRef } from "react";
import config from './../../config.json';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GetGenres() {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    const shouldLoadData = useRef(true);

    useEffect(() => {

        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            console.log("Hello world");
            axios({
                method: "get",
                url: config.SERVER_URL + "MoviesAdmin/GetGenres",
                headers: { 'Content-Type': 'application/json' },
            })
                .then(function (response) {
                    setGenres(response.data);
                })
                .catch(function (response) {
                    console.log(response);
                });
        }


    }, []);


    if (genres.length > 0) {
        const toGenre = (link, data) => {
            sessionStorage.setItem('genre', data.label)
            navigate(link, { state: data });
        }
        return (
            <>
                {genres.map(genre => {
                    return (
                        <div className="col mb-3" key={genre.value}>
                            <div style={{ cursor: "pointer" }} onClick={() => toGenre('genre/' + genre.label, genre)}>
                                <h5>{genre.label}</h5>
                            </div>
                        </div>
                    )
                })
                }
            </>);
    }


}