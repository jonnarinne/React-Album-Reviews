import React from 'react';
import { Box, Typography } from '@mui/material';

function Etusivu() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={2} 
    >
      <Box p={2} bgcolor="white"> 
        <Typography variant="h4">Tervetuloa Levyarvostelut-sivulle!</Typography>
      </Box>
    </Box>
  );
}

export default Etusivu;