import React from 'react';
import { Box, Container, LinearProgress, Stack } from '@mui/material';
import ndLogo from '../../assets/nd-logo.png';

const Loader: React.FC = (): JSX.Element => {

  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      maxWidth: 'none !important',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      backgroundColor: '#f5f5f5'
    }}>
      <Stack spacing={3} width='140px'>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <img src={ndLogo} alt="loader" height='100px'/>
        </Box>
        <LinearProgress color='secondary'/>
      </Stack>
    </Container>
  )
};

export default Loader;