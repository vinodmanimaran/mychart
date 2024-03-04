import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, DialogActions, TextField, Skeleton } from '@mui/material';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API || "http://localhost:4040";



const CreateAgent = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    location: '',
    PAN_Number: '',
    Bank_Name: '',
    Aadhar_Number: '',
    Account_Number: '',
    IFSC_Code: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API}/agent/createagents`, formData,{withCredentials:true});
      console.log(response.data);
      alert("Agent Created successfully");
      handleClose();
    } catch (error) {
      console.error('Error creating agent:', error);
      setError('An error occurred while creating the agent. Please try again later.');
    }
  };

  return (
    <div>
      {loading ? (
        <Skeleton variant="text" width={150} animation="wave" />
      ) : (
        <Button onClick={handleOpen}>Create a New Agent</Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
           <TextField
            fullWidth
            label="Aadhar Number"
            name="Aadhar_Number"
            value={formData.Aadhar_Number}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="PAN Number"
            name="PAN_Number"
            value={formData.PAN_Number}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Bank Name"
            name="Bank_Name"
            value={formData.Bank_Name}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
         
          <TextField
            fullWidth
            label="Account Number"
            name="Account_Number"
            value={formData.Account_Number}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="IFSC Code"
            name="IFSC_Code"
            value={formData.IFSC_Code}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateAgent;
