import { useEffect, useRef } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { format } from 'date-fns'

import GetPersonInfo from "../../js/PersonInfo/GetPersonInfo";
import GetPersonActorRoles from "../../js/PersonInfo/GetPersonActorRoles";


export default function PersonInfo() {
    const location = useLocation();
    const personId = location.state;
    const shouldLoadData = useRef(true);
    const navigate = useNavigate();

    const [person, setPerson] = useState(null);
    const [personActorRoles, setPersonActorRoles] = useState([]);

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            GetPersonInfo({ setPerson, personId });
            GetPersonActorRoles({ setPersonActorRoles, personId });
        }
    }, []);

    const imageStyle =
    {
        width: '200px',
        height: '300px'
    };

    if (person === null) return null;


    const toMovieInfo = (link, data) => {
        sessionStorage.setItem("movieName",data.movieName);
        navigate(link, { state: data.id });
      }

    return (
        <>
            <div className="container">
                <div className="row container m-0 p-0">
                    <div className="col-md-3 border border-start-0 border-top-0 border-bottom-0 ">
                        <div>
                            <img style={imageStyle} src={"data:image/png;base64," + person.personImageData} />
                        </div>
                        <div className="mt-2">
                            <small>Name: {person.firstName} {person.lastName}</small>
                        </div>
                        <div className="mt-2">
                            <small>Birth date: {format(new Date(person.birthDate), 'dd.MM.yyyy')}</small>
                        </div>
                        <div className="mt-2">
                            <small>Birth place: {person.birthPlace}</small>
                        </div>

                    </div>

                    <div className="col-md-9 ">

                        <div className="row">
                            <div className="col-6">
                                <h6>Actor</h6>
                            </div>
                            <hr className="mt-0" />
                            {
                                personActorRoles.map((movie, index) => {
                                    return (
                                        <div className={index === 0 ? "row mt-0" : "row mt-1"} key={movie.id} style={{ cursor: "pointer" }} onClick={()=> toMovieInfo('/movie/' + movie.movieName, movie)} >
                                            <div className="col-md-1"><img className="img-fluid img-thumbnail" src={"data:image/png;base64," + movie.movieImageData} alt="" /> </div>
                                            <div className="col-md-11">
                                                <div className="card-body">
                                                    <div className="card-title">
                                                        <h5>Movie name: {movie.movieName}</h5>
                                                    </div>
                                                    <h6>Character name: {movie.characterName}</h6>
                                                </div>
                                            </div>
                                            <hr className=" mt-1" />
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <h6>Director</h6>
                            </div>
                            <hr className="mt-0" />
                            {//here goes content
                            }
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <h6>Actor</h6>
                            </div>
                            <hr className="mt-0" />
                            {//here goes content
                            }
                        </div>
                    </div>
                </div>

            </div>



        </>
    );
}