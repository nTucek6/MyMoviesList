import { useEffect, useState } from "react"
import GetMovieActors from "../../js/MovieInfo/GetMovieActors"
import { useNavigate, useParams } from "react-router-dom";

export default function AllActors() {

    const { id } = useParams();

    //const location = useLocation();
    const movieId = id;
    const navigate = useNavigate();
    const [movieActors, setMovieActors] = useState([]);
    const postperpage = 0;
    const page = 0;

    useEffect(() => {

        GetMovieActors({ setMovieActors, movieId, page, postperpage });
    }, []);

    return (<>
        <div className="container">
            <h6>All Characters & Actors</h6>
            <hr />
            {
                movieActors.map((actor, index) => {
                    return (
                        <div className={index === 0 ? "row mt-0" : "row mt-1"} key={actor.id} style={{ cursor: "pointer" }} onClick={() => navigate("/person/" + actor.id + "/" + actor.firstName + " " + actor.lastName)}>
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