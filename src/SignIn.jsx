import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './userSlice';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);
      if (response.data.length > 0) {
        const user = response.data[0]; // Assuming there's only one user with the given email and password
        dispatch(setUser({ email: user.email, userId: user.id })); // Dispatching with both email and userId
        setErrorMessage('');
        navigate('/');
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Failed to sign in. Please try again.');
    }
  };

  return (
    <div  className='whole' style={{display:'flex', alignItems:'center'}}>
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Sign In</Typography>
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
      <Button variant="contained" color="primary" onClick={handleSignIn} fullWidth
      sx={{background:'#FECF06'}}>Sign In</Button>
    </Container>
    </div>
  );
};

export default SignIn;
