import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert, InputAdornment, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import './CreateAccount.css';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    if (!consent) {
      setErrorMessage('You must agree to the privacy policy and terms of service.');
      return;
    }

    try {
      const response = await axios.post('https://shopping-list-five-ashy.vercel.app/api/users', { email, password });
      if (response.status === 201) {
        setSuccessMessage('Account created successfully! Redirecting to sign in...');
        setErrorMessage('');

        // Redirect to sign-in page after 2 seconds
        setTimeout(() => {
          navigate('/');
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='whole' style={{ display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xs" sx={{ background: 'white', padding: '10px', opacity: '90%', boxShadow: '0 0 5px 5px' }}>
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
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={<Checkbox checked={consent} onChange={(e) => setConsent(e.target.checked)} />}
          label={<Typography>I agree to the <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms-of-service">Terms of Service</Link></Typography>}
        />
        <Button
          variant="contained"
          onClick={handleCreateAccount}
          fullWidth
          sx={{ background: '#FECF06' }}
          disabled={!consent}  // Disable button if consent is not given
        >
          Create Account
        </Button>
        <Link to="/">
          <Typography sx={{ paddingTop: '10px' }}>Click if you have an account</Typography>
        </Link>
      </Container>
    </div>
  );
};

export default CreateAccount;
