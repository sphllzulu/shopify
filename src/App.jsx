import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';
import ShoppingList from './ShoppingList';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';


const App = () => {
  const userEmail = useSelector((state) => state.user.email);

  return (
    <Router>
      <AppBar position="static"  sx={{background:'#F3C402'}}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
          <Typography variant="h6">
            {userEmail ? `Welcome, ${userEmail}` : 'Shopping List App'}
          </Typography>
          <Link to='/signin'><LogoutRoundedIcon sx={{color:'white'}}/></Link>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<ShoppingList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
};

export default App;
