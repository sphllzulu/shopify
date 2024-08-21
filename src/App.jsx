


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';
import ShoppingList from './ShoppingList';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

const App = () => {
  const userEmail = useSelector((state) => state.user.email);
  const location = useLocation();

  // Determine if the current path is not sign-in or create-account
  const showAppBar = location.pathname === '/list';

  return (
    <>
      {showAppBar && (
        <AppBar position="static" sx={{ background: '#F3C402' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              {userEmail ? `Welcome, ${userEmail}` : 'Shopping List App'}
            </Typography>
            <Link to='/'><LogoutRoundedIcon sx={{ color: 'white' }} /></Link>
          </Toolbar>
        </AppBar>
      )}
      <Routes>
        <Route path="/list" element={<ShoppingList />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
