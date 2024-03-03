import React, { useState,useEffect } from 'react';
import { Button, TextField, Alert, Card, CardContent, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Reset.css'

const API="https://backend-api-ebon-nu.vercel.app" || "http://localhost:4040"


const Reset = () => {
    const [data, setData] = useState({
        identifier: '',
        newPassword: ''
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const[loading,setLoading]=useState(true)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleReset = async () => {
        try {
            const res = await axios.post(`${API}/auth/resetpassword`, data, {
                withCredentials: true,
            });
            setAlertMessage('Password reset successful!');
            setAlertSeverity('success');
            navigate('/login');
            console.log(res.data);
        } catch (e) {
            setAlertMessage(e.response.data.message);
            setAlertSeverity('error');
            console.log(e.response.data);
        }
    };


    useEffect(() => {
        const skeletonTimer = setTimeout(() => {
          setLoading(false);
        }, 1000);
        return () => clearTimeout(skeletonTimer);
      }, []);


    return (
        <div>
            <div>
                <Card>
                    <CardContent>

                    <div className="logo">
                    <h3>PEEJIYEM</h3>
                </div>
                        <div className="reset-input">
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
                    name="newPassword"
                    label="New Password"
                    variant="outlined"
                    margin="normal"
                    value={data.newPassword}
                    onChange={handleChange}
                />
                
                        </div>
                    </CardContent>
                        <CardActions>
                             
                <Button variant="contained" onClick={handleReset}>
                    Reset Password
                </Button>
                        </CardActions>
                </Card>
               
                {alertMessage && (
                    <Alert severity={alertSeverity} onClose={() => setAlertMessage('')}>
                        {alertMessage}
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default Reset;
