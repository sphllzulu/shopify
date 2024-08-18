import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardMedia, CardContent, Container } from '@mui/material';

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

//   const handleNext = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const handlePrevious = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Card>
        <CardMedia
          component="img"
          height="500"
          image={slides[currentSlide].image}
        //   alt={slides[currentSlide].title}
        />
        
      </Card>
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" onClick={handlePrevious}>Previous</Button>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </Box> */}
    </Box>
  );
};

export default Carousel;
