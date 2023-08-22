import { useEffect, useState } from "react";
import Select from 'react-select'
import SubmitInquiry from "../../js/UserSupport/SubmitInquiry";
import GetSupportInquiry from "../../js/UserSupport/GetSupportInquiry";
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

export default function UserSupport() {

    const [email, setEmail] = useState("");
    const [issue, setIssue] = useState(null);
    const [inquiry, setInquiry] = useState("")
    const [inquiryoptions, setInquiryoptions] = useState([])

    const [error, setError] = useState("");

    const [isSubmitCompleted, setIsSubmitCompleted] = useState(false);

    useEffect(() => {
        GetSupportInquiry({ setInquiryoptions });
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitCompleted(true);
        SubmitInquiry({ email, issue, inquiry, ClearData, notify });
        setIsSubmitCompleted(false);
    }

    function ClearData() {
        setEmail("");
        setIssue(null);
        setInquiry("");
    }

    const notify = () => toast("Successfuly submited!");


    return (
        <>
            <div className="container w-50 border p-5 shadow">
                <h3 className="text-center">Contact support</h3>
                <hr></hr>
                <form onSubmit={handleSubmit} className="mt-5" >
                    <div className="form-group mb-2">
                        <input className="form-control "
                            onChange={d => setEmail(d.target.value)}
                            placeholder="Email"
                            value={email}
                            required />
                    </div>
                    <div className="form-group  mb-2">
                        <Select options={inquiryoptions}
                            placeholder="Select Inquiry"
                            onChange={d => setIssue(d)}
                            value={issue}
                            required
                        />
                    </div>
                    <div className="form-group mb-2">
                        <textarea className="form-control"
                            onChange={d => setInquiry(d.target.value)}
                            placeholder="Inquiry"
                            value={inquiry}
                            required ></textarea>
                    </div>
                    {isSubmitCompleted ? (
                        <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="#4fa94d"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    ) : (
                        <div className="row ps-3 pe-3">
                            <button type="submit" className="btn btn-outline-info col">Submit</button>
                        </div>   
                    )}
                </form>
            </div>
            <ToastContainer />
        </>
    );
}