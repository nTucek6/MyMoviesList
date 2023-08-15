import { useEffect, useState } from "react";
import Select from 'react-select'
import SubmitInquiry from "../../js/UserSupport/SubmitInquiry";
import GetSupportInquiry from "../../js/UserSupport/GetSupportInquiry";

export default function UserSupport() {

    const [email, setEmail] = useState(null);
    const [issue, setIssue] = useState(null);
    const [inquiry,setInquiry] = useState(null)
    const [inquiryoptions,setInquiryoptions] = useState([])

    useEffect(() => {
            GetSupportInquiry({ setInquiryoptions });
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        SubmitInquiry({email,issue,inquiry});
    }
    return (
        <>
            <div className="container w-50 border p-5 shadow">
                <h3 className="text-center">Contact support</h3>

                <hr></hr>
            
                <form onSubmit={handleSubmit} className="mt-5" >
                    <div className="form-group  mb-2">
                        <input className="form-control " onChange={d => setEmail(d.target.value)} placeholder="Email" required />
                    </div>
                    <div className="form-group  mb-2">
                        <Select options={inquiryoptions}
                            placeholder="Select Inquiry"
                            onChange={d => setIssue(d.value) }
                            required
                        />
                    </div>
                    <div className="form-group mb-2">
                        <textarea className="form-control" onChange={d => setInquiry(d.target.value)} placeholder="Inquiry" required ></textarea>
                    </div>

                    <button type="submit" className="btn btn-outline-info">Submit</button>
                </form>
               
            </div>
        </>
    );
}