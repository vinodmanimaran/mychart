import React, { useState,useEffect } from 'react';
import { Button, TextField,  Card, CardContent, CardActions, IconButton} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Reset.css'
import { Visibility,VisibilityOff } from '@mui/icons-material';

const API="https://backend-api-ebon-nu.vercel.app" || "http://localhost:4040"


const Reset = () => {
    const [data, setData] = useState({
        identifier: '',
        newPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleReset = async () => {
        try {
            const res = await axios.post(`${API}/auth/resetpassword`, data, {
                withCredentials: true,
            });
            navigate('/login');
            alert("Reset Password successful")
            console.log(res.data);
        } catch (e) {
            alert(e.response.data)
            console.log(e.response.data);
        }
    };


    


    return (
        <div className="reset-container">
        <Card className="reset-card">
          <CardContent>
            <h5 className="reset-logo">PEEJIYEM</h5>
            <TextField
              fullWidth
              name="identifier"
              label="Username or Email"
              variant="outlined"
              margin="normal"
              value={data.identifier}
              onChange={handleChange}
              className="reset-input"
            />
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              name="newPassword"
              label="New Password"
              variant="outlined"
              margin="normal"
              value={data.newPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
              className="reset-input"
            />
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <button variant="contained" onClick={handleReset} className="reset-button">Reset Password</button>
          </CardActions>

          <div className="login-content">
            <h5>If you Already have password? <Link  to="/login"> Login</Link></h5>
          </div>
        </Card>
       
      </div>
    );
};

export default Reset;
