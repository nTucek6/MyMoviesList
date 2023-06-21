import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBarMovies() {

    const [search,setSearch] = useState("");

    const navigate = useNavigate();
    
    const handleSearch = () => {
        navigate("/searchresult/movies/" + search);
    }

    return (
        <div className="mb-5">
            <div className="input-group d-flex justify-content-center">
                <div className="form-outline w-50">
                    <input type="search" id="form1" className="form-control" placeholder="Search movies" onChange={s=>setSearch(s.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    );

}