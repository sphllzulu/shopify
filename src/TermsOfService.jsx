import React from 'react';
import { Container, Typography,List, ListItem,ListItemText } from '@mui/material';

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Terms of Service</Typography>


<Typography variant="h6" gutterBottom>Introduction</Typography>
<Typography variant="body1" paragraph>
  Welcome to our application. These Terms of Service ("Terms") govern your use of our services. By using our services, you agree to comply with these Terms. Please read them carefully.
</Typography>


<Typography variant="h6" gutterBottom>User Responsibilities</Typography>
<Typography variant="body1" paragraph>
  As a user of our services, you are responsible for your actions and interactions on the platform. You agree to:
</Typography>
<List>
  <ListItem>
    <ListItemText primary="1. Provide accurate and truthful information when creating an account." />
  </ListItem>
  <ListItem>
    <ListItemText primary="2. Maintain the security of your account and notify us immediately if you suspect unauthorized access." />
  </ListItem>
  <ListItem>
    <ListItemText primary="3. Use our services in compliance with all applicable laws and regulations." />
  </ListItem>
  <ListItem>
    <ListItemText primary="4. Respect the rights of others and refrain from any activity that may harm other users or the platform." />
  </ListItem>
</List>


<Typography variant="h6" gutterBottom>Limitations of Liability</Typography>
<Typography variant="body1" paragraph>
  To the fullest extent permitted by law, our company and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
</Typography>
<List>
  <ListItem>
    <ListItemText primary="1. Your access to or use of or inability to access or use the services." />
  </ListItem>
  <ListItem>
    <ListItemText primary="2. Any conduct or content of any third party on the services." />
  </ListItem>
  <ListItem>
    <ListItemText primary="3. Any unauthorized access, use, or alteration of your transmissions or content." />
  </ListItem>
</List>


<Typography variant="h6" gutterBottom>Termination of Service</Typography>
<Typography variant="body1" paragraph>
  We reserve the right to suspend or terminate your access to our services at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users of the services, us, or third parties, or for any other reason.
</Typography>


<Typography variant="h6" gutterBottom>Governing Law</Typography>
<Typography variant="body1" paragraph>
  These Terms and your use of the services will be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
</Typography>


<Typography variant="h6" gutterBottom>Changes to Terms</Typography>
<Typography variant="body1" paragraph>
  We reserve the right to modify these Terms at any time. Any changes to the Terms will be posted on this page, and we encourage you to review them periodically. Your continued use of the services after any such changes constitutes your acceptance of the new Terms.
</Typography>


    </Container>
  );
};

export default TermsOfService;
