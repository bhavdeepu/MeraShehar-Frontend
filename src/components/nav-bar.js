import React from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { useCookies} from 'react-cookie';
import { useDispatch, useSelector } from "react-redux";
import {IS_USER_LOGIN} from "../services/types";
import { Link } from "react-router-dom";


function NavBar(props){

  const [token, setToken, deleteToken ] = useCookies(['ms-token']);
  const dispatch = useDispatch();

  const logoutUser = () =>{
    deleteToken(['ms-token']);
    dispatch({ type: IS_USER_LOGIN});
  }

    const userDetails = useSelector(store => store.userDetails);
    const {user, is_login} = userDetails; 


  return(
    <Navbar bg="light" expand="lg">
          <Navbar.Brand>MeraShehar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link><Link to={'/'} style={{ color: 'inherit', textDecoration: 'inherit'}}>Home</Link></Nav.Link>
            </Nav>
            {
              is_login?
              <React.Fragment>
              <Nav.Link><Link to={'/cart'} style={{ color: 'inherit', textDecoration: 'inherit'}}>Cart</Link></Nav.Link>
              <Nav.Link><Link to={'/profile'} style={{ color: 'inherit', textDecoration: 'inherit'}}>Profile</Link></Nav.Link>
              
                <NavDropdown title={user.first_name} id="basic-nav-dropdown">
                <NavDropdown.Item><Link to={'/profile'} style={{ color: 'inherit', textDecoration: 'inherit'}}>My Profile</Link></NavDropdown.Item>
                  
                  {user['is_superuser']? 
                <NavDropdown.Item><Link to={'/admin/categories'} style={{ color: 'inherit', textDecoration: 'inherit'}}>Admin CP</Link></NavDropdown.Item>:
                ""
            }
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick = {logoutUser}>Logout</NavDropdown.Item>
                </NavDropdown>
                
                
              </React.Fragment>
                :
                <Nav.Link href="/login">Login/Register</Nav.Link> 
            }
             
          </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;