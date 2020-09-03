import React, {useState, useEffect} from 'react';
import '../App.css';
import {APIALL} from '../api-service';
import { useCookies} from 'react-cookie';
import NavBar from './nav-bar';
import { Form, Button } from 'react-bootstrap';


function Login(props){
	
	const [username , setUsername] = useState('');
	const [password , setPassword] = useState('');
	const [token, setToken ] = useCookies(['ms-token']);
	
	useEffect( () =>{
			if (token['ms-token']) {
				// props.history.push("/");
				window.location.href='/';
			}
			},[token])

	const loginClicked = () =>{
		APIALL.loginUser({username, password})
		.then(resp => setToken('ms-token',resp.data.token))
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
				    <Form.Label>Email</Form.Label>
				    <Form.Control type="email" placeholder="Enter email" value={username} onChange={ evt => setUsername(evt.target.value)} />
				    <Form.Text className="text-muted">
				      We'll never share your email with anyone else.
				    </Form.Text>
				  </Form.Group>

				<Form.Group controlId="formBasicPassword">
				    <Form.Label>Password</Form.Label>
				    <Form.Control type="password" placeholder="Password" value={password} onChange={ evt => setPassword(evt.target.value)}/>
				  </Form.Group>

			<Button variant="primary" className="btn-lg btn-dark btn-block" onClick = {loginClicked}>
			    Login
			  </Button>
			  <br />
			 <div className="text-center">
			 <a href="/" >Sign up</a>
			 <span className="p-2">|</span>
			 <a href="/" >Forgot password</a>
			 </div>
			</Form>		
		</div>	

)
}

export default Login;