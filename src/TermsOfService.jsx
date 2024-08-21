import React from 'react';
import { Container, Typography } from '@mui/material';

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Terms of Service</Typography>
      <Typography variant="body1" paragraph>
        {/* Your terms of service content here */}
        Welcome to our Terms of Service. By using our services, you agree to the following terms...
      </Typography>
    </Container>
  );
};

export default TermsOfService;
