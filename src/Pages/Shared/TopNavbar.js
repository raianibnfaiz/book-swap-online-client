import { signOut } from 'firebase/auth';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import auth from '../../firebase.init';



const TopNavbar = () => {

    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const logout = () => {
        signOut(auth);
        navigate('/home');
    }
    const navigateToMyProfile = email => {
        navigate(`/myProfile/${email}`);
    }
    const navigateToBookRequest = email => {
        navigate(`/bookRequest/${email}`);
    }
    const navigateToSentBookRequest = email => {
        navigate(`/sentRequest/${email}`);
    }
    const navigateToEditProfile = email => {
        navigate(`/updateProfile/${email}`);
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='home' href='/home'>Home</Nav.Link>
                            <Nav.Link as={Link} to='about' href="/about">About</Nav.Link>
                            {/* {user && <Nav.Link ><Button onClick={() => navigateToMyProfile(user.email)}>My Profile</Button></Nav.Link>} */}

                            {user &&
                                <NavDropdown title={user.email} id="collasible-nav-dropdown">
                                    <NavDropdown.Item><div className='w-100 mx-auto m-1' style={{ color: "tomato", letterSpacing: "3px", }} onClick={() => navigateToMyProfile(user.email)}>My Profile</div></NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <div className='w-100 mx-auto m-1' style={{ color: "tomato", letterSpacing: "3px", }} onClick={() => navigateToEditProfile(user.email)}>Edit Profile</div>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item ><div className='w-100 mx-auto m-1 ' style={{ color: "tomato", letterSpacing: "3px", }} onClick={() => navigateToBookRequest(user.email)}>Book Request</div></NavDropdown.Item>
                                    <NavDropdown.Item ><div className='w-100 mx-auto m-1 ' style={{ color: "tomato", letterSpacing: "3px", }} onClick={() => navigateToSentBookRequest(user.email)}>Sent Request & Response</div></NavDropdown.Item>

                                </NavDropdown>
                            }
                        </Nav>
                        <Nav>

                            <li className=''> {user ? <button class="btn btn-success " style={{ color: "white", letterSpacing: "3px" }} onClick={logout}>logout</button> : <Nav.Link as={Link} to='login' href="/login">Login</Nav.Link>}</li>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default TopNavbar;