import { Outlet, Navigate } from "react-router-dom";
import getToken from './../js/token/gettoken';

function FindToken() {
    const userToken = getToken();
    if (userToken === null) {
        return true;
    }
    else {
        return false;
    }
}

export default function LimitedRoutes() {
    let auth = { 'token': FindToken() }

    return (
        auth.token ? <Outlet /> : <Navigate to="/" />
    );

}


// 