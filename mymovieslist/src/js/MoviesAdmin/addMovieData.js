import Select from 'react-select'
import { useEffect, useState } from 'react';
import GetGenresAPI from './getGenres';
import UpdateMovie from './UpdateMovie';

const MovieModalData = ({ setIsOpen }) => {

    const [MovieName, setMovieName] = useState(null);
    const [Duration, setDuration] = useState(0);
    const [Synopsis, setSynopsis] = useState(null);
    const [ReleaseDate, setReleaseDate] = useState(null);
    const [Genres, setGenres] = useState([]);
    const [Director, setDirector] = useState([]);
    const [Writers, setWriters] = useState([]);
    const [Actors, setActors] = useState([]);
    const [MovieImageURL, setMovieImageURL] = useState(null);


    const [GetGenres, setGetGenres] = useState([]);
    const [GetDirector, setGetDirector] = useState([]);
    const [GetWriters, setGetWriters] = useState([]);
    const [GetActors, setGetActors] = useState([]);

    useEffect(() => {
        GetGenresAPI({ setGetGenres });
    }, []);

    useEffect(() => {
      if(Genres.length > 0)
        console.log(Genres);

    }, [Genres]);

    const handleSubmit = async e => {
        e.preventDefault();
        await UpdateMovie({
            MovieName,
            Duration,
            Synopsis,
            ReleaseDate,
            Genres,
            Director,
            Writers,
            Actors,
            MovieImageURL
        }).then(function (response) {

        });
    }

   
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <input type="text" placeholder="Movie title" className="form-control" onChange={d => setMovieName(d.target.value)} />
                </div>

                <div className="form-group mb-2">
                    <input type="text" className="form-control" placeholder="Duration" onChange={d => setDuration(d.target.value)} />
                </div>

                <div className="form-group mb-2">
                    <textarea className="form-control" placeholder="Synopsis" onChange={d => setSynopsis(d.target.value)}></textarea>
                </div>

                <div className="form-group mb-2">
                    <input type="date" className="form-control" placeholder="Release date" onChange={d => setReleaseDate(d.target.value)} />
                </div>

                <div className="form-group mb-2" >
                    <Select
                        options={GetGenres}
                        isMulti
                        name="genres"
                        placeholder="Select genres"
                        onChange={d => setGenres(d.map(x => x.value))}
                    />
                </div>

                <div className="form-group mb-2">
                    <Select
                        options={GetDirector}
                        isMulti
                        name="director"
                        placeholder="Select director"
                        onChange={d => setDirector(d)}
                    />
                </div>

                <div className="form-group mb-2">
                    <Select
                        options={GetWriters}
                        isMulti
                        name="writers"
                        placeholder="Select writers"
                        onChange={d => setWriters(d)} 
                    />
                </div>

                <div className="form-group mb-2">
                    <Select
                        options={GetActors}
                        isMulti
                        name="actors"
                        placeholder="Select actors"
                        onChange={d => setActors(d)}  
                    />
                </div>

                <div className="form-group mb-2">
                    <input type="file" className="form-control" />
                </div>

                <hr />

                <div className="mt-2 d-flex flex-row-reverse">
                    <button type='submit' className="btn btn-outline-danger mt-3 p-2">Add person</button>
                    <button className="btn btn-outline-danger mt-3 p-2" onClick={() => setIsOpen(false)}>Close</button>
                </div>

            </form>

        </>
    );
}
export default MovieModalData