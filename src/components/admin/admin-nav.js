import React from 'react';
import { Navbar, NavDropdown} from 'react-bootstrap';
import { useCookies} from 'react-cookie';
import { useDispatch, useSelector } from "react-redux";
import {IS_USER_LOGIN} from "../../services/types";
import { Link } from "react-router-dom";


function AdminNavBar(props){

  const [token, setToken, deleteToken ] = useCookies(['ms-token']);
  const dispatch = useDispatch();
  const logoutUser = () =>{
    deleteToken(['ms-token']);
    dispatch({ type: IS_USER_LOGIN});
  }

  const userDetails = useSelector(store => store.userDetails);
  const {user} = userDetails;

  return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                MeraShehar Admin Pannel
              </Link>
          </Navbar.Brand>
          
          <Navbar.Collapse className="justify-content-end">              
              <NavDropdown title={user.first_name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Orders</NavDropdown.Item>                  
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick = {logoutUser}>Logout</NavDropdown.Item>
              </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
        )
}

export default AdminNavBar;