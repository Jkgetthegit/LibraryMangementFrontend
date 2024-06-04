import axios from "axios";
import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate(); 
  localStorage.removeItem('user_token')
  localStorage.removeItem('admin_token')

  const api_function = async (username : string, password : string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signin",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (userName === "" || password === "") {
      setShowError(true)
    } else {
      try {
        setShowError(false);
        const data = await api_function(userName, password);
        console.log(data);
        const { token } = data;
        const tokenData:any = jwtDecode(token)
        console.log(tokenData);
        // console.log("Token stored in localStorage:", localStorage.getItem("token"));
        if(tokenData.role === 'user'){
        localStorage.setItem("user_token", token);
        console.log('User token',localStorage.getItem("user_token"));
          navigate('/userdashboard')
        }
        else{
        localStorage.setItem("admin_token", token);
        console.log('Admin token',localStorage.getItem("admin_token"));
        navigate('/admindashboard')
        } 
  
      } catch (error) {
        toast.error("Login failed",{autoClose:3000})
        console.log(error);
      }
    }
  };
  

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "400px" }} className="shadow">
        <Card.Header className="text-center">
          <h1>LOGIN</h1>
        </Card.Header>
        <Card.Body>
          {showError && (
            <Alert variant="danger">
              Please enter both username and password.
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text" // Corrected the type to "text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => {setUserName(e.target.value) , setShowError(false)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {setPassword(e.target.value), setShowError(false)}}
              />
            </Form.Group>
            <div className="text-center">
              <Button type="submit" className="btn bg-black">
                Login
              </Button>
            </div>
            <p className="px-5 position-relative" style={{ top: "10px" }}>
              Don't have an account?{" "}
              <Link to="/register">
                Register
              </Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
