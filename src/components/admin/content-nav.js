import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";


function ContentNavBar(props){

  	return (
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
                <Link to={"/admin/categories/"} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    Show all Categories
                </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to={"/admin/category/add"} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        Add Category
              </Link>

            </Navbar.Brand>
            
            <Navbar.Brand>
              <Link to={"/admin/products"} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        Show all Products
              </Link>

            </Navbar.Brand>
            <Navbar.Brand>
              <Link to={"/admin/product/add"} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                          Add Product
                </Link>
            </Navbar.Brand>

          </Container>
        </Navbar>
        )
}

export default ContentNavBar;