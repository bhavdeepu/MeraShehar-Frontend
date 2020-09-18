import React ,{useEffect, useState}from 'react';
import { useDispatch, useSelector } from "react-redux";
import NavBar from './nav-bar';
import { Navbar, NavDropdown, Container, Row, Col, Image, Form, Button} from 'react-bootstrap';
import {APIALL} from '../api-service';
import { useCookies} from 'react-cookie';
import {USER_LIST_SUCCESS, USER_LIST_FAIL} from "../services/types";


function Profile(){
  
  const [token] = useCookies(['ms-token']);

  const userDetails = useSelector(store => store.userDetails);
  const {user, loading, error} = userDetails;

  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  const [email , setEmail] = useState('');
  const [mobileNo , setMobileNo] = useState('')
  const [image , setImage] = useState(null);

  const dispatch = useDispatch();

  useEffect (() =>{
    if (user){
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setMobileNo(user.mobile_no);
    }
  },[user])

  const updateDetails = () =>{
    const uploadData = new FormData();
    uploadData.append('first_name',firstName);
    uploadData.append('last_name',lastName);
    uploadData.append('email',email);
    uploadData.append('mobile_no',mobileNo);

    if (image) uploadData.append('images', image);

    APIALL.updateUser(token['ms-token'], user.id, uploadData)
      .then(resp => dispatch({ type: USER_LIST_SUCCESS, payload: resp.data }))
      .catch(error => dispatch({ type: USER_LIST_FAIL, payload: error.message }))
  }

  return loading ? <div>loading..</div> :
      error ? <div>erroads sdsdr..{error}</div> :
      user ?
        <div>
          <NavBar />
          <center><h1>Hi {user.first_name}</h1></center>
          <Container>
            <Row>
              <Col>
              <Image src={user.images} roundedCircle style={{width: "177px"}} /> <br/><br/>
              First Name : {user.first_name} <br/>
              Last Name : {user.last_name} <br/>
              Email : {user.email} <br/>
              mobile_no : {user.mobile_no} <br/>
              
              </Col>

              <Col>
              <center><h3>Update Profile</h3></center>
              <Form>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" 
                    value={firstName} onChange={ evt => setFirstName(evt.target.value)}/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" 
                    value={lastName} onChange={ evt => setLastName(evt.target.value)}/>
              </Form.Group>
              
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Email" 
                    value={email} onChange={ evt => setEmail(evt.target.value)}/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control type="text" placeholder="Mobile No" 
                    value={mobileNo} onChange={ evt => setMobileNo(evt.target.value)}/>
              </Form.Group>

              <Form.Group>
                <Form.File id="image" label="Example file input"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={ evt => setImage(evt.target.files[0])} />
              </Form.Group>

              <Button variant="primary" type="button" onClick={() => updateDetails()}>
                Submit
              </Button>
            </Form>
              
              </Col>
            </Row>
          </Container>
        </div> :
      <h1>Loading Page</h1>

}


export default Profile;

