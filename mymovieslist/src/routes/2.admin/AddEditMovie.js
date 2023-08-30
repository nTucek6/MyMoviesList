import { Link } from "react-router-dom"
import Select from 'react-select'
import { useEffect, useRef, useState } from 'react';
import GetGenresAPI from "../../js/MoviesAdmin/getGenres";
import UpdateMovie from "../../js/MoviesAdmin/UpdateMovie";
import previewImage from '../../img/preview.jpg';
import GetPeopleSelectSearch from "../../js/MoviesAdmin/GetPeopleSelectSearch";
import { useLocation } from 'react-router-dom';
import CRUDLoading from "../../js/modal/loading";

export default function AddEditMovie() {

    const [text, setText] = useState("Add movie");
    const shouldLoadData = useRef(true);

    const [Id, setId] = useState(0);
    const [MovieName, setMovieName] = useState("");
    const [Duration, setDuration] = useState("");
    const [Synopsis, setSynopsis] = useState("");
    const [ReleaseDate, setReleaseDate] = useState("");
    const [Genres, setGenres] = useState([]);
    const [Director, setDirector] = useState([]);
    const [Writers, setWriters] = useState([]);
    const [Actors, setActors] = useState([]);

    const [ActorCharacter, setActorCharacter] = useState(null);

    const [GetGenres, setGetGenres] = useState([]);
    const [GetDirector, setGetDirector] = useState([]);
    const [GetWriters, setGetWriters] = useState([]);
    const [GetActors, setGetActors] = useState([]);

    // const [search, setSearch] = useState("");

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const [loadingBar, setLoadingBar] = useState(false);

    const location = useLocation();
    const movie = location.state;

    useEffect(() => {
        if (shouldLoadData.current) {
            shouldLoadData.current = false;
            GetGenresAPI({ setGetGenres });
        }

    }, []);

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile]);


    useEffect(() => {
        if (movie != null) {
            setText("Update movie");
            setId(movie.id);
            setMovieName(movie.movieName);
            setDuration(movie.duration);
            setReleaseDate(new Date(movie.releaseDate).toISOString().split('T')[0]);
            setSynopsis(movie.synopsis);
            setPreview("data:image/png;base64," + movie.movieImageData);

            setGenres(movie.genres);

            setDirector(movie.director.map(v => {
                return ({
                    value: v.id,
                    label: v.firstName + " " + v.lastName
                })
            }));

            setWriters(movie.writers.map(v => {
                return ({
                    value: v.id,
                    label: v.firstName + " " + v.lastName
                })
            }));

            setActors(movie.actors.map(v => {
                return ({
                    value: v.id,
                    label: v.firstName + " " + v.lastName
                })
            }));

            let list = {};
            movie.actors.map(v => {
                //  return {[v.id]: v.characterName};
                Object.assign(list, { [v.id]: v.characterName });
            });
            setActorCharacter(list);
        }
    }, [])



    const imageStyle = {
        height: "400px",
        width: "300px",
    }


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setLoadingBar(true);

        let list = convertObjectToArray();

        const actorList = Actors.map(actor => {
            let data = null;
            list.map(l => {
                if (actor.value == l.at(0)) {
                    data = {
                        ActorId: actor.value,
                        ActorCharacterName: l.at(1)
                    };
                }
            })
            if (data !== null) {
                return data;
            }

        });

        const Movie = new FormData();
        Movie.append("Id", Id);
        Movie.append("MovieName", MovieName);
        Movie.append("Duration", Duration);
        Movie.append("Synopsis", Synopsis);
        Movie.append("Genres", Genres.map(x => x.value));
        Movie.append("ReleaseDate", ReleaseDate);
        Movie.append("Director", Director.map(x => x.value));
        Movie.append("Writers", Writers.map(x => x.value));
        Movie.append("Actors", JSON.stringify(actorList));
        Movie.append("MovieImageData", selectedFile);

        await UpdateMovie({ Movie }).then(function (response) {
            ClearData();
            setLoadingBar(false);
        });
    }

    function ClearData() {
        setId(0);
        setMovieName("");
        setDuration("");
        setReleaseDate("");
        setSynopsis("");
        setSelectedFile(null);
        setDirector([]);
        setActors([]);
        setWriters([]);
        setGenres([])
    }

    const handleCharacterName = e => {
        setActorCharacter({ ...ActorCharacter, [e.name]: e.value });
    }

    const convertObjectToArray = () => {
        const arr = Object.entries(ActorCharacter);
        return arr;
    }

    const searchActors = search => {
        if (search !== "") {

            GetPeopleSelectSearch({ search }).then(response =>
                setGetActors(response)
            );
        }
    }

    const searchDirector = search => {
        if (search !== "") {

            GetPeopleSelectSearch({ search }).then(response =>
                setGetDirector(response),
            );
        }
    }

    const searchWriter = search => {
        if (search !== "") {

            GetPeopleSelectSearch({ search }).then(response =>
                setGetWriters(response)
            );
        }
    }

    return (
        <>
            <div className="container">
                <div>
                    <Link to='/moviesadmin/viewmovies' className="btn ">View movies</Link>
                    <Link to='/moviesadmin/addeditmovie' className="btn btn-primary">Add movie</Link>
                </div>
                <hr />

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <input type="text" placeholder="Movie title" className="form-control"
                            value={MovieName}
                            onChange={d => setMovieName(d.target.value)} required />
                    </div>

                    <div className="form-group mb-2">
                        <input type="text" className="form-control" placeholder="Duration"
                            value={Duration}
                            onChange={d => setDuration(d.target.value)} required />
                    </div>

                    <div className="form-group mb-2">
                        <textarea className="form-control" placeholder="Synopsis"
                            value={Synopsis}
                            onChange={d => setSynopsis(d.target.value)} required></textarea>
                    </div>

                    <div className="form-group mb-2">
                        <input type="date" className="form-control" placeholder="Release date"
                            value={ReleaseDate}
                            onChange={d => setReleaseDate(d.target.value)} required />
                    </div>

                    <div className="form-group mb-2" >
                        <Select
                            isMulti
                            value={Genres}
                            name="genres"
                            placeholder="Select genres"
                            onChange={d => setGenres(d.map(x => x))}
                            options={GetGenres}
                            required
                        />
                    </div>

                    <div className="form-group mb-2">
                        <Select
                            isMulti
                            value={Director}
                            name="director"
                            placeholder="Select director"
                            onChange={d => setDirector(d)}
                            onInputChange={s => searchDirector(s)}
                            options={GetDirector}
                            required
                        />
                    </div>

                    <div className="form-group mb-2">
                        <Select
                            isMulti
                            value={Writers}
                            name="writers"
                            placeholder="Select writers"
                            onChange={d => setWriters(d)}
                            onInputChange={s => searchWriter(s)}
                            options={GetWriters}
                            closeMenuOnSelect={false}
                            required
                        />
                    </div>

                    <div className="form-group mb-2">
                        <Select
                            value={Actors}
                            isMulti
                            name="actors"
                            placeholder="Select actors"
                            onChange={d => setActors(d)}
                            options={GetActors}
                            onInputChange={s => searchActors(s)}
                            closeMenuOnSelect={false}
                            required
                        />
                    </div>

                    <div className="form-group mb-2">
                        {
                            Actors.map(actor => {
                                let characterName = null;
                                if (movie !== null) {
                                    movie.actors.map(a => {
                                        if (a.id === actor.value) {
                                            characterName = a.characterName;
                                        }
                                    })
                                }
                                return (
                                    <div className="form-group row mb-2" key={actor.value}>
                                        <label htmlFor="actorName" className="col-sm-2 col-form-label">{actor.label}</label>
                                        <div className="col-sm-5">
                                            <input type="text"
                                                name={actor.value}
                                                defaultValue={characterName === null ? "" : characterName}
                                                className="form-control"
                                                placeholder="Character name"
                                                onChange={d => handleCharacterName(d.target)} required />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="form-group mb-2">
                        {movie !== null ?
                            <input type="file" className="form-control" accept=".jpg,.png,.jpeg" onChange={onSelectFile}/> :
                            <input type="file" className="form-control" accept=".jpg,.png,.jpeg" onChange={onSelectFile} required />}
                    </div>


                    <div className='d-flex justify-content-center mb-2'>
                        {(preview !== undefined) ? <img src={preview} style={imageStyle} alt='preview' /> : <img src={previewImage} style={imageStyle} alt='preview' />}
                    </div>

                    <hr />

                    <div className="mt-2 d-flex flex-row-reverse">
                        <button type='submit' className="btn btn-outline-info mt-3 p-2">{text}</button>
                    </div>
                </form>

                <CRUDLoading loadingBar={loadingBar} />
            </div>
        </>
    )
}