import jwt_decode from "jwt-decode";
import getToken from './../../js/token/gettoken';
import { useState } from "react";
import ChangePassword from "../../js/AccountSettings/ChangePassword";
import ChangeUsername from "../../js/AccountSettings/ChangeUsername";
import ChangeEmail from "../../js/AccountSettings/ChangeEmail";
import ChangeBio from "../../js/AccountSettings/ChangeBio";
import ChangeProfileImage from "../../js/AccountSettings/ChangeProfileImage";
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner';
import { useEffect } from "react";

export default function AccountSettings() {
    const [Password, setPassword] = useState(null);
    const [PasswordConfirm, setPasswordConfirm] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Username, setUsername] = useState(null);
    const [Bio, setBio] = useState(null);

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();


    const [isPasswordCompleted, setIsPasswordCompleted] = useState(false);
    const [isEmailCompleted, setIsEmailCompleted] = useState(false);
    const [isUsernameCompleted, setIsUsernameCompleted] = useState(false);
    const [isBioCompleted, setIsBioCompleted] = useState(false);
    const [isProfileImageCompleted, setIsProfileImageCompleted] = useState(false);

    const [isSubmited, setIsSubmited] = useState(false);

    const navigate = useNavigate();

    const imageStyle = {
        height: "200px",
        width: "150px",
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile]);


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const type = e.target.name;
        const Id = jwt_decode(getToken()).Id;
        setIsSubmited(true);

        if (type === "password") {
            setIsPasswordCompleted(true);
            if (Password === PasswordConfirm) {
                await ChangePassword({
                    Id,
                    Password
                }).then(function (response) {
                    navigate(0);
                });
            }
            else {
                console.log("Passwords does not match!");
            }
            setIsPasswordCompleted(false);
        }
        else if (type === "email") {
            const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            setIsEmailCompleted(true);
            if (regex.test(Email)) {
                await ChangeEmail({
                    Id,
                    Email
                }).then(function (response) {
                    navigate(0);
                });
            }
            else {
                console.log("Invalid email!");
            }
            setIsEmailCompleted(false);

        }
        else if (type === "username") {
            setIsUsernameCompleted(true);
            await ChangeUsername({
                Id,
                Username
            }).then(function (response) {
                navigate(0);
            });
            setIsUsernameCompleted(false);
        }
        else if (type === "bio") {
            setIsBioCompleted(true)
            await ChangeBio({
                Id,
                Bio
            }).then(function (response) {
                setIsBioCompleted(false);
                navigate(0);
            });
        }
        else if(type === "profileImage")
        {
            setIsProfileImageCompleted(true);
            const User = new FormData();
            User.append("Id", Id);
            User.append("UserImageData", selectedFile);
            await ChangeProfileImage({
               User
            }).then(function (response) {
                setIsBioCompleted(false);
                navigate(0);
            });
        }

        setIsSubmited(false);
    }

    return (<>
        <form name="password" className="container" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <h5>Change password</h5>
                </div>
                <div className="col-4">
                    <input type="password" className="form-control mb-2" autoComplete="new-password" onChange={e => setPassword(e.target.value)} />
                    <input type="password" className="form-control" autoComplete="new-password" onChange={e => setPasswordConfirm(e.target.value)} />
                </div>
                <div className="col-4">
                    {isPasswordCompleted ? (
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
                        isSubmited ? <button type="submit" className="btn btn-primary" disabled>Submit</button> : <button type="submit" className="btn btn-primary">Submit</button>
                    )}
                </div>

            </div>
        </form>

        <hr className="container" />

        <form name="email" className="container" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <h5>Change email</h5>
                </div>
                <div className="col-4">
                    <input type="text" className="form-control" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="col-4">
                    {isEmailCompleted ? (
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
                        isSubmited ? <button type="submit" className="btn btn-primary" disabled>Submit</button> : <button type="submit" className="btn btn-primary">Submit</button>
                    )}
                </div>

            </div>
        </form>

        <hr className="container" />

        <form name="username" className="container" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <h5>Change username</h5>
                </div>
                <div className="col-4">
                    <input type="text" className="form-control" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="col-4">
                    {isUsernameCompleted ? (
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
                        isSubmited ? <button type="submit" className="btn btn-primary" disabled>Submit</button> : <button type="submit" className="btn btn-primary">Submit</button>
                    )}
                </div>

            </div>
        </form>

        <hr className="container" />

        <form name="bio" className="container" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <h5>Change bio</h5>
                </div>
                <div className="col-4">
                    <textarea className="form-control" onChange={e => setBio(e.target.value)} ></textarea>
                </div>
                <div className="col-4">
                    {isBioCompleted ? (
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
                        isSubmited ? <button type="submit" className="btn btn-primary" disabled>Submit</button> : <button type="submit" className="btn btn-primary">Submit</button>
                    )}
                </div>

            </div>
        </form>


        <hr className="container" />

        <form name="profileImage" className="container" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <h5>Update profile image</h5>
                </div>
                <div className="col-4">
                    <input type="file" className="form-control" onChange={onSelectFile} />
                </div>
                <div className="col-4">
                    {isProfileImageCompleted ? (
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
                        isSubmited ? <button type="submit" className="btn btn-primary" disabled>Submit</button> : <button type="submit" className="btn btn-primary">Submit</button>
                    )}
                </div>
            </div>
            <div className='d-flex justify-content-center mb-2'>
                        {(preview !== undefined) ? <img src={preview} style={imageStyle} alt='preview' /> : null}
                    </div>
        </form>


    </>);
}