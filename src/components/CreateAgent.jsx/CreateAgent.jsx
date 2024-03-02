import React, { useState,useEffect } from 'react';
import { Button, Dialog, DialogContent, DialogActions, TextField,Skeleton } from '@mui/material';
import axios from 'axios';



const API_URL = "https://backend-api-u4m5.onrender.com" || "http://localhost:4040";


const CreateAgent = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    location: ''
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
    setLoading(false); // Set loading to false after component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.email || !formData.contactNumber || !formData.location) {
        alert('All fields are required');
        return;
      }
      const response = await axios.post(`${API_URL}/agent/createagents`, formData);
      console.log(response.data); 
    alert("Agent Created successfully")
      handleClose();
    } catch (error) {
      console.error('Error creating agent:', error);
      alert('Error creating agent');
      setError('An error occurred while creating the agent');
    }
  };

  return (
    <div>
 {loading ? (
          <Skeleton variant="text" width={150}  animation="wave"/>
      ) : (
        <Button  onClick={handleOpen}>Create a New Agent</Button>
      )}      <Dialog open={open} onClose={handleClose}>
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
