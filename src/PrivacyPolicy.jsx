import React from "react";
import { Box, Typography } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your privacy is important to us. This privacy statement explains the personal data we collect, how we process it, and for what purposes.
      </Typography>
      <Typography variant="h6" gutterBottom>
        1. Information We Collect
      </Typography>
      <Typography variant="body1" gutterBottom>
        We collect personal information such as your name, email address, and shopping list items to provide a better service.
      </Typography>
      <Typography variant="h6" gutterBottom>
        2. How We Use Your Information
      </Typography>
      <Typography variant="body1" gutterBottom>
        We use your information to manage your shopping lists, send email notifications, and improve our service.
      </Typography>
      <Typography variant="h6" gutterBottom>
        3. Your Rights
      </Typography>
      <Typography variant="body1" gutterBottom>
        You have the right to access, modify, and delete your personal data. You can also withdraw consent at any time.
      </Typography>
      <Typography variant="h6" gutterBottom>
        4. Data Security
      </Typography>
      <Typography variant="body1" gutterBottom>
        We take appropriate security measures to protect your data from unauthorized access and ensure data integrity.
      </Typography>
      
    </Box>
  );
};

export default PrivacyPolicy;
