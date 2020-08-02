import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button, Navbar, Form, Nav, FormControl, NavDropdown, Card, CardDeck} from 'react-bootstrap';

function App() {
  const [categories , setProducts] = useState([]);

  useEffect (() =>{
    fetch("http://localhost:8000/categories/",{
      method: "GET",
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setProducts(resp))
    .catch(error => console.log(error))
    
  },[])

  const renderCard = (card, index) => {
    return (
      
      <Card style={{ width: '18rem' }} key={index}>
        <Card.Img variant="top" src={card.image}  style={{height: "177px"}} />
        <Card.Body>
          <Card.Title>{card.name}</Card.Title>
          <Card.Text>
          {card.description}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      
      )
  }  

  return (
    <div className="App">
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">MeraShehar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <CardDeck>
      {categories.map(renderCard)}
      </CardDeck>
    </div>
  );
}

export default App;
