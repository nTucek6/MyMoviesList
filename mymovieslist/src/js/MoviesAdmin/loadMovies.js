import config from './../../config.json';
import axios from "axios";

export default async function LoadMovies({ movies, setMovies, setIsCompleted,postPerPage,page,search }) {
    await axios({
        method: "get",
        url: config.SERVER_URL + "MoviesAdmin/GetMovies",
        headers: { 'Content-Type': 'application/json' },
        params: {
            PostPerPage: postPerPage,
            Page: page,
            Search: search
        }
    })
        .then(function (response) {
            if (response) {
                setMovies([
                    ...movies,
                    ...response.data
                ]);
                setIsCompleted(true);
            }
        })
        .catch(function (response) {
            console.log(response);
        });
}