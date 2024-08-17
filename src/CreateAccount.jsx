


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post('http://localhost:3001/users', { email, password });
      if (response.status === 201) {
        setSuccessMessage('Account created successfully! Redirecting to sign in...');
        setErrorMessage('');

        // Redirect to sign-in page after 2 seconds
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Email already in use. Please try with a different email.');
      } else {
        setErrorMessage('Failed to create an account. Please try again.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Create Account</Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <TextField
        label="Email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreateAccount} fullWidth>Create Account</Button>
    </Container>
  );
};

export default CreateAccount;
