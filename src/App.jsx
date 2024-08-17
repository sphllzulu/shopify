


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';
import ShoppingList from './ShoppingList';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const App = () => {
  const userEmail = useSelector((state) => state.user.email);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            {userEmail ? `Welcome, ${userEmail}` : 'Shopping List App'}

          </Typography>
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
