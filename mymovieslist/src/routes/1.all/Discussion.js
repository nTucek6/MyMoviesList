import { useLocation } from "react-router-dom";
import { format } from 'date-fns'

export default function Discussion() {
    const location = useLocation();

    const data = location.state;

    return (
        <>
            <div className="container">
                <h6>Time created: {format(new Date(data.timePosted), 'dd.MM.yyyy HH:mm:ss')}</h6>
                <hr />
                <h5 className="mb-3">Discussion title: {data.title}</h5>
                <p>{data.discussion}</p>

                <h6 className="mt-5">Comments</h6>
                <hr />

            </div>
        </>
    );

}