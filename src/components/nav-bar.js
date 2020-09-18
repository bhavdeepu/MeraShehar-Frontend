import React from 'react';
import { Button, Navbar, Form, Nav, FormControl, NavDropdown} from 'react-bootstrap';
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
          <Navbar.Brand href="#home">MeraShehar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
            {
              is_login?
              <React.Fragment>
                <NavDropdown title={user.first_name} id="basic-nav-dropdown">
                <NavDropdown.Item><Link to={'/profile'} style={{ color: 'inherit', textDecoration: 'inherit'}}>My Profile</Link></NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Orders</NavDropdown.Item>
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