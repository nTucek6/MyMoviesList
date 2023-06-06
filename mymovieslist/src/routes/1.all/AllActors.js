import { useEffect, useState } from "react"
import GetMovieActors from "../../js/MovieInfo/GetMovieActors"
import { useLocation, useNavigate } from "react-router-dom";

export default function AllActors() {
    const location = useLocation();
    const movieId = location.state;
    const navigate = useNavigate();
    const [movieActors, setMovieActors] = useState([]);
    const postperpage = 0;
    const page = 0;

    console.log(movieId);

    useEffect(() => {

        GetMovieActors({ setMovieActors, movieId, page, postperpage });
    }, []);

    const toPersonInfo = (link, data) => {
        sessionStorage.setItem("person", data.firstName + " " + data.lastName);
        navigate(link, { state: data.id });
    }

    return (<>
        <div className="container">
            {
                movieActors.map((actor, index) => {
                    return (
                        <div className={index === 0 ? "row mt-0" : "row mt-1"} key={actor.id} style={{ cursor: "pointer" }} onClick={() => toPersonInfo("/person/" + actor.firstName + " " + actor.lastName, actor)}>
                            <div className="col-md-1"><img className="img-fluid img-thumbnail" src={"data:image/png;base64," + actor.personImageData} alt="" /> </div>
                            <div className="col-md-11">
                                <div className="card-body">
                                    <div className="card-title">
                                        <h5>Character name: {actor.characterName}</h5>
                                    </div>
                                    <h6>Actor name: {actor.firstName} {actor.lastName}</h6>
                                </div>
                            </div>
                            <hr className=" mt-1" />
                        </div>
                    )
                })
            }
        </div>
    </>)
}