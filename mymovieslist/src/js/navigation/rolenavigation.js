import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faFilm,faLock,faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function GetRoleNavigation({getToken})
{
    var Role = jwt_decode(getToken).Role;

    if (Role === "Admin")
    {
        return (
            <>
                    <Nav>
                    <NavDropdown title={<FontAwesomeIcon icon={faLock} /> }>
                        <NavDropdown.Item as={Link} to="/usersadmin" className=""><FontAwesomeIcon icon={faUser} /> Users</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/moviesadmin/viewmovies" className=""><FontAwesomeIcon icon={faFilm} /> Edit movie</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/personadmin/viewpeople" className=""><FontAwesomeIcon icon={faUser} /> Edit person</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/issues" className=""><FontAwesomeIcon icon={faEnvelope} /> User Issues</NavDropdown.Item>
                        </NavDropdown>
                    </Nav >
            </>
            );
    }
    else if (Role === "Moderator")
    {
        return (
            <>
                    <Nav>
                    <NavDropdown title={<FontAwesomeIcon icon={faLock} />}>
                    <NavDropdown.Item as={Link} to="/moviesadmin/viewmovies" className=""><FontAwesomeIcon icon={faFilm} /> Edit movie</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/personadmin/viewpeople" className=""><FontAwesomeIcon icon={faUser} /> Edit person</NavDropdown.Item>
                        </NavDropdown>
                    </Nav >
            </>
            );
    }
}