import { TextField,Card, CardContent, CardActions,IconButton } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.css';

const API="https://backend-api-ebon-nu.vercel.app" || "http://localhost:4040";

const Login = ({ handleLogin }) => {
    const navigate=useNavigate()
    const [data, setData] = useState({
        identifier: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false); 

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const loginSubmit = async () => {
        try {
            const res = await axios.post(`${API}/auth/login`, data, {
                withCredentials: true,
            });
            setData(res.data)
            handleLogin(); 

            navigate("/");
            console.log(res.data);
        } catch (e) {
            alert(e.response.data)
            console.log(e.response.data);
        }
    };

    return (
        <div className="login-container">
        <Card className="login-card">
          <CardContent>
            <h5 className="login-logo">PEEJIYEM</h5>
            <TextField
              fullWidth
              name="identifier"
              label="Username or Email"
              variant="outlined"
              margin="normal"
              value={data.identifier||''}
              onChange={handleChange}
              className="login-input"
            />
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              variant="outlined"
              margin="normal"
              value={data.password ||''}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
              className="login-input"
            />
<div className="forgot-block">
                            <Link to="/resetpassword" className='forgot-text' >Forgot Password?</Link>
                        </div>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <button onClick={loginSubmit} className="login-btn">Login</button>
          </CardActions>
        </Card>
       
      </div>
    );
};

export default Login;
