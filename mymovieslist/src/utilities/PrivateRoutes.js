import { Outlet,Navigate } from "react-router-dom";
import getToken from './../js/token/gettoken';

function FindToken() {
    const userToken = getToken();

    if (userToken === null) {
        return false;
    }
    else
    {
        return true;
    }
}

 export default function PrivateRoutes  ()  {
     let auth = { 'token': FindToken()}

     return(
         auth.token ? <Outlet /> : <Navigate to="/" />
     );

}
