import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GetSearchData from '../../js/navigation/GetSearchData';

export default function SearchResult() {

    const { type, search } = useParams();
    const [SearchData, setSearchData] = useState([]);
    const [Search,setSearch]= useState("");
    const navigate = useNavigate();
   
    useEffect(()=>{
        if (search !== undefined) {

            GetSearchData({ setSearchData, search, type })
        } 
    },[type,search])


    const handleSubmit = () => {
        const search = Search;
        console.log(Search);
        setSearchData([]);
        if (Search !== "") {

            GetSearchData({ setSearchData, search, type })
        }
    }

    const navigateToInfo = (data) => {
        if (data.type === "movie") {
            navigate('/movie/' + data.id + '/' + data.name);
        }
        else if (data.type === "person") {
            navigate("/person/" + data.id + '/' + data.name);
        }
    }

    return (
        <>
            <div className='container'>
                <div className="mb-5">
                    <div className="input-group d-flex justify-content-center">
                        <div className="form-outline w-50">
                            <input type="search" id="form1" className="form-control" placeholder="Search..." defaultValue={search} onChange={e=>setSearch(e.target.value)}  />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>

                <div className="row ">
                    <h6 className="col-6">Search result</h6>
                    <hr />
                    {
                                SearchData.map((data, index) => {
                                    return (     
                                    <div className={index=== 0 ? "row" : "row mt-2"} key={index}>
                                    <img className="img-fluid img-thumbnail col-2" style={{width:"70px",height:"90px"}} src={"data:image/png;base64," + data.searchImageData } alt="" />
                                    <h6 className="col" style={{cursor:"pointer"}} onClick={() => navigateToInfo(data)}>{data.name}</h6>
                                   </div>
                                    )
                                })
                            }
                </div>



            </div>
        </>
    );
}

//onClick={() => navigateToInfo(data)}