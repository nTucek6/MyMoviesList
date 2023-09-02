import Error404 from "../../img/404error.jpg"; 

export default function NotFound()
{
    return (
        <>
        <div className="container text-center">
            <img className="float-center" src={Error404} />
        </div>
        </>
    )
}