import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import GetSearchData from './GetSearchData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {

    const [SearchData, setSearchData] = useState([]);
    const [type,setType] = useState("all");
    const [isFocus,setIsFocus] = useState(false);
    const [search,setSearch] = useState("")
  
    const navigate = useNavigate();

    const handleChange = s => {
        const search = s.target.value;
        setSearchData([]);
        if (search !== "") {
           
            GetSearchData({ setSearchData, search,type })
        }
    }

    useEffect(()=>{
        if(isFocus === false)
        {
            setSearchData([]);
        }
        else
        {
            if(search.target.value !== "")
            {
                handleChange(search);
            }

        }

    },[isFocus])


    const handleInfo = (data) =>
    {
        if(data.type === "movie")
        {
            sessionStorage.setItem("movieName",data.name);
            navigate('/movie/' + data.name, { state: data.id });
        }
        else if(data.type === "person")
        {
            sessionStorage.setItem("person", data.name);
            navigate("/person/"+ data.name, { state: data.id });
        }

    }

    return (
        <>
            <div className="form-group navigation-select">
                <select className="form-select" onChange={t=>setType(t.target.value)}>
                    <option value="all" >All</option>
                    <option value="movies">Movies</option>
                    <option value="people">People</option>
                </select>
            </div>
            <div className="form-group navigation-input">
                <input type="search" className="form-control" placeholder="Search.." onChange={handleChange} onFocus={s=>{setIsFocus(true);setSearch(s)}} onBlur={()=>setIsFocus(false)} />
                <ul className='list-group search-bar'>
                    {
                        SearchData.map((data,index) => {
                            return (<div className=''  key={index}>
                                 {
                                    // <img className='rounded d-inline' style={{width:"30px",height:"30px"}} src={"data:image/png;base64," + data.searchImageData} />
                                 }
                                <button className='list-group-item list-group-item-action d-inline' onClick={()=>handleInfo(data)}>{data.name}</button>  
                            </div>
                            )
                        })
                    }
                </ul>
            </div>
            <button type="button" className="btn btn-primary">
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </>
    );
}