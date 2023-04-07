import getToken from './../js/token/gettoken';
import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";


export default function PrivateAdminModeratorRoutes() {
    const token = getToken();

    if (token === null) {
        return <Navigate to="/" />;
    }

    var decoded = jwt_decode(token);


    if (decoded.Role !== null && decoded.Role !== "") {
        let auth = { 'role': decoded.Role === "Admin" || decoded.Role === "Moderator" ? true : false }

        return (
            auth.role ? <Outlet /> : <Navigate to="/" />
        );
    }

}

