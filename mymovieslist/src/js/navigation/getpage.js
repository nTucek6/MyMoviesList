import { useLocation,useParams } from "react-router-dom";
import { matchPath } from "react-router";

export default function GetPage() {
    const location = useLocation();
    const { title,name,username,id,search,type } = useParams();

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
    const isDiscussion = !!matchPath(decodeURI(location.pathname), '/discussions/discussion/' + id + "/" + title);
    const isGenresMovies = !!matchPath(decodeURI(location.pathname), '/moviessearch/genre/'+id+'/' + title);
    const isUsersAdmin = !!matchPath(location.pathname, '/usersadmin');
    const isMoviesAdminView = !!matchPath(location.pathname, '/moviesadmin/viewmovies');
    const isMoviesAdminAddEdit = !!matchPath(location.pathname, '/moviesadmin/addeditmovie');
    const isPeopleAdminView = !!matchPath(location.pathname, '/personadmin/viewpeople');
    const isPeopleAdminAddEdit = !!matchPath(location.pathname, '/personadmin/addeditperson');
    const isMovieInfo = !!matchPath(decodeURI(location.pathname), '/movie/'+id+'/' + title); 
    const isPersonInfo = !!matchPath(decodeURI(location.pathname), '/person/'+id+'/' + name);
    const isAllActors = !!matchPath(decodeURI(location.pathname), '/movie/'+id+'/' + title + "/characters&actors");
    const isSearchResult = !!matchPath(decodeURI(location.pathname), '/searchresult/'+type+'/' + search);
    const isSearchUsers = !!matchPath(decodeURI(location.pathname), '/searchusers');
    const isUserSupport = !!matchPath(location.pathname, '/support');
    const isIssues = !!matchPath(location.pathname, '/issues');
    const isMyDiscussions = !!matchPath(location.pathname, '/mydiscussions/' + username);

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
       return <h6>{title}</h6>
    }
    else if(isUsersAdmin)
    {
        return <h6>View users</h6>; 
    }
    else if(isMoviesAdminView)
    {
        return <h6>View movies</h6>; 
    }
    else if(isMoviesAdminAddEdit)
    {
        return <h6>Add & Edit movie</h6>; 
    }
    else if(isPeopleAdminView)
    {
        return <h6>View people</h6>; 
    }
    else if(isPeopleAdminAddEdit)
    {
        return <h6>Add & Edit person</h6>; 
    }
    else if(isMovieInfo)
    {
      return <h6>{title}</h6>
    }
    else if(isPersonInfo)
    {
        return <h6>{name}</h6>
    }
    else if(isAllActors)
    {
        return <h6>{title}</h6> 
    }
    else if(isSearchResult)
    {
        return <h6>Search {type}</h6> 
    }
    else if(isSearchUsers)
    {
        return <h6>Search users</h6> 
    }
    else if(isUserSupport)
    {
        return <h6>Support</h6>
    }
    else if(isIssues)
    {
        return <h6>User Issues & recommendations</h6>
    }
    else if(isMyDiscussions)
    {
        return <h6>My discussions</h6>
    }

}