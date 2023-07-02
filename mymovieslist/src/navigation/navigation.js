import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faList, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Dropdown from 'react-bootstrap/Dropdown';
import GetPage from '../js/navigation/getpage';
import GetRoleNavigation from '../js/navigation/rolenavigation';
import getToken from './../js/token/gettoken';
import jwt_decode from "jwt-decode";
import SearchBar from "../js/navigation/SearchBar";

function SetProfileId(Id) {
    sessionStorage.setItem('ProfileId', Id); //  JSON.stringify(Id)
}

export default function Navigation() {

    function IsUserLogged() {
        const token = getToken();

        function LogOut() {
            localStorage.clear();
            window.location.reload();
        }

        if (token === undefined || token === "" || token === null) {
            return (
                <Nav className="navigation-lr">
                    <Nav.Link as={Link} to="/login" className="btn btn-outline-primary navigation-login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register" className="btn btn-primary navigation-register ">Register</Nav.Link>
                </Nav>);
        }
        else if (jwt_decode(token).exp * 1000 < Date.now()) {
            localStorage.clear();
            return (
                <Nav className="navigation-lr">
                    <Nav.Link as={Link} to="/login" className="btn btn-outline-primary navigation-login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register" className="btn btn-primary navigation-register ">Register</Nav.Link>
                </Nav>);
        }
        else {
            const Username = jwt_decode(token).Username;
            const Id = jwt_decode(token).Id;

            return (
                <>
                    <div>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" >
                            <GetRoleNavigation getToken={token} />

                            <Nav className="me-auto">
                                <NavDropdown title={Username} className="">
                                    <NavDropdown.Item as={Link} to={"/profile/" + Username} className="" onClick={() => SetProfileId(Id)} ><FontAwesomeIcon icon={faUser} /> Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={"/movieslist/" + Username} className="" ><FontAwesomeIcon icon={faList} /> Movies List</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={"/accountsettings/" + Username} className=""><FontAwesomeIcon icon={faGear} /> Account settings</NavDropdown.Item>
                                    <Dropdown.Divider />
                                    <NavDropdown.Item onClick={() => LogOut()} className=" "><FontAwesomeIcon icon={faRightFromBracket} /> Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav >
                        </Navbar.Collapse>
                    </div>
                </>
            );
        }
    }

    return (
        <>
            <div className="container">
                <Navbar bg="none" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/" id="site-name" >MyMoviesList</Navbar.Brand>
                        <IsUserLogged />
                    </Container>
                </Navbar>

                <Navbar className="navigation-custom" expand="lg">
                    <div className="container">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" >
                            <Nav className="me-auto">

                                <NavDropdown title="Movies" className="dropdown-custom">
                                    <NavDropdown.Item as={Link} to="/moviessearch">Movie Search</NavDropdown.Item>

                                </NavDropdown>
                                <NavDropdown title="Community" className="dropdown-custom" >
                                    <NavDropdown.Item as={Link} to="/discussions">Discussions</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/searchusers">Search users</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <SearchBar />
                        </Navbar.Collapse>
                    </div>
                </Navbar>

                <div className="container mb-4 border pt-2 pb-2">
                    {<GetPage />}
                </div>

            </div>
            <Outlet />

        </>
    );
}
