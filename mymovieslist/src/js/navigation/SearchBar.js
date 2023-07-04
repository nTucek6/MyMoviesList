//import '../../css/livesearch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import GetSearchData from './GetSearchData';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {

    const [SearchData, setSearchData] = useState([]);
    const [type, setType] = useState("all");
    const [isFocused, setIsFocused] = useState(false);
    const [Search, setSearch] = useState("");

    const navigate = useNavigate();

    const handleChange = s => {
        const search = s.target.value;
        setSearch(search);
        setSearchData([]);
        if (search !== "") {

            GetSearchData({ setSearchData, search, type })
        }
    }

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 300);
    };

    const navigateToInfo = (data) => {
        // console.log(data);
        if (data.type === "movie") {
           // sessionStorage.setItem("movieName", data.name);
            navigate('/movie/' + data.id + '/' + data.name);
        }
        else if (data.type === "person") {
           // sessionStorage.setItem("person", data.name);
            navigate("/person/" + data.id + '/' + data.name);
        }
    }

    return (
        <>
            <div className="form-group navigation-select">
                <select className="form-select" onChange={t => setType(t.target.value)}>
                    <option value="all" >All</option>
                    <option value="movies">Movies</option>
                    <option value="people">People</option>
                </select>
            </div>
            <div className="form-group navigation-input">
                <input type="search" className="form-control" placeholder="Search.." onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
                {
                    isFocused && SearchData.length > 0 &&
                    (
                        <ul className='list-group search-bar'>
                            {
                                SearchData.map((data, index) => {
                                    return (<div className='' key={index}>
                                        {
                                            // <img className='rounded d-inline' style={{width:"30px",height:"30px"}} src={"data:image/png;base64," + data.searchImageData} />
                                        }
                                        <button className='list-group-item list-group-item-action' onClick={() => navigateToInfo(data)}>{data.name}</button>

                                    </div>
                                    )
                                })
                            }
                        </ul>
                    )
                }

            </div>
            <button type="button" className="btn btn-primary" onClick={() => navigate("/searchresult/" + type + "/" + Search)}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </>
    );
}