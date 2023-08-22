import ResolveIssue from "./ResolveIssue";

export default function IssueModalData({Issue,setIsOpen})
{
    const handleSubmit = async e => {
        e.preventDefault();
        const Id = Issue.id
        const email = Issue.email;
        ResolveIssue({Id,email}).then(()=>{
            setIsOpen(false);
            window.location.reload();
        });
       
        
    }


    return(<>
    <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
            <p>Email: {Issue.email}</p>
            </div>
            <div className="form-group mb-2">
                <p>Text: {Issue.inquiryText}</p>
            </div>
            <div className="row">

           
            {
                !Issue.isResolved ?
                <button className="btn btn-outline-info col">Resolve</button>:
                <button className="btn btn-outline-info col" disabled>Resolve</button>
            }
             </div>
           
        </form>

    </>)

}