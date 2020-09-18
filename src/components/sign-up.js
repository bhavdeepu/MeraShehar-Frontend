import React, {useState, useEffect} from 'react';
import '../App.css';
import {APIALL} from '../api-service';
import { useCookies} from 'react-cookie';
import NavBar from './nav-bar';
import { Form, Button } from 'react-bootstrap';


function SignUp(props){
	
	const [username , setUsername] = useState('');
	const [useremail , setUseremail] = useState('');
	
	const [password , setPassword] = useState('');
	const [password2 , setPassword2] = useState('');
	
	const [token, setToken ] = useCookies(['ms-token']);
	const [data, setData ] = useState('');

	useEffect( () =>{
			if (data) {
				APIALL.loginUser({'username':useremail, password})
				.then(resp => setToken('ms-token',resp.data.token))
				.catch(error => console.log(error))
			}
			if (token['ms-token']) {
				window.location.href='/';
			}
			
			},[data,token])


	const signupClicked = () =>{

		const uploadData = new FormData();
	    uploadData.append('first_name', username);
	    uploadData.append('email', useremail);
		uploadData.append('password', password);
	    uploadData.append('password2', password2);


		APIALL.signupUser(uploadData)
		.then(resp => setData(resp.data))
		.catch(error => console.log(error))
	}

	return (
		<div>
			<NavBar/>
			<Form style={{width: "100%",
						  maxWidth: "330px",
						  padding: "15px",
						  margin: "auto",
						  height: "100%"}} >
				<h1>MeraShehar.com</h1>
				<h2 className="text-center">Welcome</h2>

				<Form.Group controlId="formBasicEmail">
				    <Form.Label>Full Name</Form.Label>
				    <Form.Control type="text" placeholder="Enter Name" value={username} onChange={ evt => setUsername(evt.target.value)} />
				  </Form.Group>

				<Form.Group controlId="formBasicEmail">
				    <Form.Label>Email</Form.Label>
				    <Form.Control type="email" placeholder="Enter email" value={useremail} onChange={ evt => setUseremail(evt.target.value)} />
				    <Form.Text className="text-muted">
				      We'll never share your email with anyone else.
				    </Form.Text>
				  </Form.Group>

				<Form.Group controlId="formBasicPassword">
				    <Form.Label>Password</Form.Label>
				    <Form.Control type="password" placeholder="Password" value={password} onChange={ evt => setPassword(evt.target.value)}/>
				  </Form.Group>

				<Form.Group controlId="formBasicPassword">
				    <Form.Label>Conform Password</Form.Label>
				    <Form.Control type="password" placeholder="Conform Password" value={password2} onChange={ evt => setPassword2(evt.target.value)}/>
				</Form.Group>

			<Button variant="primary" className="btn-lg btn-dark btn-block" onClick = {signupClicked}>
			    SignUp
		    </Button>
			
			</Form>		
		</div>	

)
}

export default SignUp;