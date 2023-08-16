import ResolveIssue from "./ResolveIssue";

export default function IssueModalData({Issue,setIsOpen})
{
    const handleSubmit = async e => {
        e.preventDefault();
        const Id = Issue.id
        ResolveIssue({Id}).then(()=>{
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
                <p>Issue: {Issue.inquiryText}</p>
            </div>
            {
                !Issue.isResolved ?
                <button className="btn btn-outline-danger">Resolve</button>:
                <button className="btn btn-outline-danger" disabled>Resolve</button>
            }
           
        </form>

    </>)

}