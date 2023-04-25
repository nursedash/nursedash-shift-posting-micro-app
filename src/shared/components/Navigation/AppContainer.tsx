import React from 'react';
import Drawer from './Drawer';
import { Box, Container, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Copyright from '../Copyright/Copyright';
import AppBar from './AppBar';

const AppContainer = (): JSX.Element => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar open={ open } toggleDrawer={ toggleDrawer } />
      <Drawer open={ open } />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </>
  );
}

export default AppContainer;