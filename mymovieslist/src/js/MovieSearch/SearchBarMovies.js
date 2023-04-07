import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchBarMovies() {


    return (
        <div className="mb-5">
            <div className="input-group d-flex justify-content-center">
                <div className="form-outline w-50">
                    <input type="search" id="form1" className="form-control" placeholder="Search movies" />
                </div>
                <button type="button" className="btn btn-primary">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    );

}