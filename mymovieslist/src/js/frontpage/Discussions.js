import axios from "axios";
import { useEffect, useState, useRef } from "react";
import config from './../../config.json';
import { useNavigate } from "react-router-dom";
//import { ProgressBar } from 'react-loader-spinner';
import { format } from 'date-fns'

export default function Discussions() {
    const [Discussions, setDiscussions] = useState([]);
    const navigate = useNavigate();
    const PostPerPage = 5;
    const [Page,setPage] = useState(1);
   
    const shouldLoadData = useRef(true);

    useEffect(() => {

        if(shouldLoadData.current)
        {
            shouldLoadData.current = false;
            axios({
                method: "get",
                url: config.SERVER_URL + "Discussions/GetDiscussions",
                headers: { 'Content-Type': 'application/json' },
                params:{
                    PostPerPage:PostPerPage,
                    Page:Page
                },
              
            })
                .then(function (response) {
                    setDiscussions(response.data);
    
                })
                .catch(function (response) {
                    console.log(response);
                });
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (Discussions.length > 0) {
        const toDiscussion = (link, data) => {
            sessionStorage.setItem('user',data.user.username)
            navigate(link, { state: data });
        }
        return (
            <>
                {Discussions.map(discussion => {
                    return (
                        <div className="mb-2" key={discussion.id}>
                            <div style={{cursor:"pointer"}} onClick={() => toDiscussion('discussions/discussion/'+discussion.id+"/" + discussion.title, discussion)}>
                                <h5>{discussion.title}</h5>
                                <h6>User: {discussion.user.username}, posted: {format(new Date(discussion.timePosted), 'dd.MM.yyyy HH:mm:ss')}, comments: {discussion.commentsCount} </h6>
                            </div>
                        </div>
                    )
                })
                }
            </>);
    }
}
    
