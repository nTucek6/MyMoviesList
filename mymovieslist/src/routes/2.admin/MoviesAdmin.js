import ShowModal from '../../js/modal/modal';
import customStyles from '../../js/MoviesAdmin/customStyles';
import MovieModalData from '../../js/MoviesAdmin/addMovieData';
import LoadMovies from '../../js/MoviesAdmin/loadMovies';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import GetMoviesCount from '../../js/MoviesAdmin/GetMoviesCount';

export default function MoviesAdmin()
{
    const [movies, setMovies] = useState([]);
    const [moviesCount,setMoviesCount] = useState(null);

    const postPerPage = 10;
    const [search, setSearch] = useState(null);
    const [page, setPage] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);

    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        GetMoviesCount({setMoviesCount});
        LoadMovies({movies,setMovies,setIsCompleted,postPerPage,page,search});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        LoadMovies({ movies, setMovies, setIsCompleted, postPerPage, page, search });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {

        setTimeout(() => {
            LoadMovies({ movies, setMovies, setIsCompleted, postPerPage, page, search });
        }, 400);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const Search = (data) => {
        setMovies([]);
        setSearch(data);
        setPage(1);
    }

    const LoadMore = () => {
        setIsCompleted(false);
        setPage(page + 1);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const LoadMoreButton = () =>
    {
        if(moviesCount === movies.length)
        {
            return(<button onClick={LoadMore} type="button" className="btn btn-danger" disabled> Load More</button>)
        }
        else
        {
            return(<button onClick={LoadMore} type="button" className="btn btn-danger">Load More</button>)
        }
    }

 
    return (
        <>
            <div className="container">

                <div className="row" >
                    <div className="form-group col-xs-3 col-md-3">
                        <button className="btn btn-primary " onClick={openModal}>Add movie</button>
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="form-group col-xs-3 col-md-4">
                        <input type="search" className="form-control mb-2" placeholder="Search..." onChange={s => Search(s.target.value)} />
                    </div>
                   
                </div>
        
                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-condensed table-striped">
                        <thead>
                            <tr>
                                <th>Rbr.</th>
                                <th>Movie title</th>
                                <th>Genres</th>
                                <th>Duration</th>
                                <th>Actors</th>
                                <th>Director</th>
                                <th>Writers</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie, index) => {
                                return (
                                    <tr key={movie.id}>
                                        <td>{index + 1}</td>
                                        <td>{movie.moviename}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center">
                    {isCompleted ? (
                        <LoadMoreButton />
                    ) : (
                        <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="#4fa94d"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />

                    )}
                </div>

                <ShowModal modalIsOpen={modalIsOpen} closeModal={closeModal} customStyles={customStyles} ModalData={() => MovieModalData({ setIsOpen })} text={"Add new movie"} />
        </div>
        </>
    );
}