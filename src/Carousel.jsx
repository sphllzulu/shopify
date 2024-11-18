import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardMedia, CardContent, Container } from '@mui/material';

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);



  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Card>
        <CardMedia
          component="img"
          height="500"
          image={slides[currentSlide].image}
      
        />
        
      </Card>
      
    </Box>
  );
};

export default Carousel;
