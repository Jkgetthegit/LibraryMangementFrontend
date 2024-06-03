import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

function Register() {
    const [newUserName, setNewUserName] = useState<string>('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const showToast = () => {
        toast.success("User Registration Successful", { 
            autoClose: 3000 
        });
    };

    const apiFunction = async (newUserName : string, password : string) => {
      try {
        const response = await axios.post('http://localhost:3000/user/signup', {
          username: newUserName,
          password: password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        return response.data;
      } catch (err) {
        console.error('API call error:', err);
        throw err;
      }
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
 
            try {
              setShowError(false);
                await apiFunction(newUserName, password);
                showToast();
                setNewUserName('');
                setPassword('');

            } catch (error) {
                console.error('Registration failed', error);
                setShowError(true);
            }
        
    };

    console.log(showError);
    console.log(newUserName);
    console.log(password);
    
    
    
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '400px' }} className='shadow'>
                <Card.Header className='text-center'>
                    <h1>REGISTER</h1>
                </Card.Header>
                <Card.Body>
                    {showError && <Alert variant="danger">Please enter both username and password.</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUserName">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter username" 
                                value={newUserName} 
                                onChange={(e) => setNewUserName(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </Form.Group>
                        <div className="text-center"> 
                            <Button type="submit" className='btn bg-black'>
                                Register
                            </Button>
                        </div>
                        <p className='px-5 position-relative' style={{ top: "10px" }}>
                            Once you register, please <Link to='/'>login</Link>.
                        </p>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Register;
