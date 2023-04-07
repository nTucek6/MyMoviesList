import axios from "axios";
import config from './../../config.json';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'

import { ThreeDots } from 'react-loader-spinner';


function setToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
}

export default function Register() {
    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [ConfirmPassword, setConfirmPassword] = useState();
    const [Username, setUsername] = useState();
    const [FormErrors, setFormErrors] = useState({});
 

    const [isRegisterCompleted, setIsRegisterCompleted] = useState(false);

    const navigate = useNavigate();

    async function registerUser(credentials) {

        await axios({
            method: "post",
            url: config.SERVER_URL + "auth/RegisterUser/",
            headers: { 'Content-Type': 'application/json' },
            data: {
                Email: credentials.Email,
                Password: credentials.Password,
                Username: credentials.Username
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
            .catch(function (response) {
                console.log(response);
                setIsRegisterCompleted(false);
            });
    }

    useEffect(()=>{
     
        if(Object.keys(FormErrors).length === 0 && isRegisterCompleted)
        {
                registerUser({
                    Email,
                    Password,
                    Username
                });
        }
        else
        {
            setTimeout(() => {
                setIsRegisterCompleted(false);
            }, 300);
           
        }
    },[FormErrors]);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsRegisterCompleted(true);
        setFormErrors(validate());
     
    }

   
    const validate = () =>
    {
        const errors = {}
        const regex= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!Email)
        {
            errors.Email = "Email is required!";
        }
        else if(!regex.test(Email))
        {
            errors.Email = "Email is invalid!";
        }
        if(!Username)
        {
            errors.Username = "Username is required!";
        }

        if(!Password)
        {
            errors.Password = "Password is required!";
        }
        else if(Password.length < 6)
        {
            errors.Password = "Password must more than 6 characters!";
        }
        else if(Password !== ConfirmPassword)
        {
            errors.Password = "Passwords do not match!";
        }

        return errors;
    }


    return (
        <>

            <div className="container w-25 border p-4 mt-3 shadow ">
                <div className="text-center">
                    <h2>Create your Account</h2>
                </div>

                <hr className="mb-5" />

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>

                        <div className="input-group"><span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                            <input type="text" id="email" autoComplete="off" className="form-control" onChange={d => setEmail(d.target.value)}  />
                        </div>
                        <p className='text-danger'>{FormErrors.Email}</p>
                       
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="username">Username:</label>
                        <div className="input-group"><span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                            <input type="text" id="username" className="form-control" onChange={d => setUsername(d.target.value)}  />
                        </div>
                        <p className='text-danger'>{FormErrors.Username}</p>
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="password">Password:</label>
                        <div className="input-group"><span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                            <input type="password" id="password" autoComplete="new-password" className="form-control" onChange={d => setPassword(d.target.value)}  />
                        </div>
                        <p className='text-danger'>{FormErrors.Password}</p>
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="passwordRepeat">Confirm password:</label>

                        <div className="input-group"><span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                            <input type="password" id="confirmPassword" autoComplete="new-password" className="form-control" onChange={d => setConfirmPassword(d.target.value)}  />
                        </div>
                    </div>

                    {isRegisterCompleted ? (
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

                            <button className="btn btn-primary mt-2 ">Create Account</button>
                    )}


                    

                    <div className="mt-2">
                        <p className="text-center"><small>Already have an account?</small> <a href="/login">Login</a></p>
                    </div>
                </form>
            </div>
        </>
    );

}