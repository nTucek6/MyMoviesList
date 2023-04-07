import { useLocation,useParams } from "react-router-dom";
import { matchPath } from "react-router";
//import jwt_decode from "jwt-decode";
//import getToken from "./../token/gettoken";

export default function GetPage() {
    const location = useLocation();
    const { username } = useParams();
    const { title } = useParams();

    const isHome = !!matchPath(location.pathname, '/');
    const isMovieSearch = !!matchPath(location.pathname, '/moviessearch');
    const isLogin = !!matchPath(location.pathname, '/login');
    const isDiscussions = !!matchPath(location.pathname, '/discussions')
    const isProfile = !!matchPath(location.pathname, '/profile/' + username);
    const isMoviesList = !!matchPath(location.pathname, '/movieslist/' + username);
    const isAccountSettings = !!matchPath(location.pathname, '/accountsettings/' +username);
    const isAddMovie = !!matchPath(location.pathname, '/addmovie');
    const isAddPerson = !!matchPath(location.pathname, '/addperson');
    const isUsers = !!matchPath(location.pathname, '/users');
    const isDiscussion = !!matchPath(decodeURI(location.pathname), '/discussions/discussion/' + title);
    const isGenresMovies = !!matchPath(decodeURI(location.pathname), '/moviessearch/genre/' + title);


    if (isHome) {
        return <h6>Home page</h6>;
    }
    else if (isMovieSearch) {
        return <h6>Movies Search</h6>;
    }
    else if (isLogin) {
        return <h6>Login</h6>;
    }
    else if (isDiscussions) {
        return <h6>Discussions</h6>;
    }
    else if (isProfile) {
        return <h6>{username}'s profile</h6>;
    }
    else if (isMoviesList) {
        return <h6>{username}'s movie list</h6>;
    }
    else if (isAccountSettings) {
        return <h6>Account Settings</h6>;
    }
    else if (isAddMovie) {
        return <h6>Add movie</h6>;
    }
    else if (isAddPerson) {
        return <h6>Add person</h6>;
    }
    else if (isUsers) {
        return <h6>Users</h6>;
    }
    else if (isDiscussion) {
        return <h6>{sessionStorage.getItem('user')}'s discussion</h6>; 
    }
    else if (isGenresMovies) {
        return <h6>{sessionStorage.getItem('genre')}</h6>; 
    }

}