import React, { useEffect, useState } from 'react';
import config from './../../config.json';
import { useNavigate } from 'react-router-dom'
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { ThreeDots } from 'react-loader-spinner';



function setToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
}


export default function Login() {

    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [isLoginCompleted, setIsLoginCompleted] = useState(false);
    const [LoginError, setLoginError] = useState("");

    const [FormErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    async function loginUser(credentials) {

        await axios({
            method: "post",
            url: config.SERVER_URL + "auth/Login/",
            headers: { 'Content-Type': 'application/json' },
            data: {
                Email: credentials.Email,
                Password: credentials.Password
            }
        })
            .then(function (response) {
                if (response) {
                    if (response.data != null || response.data != "") {
                        setToken(response.data);
                        navigate(0);
                    }
                }
            })
            .catch(function (error) {
                console.log(error.response.data.Message);
                if (error.response.data.Message === "User not found") {
                    setLoginError("User not found.");
                }
                else if (error.response.data.Message === "Invalid password") {
                    setLoginError("That password was incorrect. Please try again.");
                }
                else {
                    setLoginError("An error occurred!");
                }

                setIsLoginCompleted(false);
            });
    }

    useEffect(() => {

        if (Object.keys(FormErrors).length === 0 && isLoginCompleted) {
            loginUser({
                Email,
                Password
            });
        }
        else {
            setTimeout(() => {
                setIsLoginCompleted(false);
            }, 300);
        }

    }, [FormErrors]);

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoginCompleted(true);
        setFormErrors(validate());
    }

    const validate = () => {
        const errors = {}
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!Email) {
            errors.Email = "Email is required!";

        }
        else if (!regex.test(Email)) {
            errors.Email = "Email is invalid!";

        }
        if (!Password) {
            errors.Password = "Password is required!";

        }
        else if (Password.length < 6) {
            errors.Password = "Password must more than 6 characters!";
        }

        return errors;
    }


    return (
        <>
            <div className="container w-25 border p-5 shadow">
                {
                    LoginError !== "" ?

                        <div className="border mb-3 p-3">
                            <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#ff0000", }} className="d-inline" />
                            <p className="d-inline">{LoginError}</p>
                        </div>
                        :
                        null
                }
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <div className="input-group"><span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                            <input type="text" id="email" className="form-control" onChange={d => setEmail(d.target.value)} />

                        </div>
                        <p className='text-danger'>{FormErrors.Email}</p>
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="password">Password:</label>

                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                            <input type="password" id="password" className="form-control" onChange={d => setPassword(d.target.value)} />

                        </div>
                        <p className='text-danger'>{FormErrors.Password}</p>
                    </div>
                    {isLoginCompleted ? (
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
                        <button type="submit" className="btn btn-success mt-2">Login</button>
                    )}
                </form>
            </div>
        </>
    );
}
