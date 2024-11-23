// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setUser } from './userSlice';
// import { Container, TextField, Button, Typography, Alert, InputAdornment, IconButton } from '@mui/material';
// import { useNavigate, Link } from 'react-router-dom';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import axios from 'axios';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSignIn = async () => {
//     try {
//       const response = await axios.get(`https://shopping-list-five-ashy.vercel.app/api/users?email=${email}&password=${password}`);
//       if (response.data.length > 0) {
//         const user = response.data[0]; // Assuming there's only one user with the given email and password
//         dispatch(setUser({ email: user.email, userId: user.id })); // Dispatching with both email and userId
//         setErrorMessage('');
//         navigate('/list');
//       } else {
//         setErrorMessage('Invalid credentials. Please try again.');
//       }
//     } catch (error) {
//       setErrorMessage('Failed to sign in. Please try again.');
//     }
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <div className='whole' style={{ display: 'flex', alignItems: 'center' }}>
//       <Container maxWidth="xs" sx={{ background: 'white', padding: '10px', opacity: '90%', boxShadow: '0 0 5px 5px' }}>
//         <Typography variant="h4" gutterBottom>Sign In</Typography>
//         {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
//         <TextField
//           label="Email"
//           fullWidth
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           margin="normal"
//         />
//         <TextField
//           label="Password"
//           type={showPassword ? 'text' : 'password'}
//           fullWidth
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           margin="normal"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSignIn}
//           fullWidth
//           sx={{ background: '#FECF06' }}
//         >
//           Sign In
//         </Button>
//         <Link to="/create-account">
//           <Typography sx={{ paddingTop: '10px' }}>Click to create account</Typography>
//         </Link>
//       </Container>
//     </div>
//   );
// };

// export default SignIn;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './userSlice';
import { Container, TextField, Button, Typography, Alert, InputAdornment, IconButton } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      //  headers to handle CORS
      const response = await axios.get('https://shopping-list-five-ashy.vercel.app/api/users', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // Instead of sending password in URL, filter on client side
        params: {
          email: email
        }
      });

      // Find user with matching email and password
      const user = response.data.find(user => 
        user.email === email && user.password === password
      );

      if (user) {
        dispatch(setUser({ email: user.email, userId: user.id }));
        setErrorMessage('');
        navigate('/list');
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setErrorMessage('Failed to sign in. Please try again.');
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
        <Typography variant="h4" gutterBottom>Sign In</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          type="email"
          autoComplete="email"
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          autoComplete="current-password"
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignIn}
          fullWidth
          sx={{ background: '#FECF06' }}
        >
          Sign In
        </Button>
        <Link to="/create-account">
          <Typography sx={{ paddingTop: '10px' }}>Click to create account</Typography>
        </Link>
      </Container>
    </div>
  );
};

export default SignIn;