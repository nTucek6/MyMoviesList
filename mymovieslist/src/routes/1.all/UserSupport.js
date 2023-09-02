import { useEffect, useState } from "react";
import Select from 'react-select'
import SubmitInquiry from "../../js/UserSupport/SubmitInquiry";
import GetSupportInquiry from "../../js/UserSupport/GetSupportInquiry";
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

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

        if(validate())
        {
            SubmitInquiry({ email, issue, inquiry, ClearData, notify });
        }

        
        setIsSubmitCompleted(false);
    }

    function ClearData() {
        setEmail("");
        setIssue(null);
        setInquiry("");
    }

    const validate = () => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!email) {
           setError("Email is required!");
            return false;

        }
        else if (!regex.test(email)) {
            setError("Email is invalid!");
            return false;
        }
        return true;
    }


    const notify = () => toast("Successfully submited!");


    return (
        <>
            <div className="container w-50 border p-5 shadow">
                <h3 className="text-center">Contact support</h3>
                <hr></hr>
                {
                    error !== "" ?

                        <div className="border mb-3 p-3">
                            <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#ff0000", }} className="d-inline" />
                            <p className="d-inline"> {error}</p>
                        </div>
                        :
                        null
                }
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
            <ToastContainer
               position="top-center"
               autoClose={1500}
               hideProgressBar={false}
               newestOnTop={true}
               rtl={false}
               pauseOnFocusLoss
               draggable = {false}
               pauseOnHover={false}
            />
        </>
    );
}