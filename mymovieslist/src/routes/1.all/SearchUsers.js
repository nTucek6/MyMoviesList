import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import GetSearchUsers from "../../js/SearchUsers/GetSearchUsers";
import DefaultAvatar from "../../img/DefaultAvatar.jpg";

export default function SearchUsers()
{
   
    const [SearchData, setSearchData] = useState([]);
    const [Search,setSearch]= useState("");
    const navigate = useNavigate();
   
    const handleSubmit = () => {
        const search = Search;
        setSearchData([]);
        if (Search !== "") {

            GetSearchUsers({ setSearchData, search })
        }
    }

    //DefaultAvatar 

    return (
        <>
            <div className='container'>
                <div className="mb-5">
                    <div className="input-group d-flex justify-content-center">
                        <div className="form-outline w-50">
                            <input type="search" id="form1" className="form-control" placeholder="Search users..." onChange={e=>setSearch(e.target.value)}  />
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
                                    <img className="img-fluid img-thumbnail col-2" style={{width:"70px",height:"90px"}} src={data.profileImageData == null ? DefaultAvatar : "data:image/png;base64," + data.profileImageData } alt="" />
                                    <h6 className="col" style={{cursor:"pointer"}} onClick={() => navigate("/profile/"+data.username)}>{data.username}</h6>
                                   </div>
                                    )
                                })
                            }
                </div>



            </div>
        </>
    );

  
}