import { Link } from "react-router-dom"
import Select from 'react-select'
import { useEffect, useState } from 'react';
import GetGenresAPI from "../../js/MoviesAdmin/getGenres";
import UpdateMovie from "../../js/MoviesAdmin/UpdateMovie";
import previewImage from '../../img/preview.jpg';
import GetPeopleSelect from "../../js/MoviesAdmin/GetPeopleSelect";
import { useNavigate,useLocation } from 'react-router-dom';
import CRUDLoading from "../../js/modal/loading";

export default function AddEditMovie() {

    const navigate = useNavigate();
    const [text, setText] = useState("Add movie");

    const [Id, setId] = useState(0);
    const [MovieName, setMovieName] = useState("");
    const [Duration, setDuration] = useState("");
    const [Synopsis, setSynopsis] = useState("");
    const [ReleaseDate, setReleaseDate] = useState("");
    const [Genres, setGenres] = useState([]);
    const [Director, setDirector] = useState([]);
    const [Writers, setWriters] = useState([]);
    const [Actors, setActors] = useState([]);

    const [GetGenres, setGetGenres] = useState([]);
    const [GetDirector, setGetDirector] = useState([]);
    const [GetWriters, setGetWriters] = useState([]);
    const [GetActors, setGetActors] = useState([]);

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const [loadingBar, setLoadingBar] = useState(false);

    const location = useLocation();
    const movie = location.state;

    useEffect(() => {
        GetGenresAPI({ setGetGenres });
        GetPeopleSelect({setGetDirector,setGetWriters,setGetActors})
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
    }, [selectedFile])


    useEffect(()=>{
        if(movie != null)
        {
            setText("Update movie");
            setId(movie.id);
            setMovieName(movie.movieName);
            setDuration(movie.duration);
            setReleaseDate(new Date(movie.releaseDate).toISOString().split('T')[0]);
            setSynopsis(movie.synopsis);
            setPreview("data:image/png;base64," + movie.movieImageData);

            setGenres(movie.genres);
           
            setDirector(movie.director.map(v=>{
                return({
                    value: v.id,
                    label: v.firstName + " " + v.lastName
                })
            }));

            setWriters(movie.writers.map(v=>{
                return({
                    value: v.id,
                    label: v.firstName + " " + v.lastName
                })
            }));

            setActors(movie.actors.map(v=>{
                return( {
                    value: v.id,
                    label: v.firstName + " " + v.lastName
                })
            }));
      
        }
    },[]);


    const imageStyle = {
        height:"400px",
        width:"300px",
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

        const Movie = new FormData();
        Movie.append("Id", Id);
        Movie.append("MovieName", MovieName);
        Movie.append("Duration", Duration);
        Movie.append("Synopsis", Synopsis);
        Movie.append("Genres", Genres.map(x=>x.value));
        Movie.append("ReleaseDate", ReleaseDate);
        Movie.append("Director", Director.map(x=>x.value));
        Movie.append("Writers", Writers.map(x=>x.value));
        Movie.append("Actors", Actors.map(x=>x.value));
        Movie.append("MovieImageData", selectedFile);

        await UpdateMovie({Movie}).then(function (response) 
        {
            ClearData();
            setLoadingBar(false);
        });
    }

    function ClearData()
    {
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
                    onChange={d => setMovieName(d.target.value)} />
                </div>

                <div className="form-group mb-2">
                    <input type="text" className="form-control" placeholder="Duration" 
                    value={Duration}
                    onChange={d => setDuration(d.target.value)} />
                </div>

                <div className="form-group mb-2">
                    <textarea className="form-control" placeholder="Synopsis" 
                    value={Synopsis}
                    onChange={d => setSynopsis(d.target.value)}></textarea>
                </div>

                <div className="form-group mb-2">
                    <input type="date" className="form-control" placeholder="Release date" 
                    value={ReleaseDate}
                    onChange={d => setReleaseDate(d.target.value)} />
                </div>

                <div className="form-group mb-2" >
                    <Select
                        isMulti
                        value={Genres}
                        name="genres"
                        placeholder="Select genres"
                        onChange={d => setGenres(d.map(x => x))}
                        options={GetGenres}
                    />
                </div>

                <div className="form-group mb-2">
                    <Select
                        isMulti
                        value={Director}
                        name="director"
                        placeholder="Select director"
                        onChange={d => setDirector(d.map(x => x))}
                        options={GetDirector}
                    />
                </div>

                <div className="form-group mb-2">
                    <Select
                        isMulti
                        value={Writers}
                        name="writers"
                        placeholder="Select writers"
                        onChange={d => setWriters(d.map(x => x))} 
                        options={GetWriters}
                    />
                </div>

                <div className="form-group mb-2">
                    <Select
                        value={Actors}
                        isMulti
                        name="actors"
                        placeholder="Select actors"
                        onChange={d => setActors(d.map(x => x))}  
                        options={GetActors}
                    />
                </div>

                <div className="form-group mb-2">
                    <input type="file" className="form-control" onChange={onSelectFile} />
                </div>

                
                <div className='d-flex justify-content-center mb-2'>
                  {(preview !== undefined) ?   <img src={preview} style={imageStyle} alt='preview' /> : <img src={previewImage} style={imageStyle} alt='preview' />}
                </div>

                <hr />

                <div className="mt-2 d-flex flex-row-reverse">
                    <button type='submit' className="btn btn-outline-danger mt-3 p-2">{text}</button>
                </div>
            </form>

            <CRUDLoading loadingBar={loadingBar} />
            </div>
        </>

    )



}