import { TextField, Button, Card, CardHeader, CardContent, CardActions, CardActionArea } from '@mui/material';
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'



const API="https://backend-api-ebon-nu.vercel.app" || "http://localhost:4040"

const Login = ({ handleLogin }) => {
    const [data, setData] = useState({
        identifier: "",
        password: ""
    });

    const[loading,setLoading]=useState(true)


    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        const skeletonTimer = setTimeout(() => {
          setLoading(false);
        }, 1000);
        return () => clearTimeout(skeletonTimer);
      }, []);

    const loginSubmit = async () => {
        try {
            const res = await axios.post(`${API}/auth/login`, data, {
                withCredentials: true,
            });
            handleLogin(); 
            navigate("/");
            console.log(res.data);
        } catch (e) {
            console.log(e.response.data);
        }
    };

    return (
        <div>
            <div className="loginpage">
                <Card className='logincard'>
                    <CardContent>
                    <div className="logo">
                    <h3>PEEJIYEM</h3>
                </div>

                <div className="login-input">
                <TextField
                name="identifier"
                label="Username or Email"
                variant="outlined"
                margin="normal"
                value={data.identifier}
                onChange={handleChange}
            />
            <TextField
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                margin="normal"
                value={data.password}
                onChange={handleChange}
            />
            <div className="forgot-block">
<Link to="/resetpassword" className='forgot-text'>Forgot Password?</Link>
</div>
              
                </div>
                      
                    </CardContent>
                    <CardActions>
                    <Button variant="contained" onClick={loginSubmit} className='login-btn' >Login</Button>

                    </CardActions>
                    

                  
              

            </Card>
            </div>

            
        </div>
    );
};

export default Login;
