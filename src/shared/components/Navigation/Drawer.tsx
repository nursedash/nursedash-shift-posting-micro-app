import React from 'react';
import { Divider, List, styled, Toolbar } from '@mui/material';
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import DrawerNavItems from './DrawerNavItems';

const drawerWidth: number = 240;

interface DrawerProps extends MuiDrawerProps {
  open?: boolean;
}

const CustomDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...((open === false) && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const Drawer: React.FC<DrawerProps> = ({ open = true }) => {
  return (
    <CustomDrawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
      </Toolbar>
      <Divider />
      <List component="nav">
        <DrawerNavItems />
      </List>
    </CustomDrawer>
  );
}


export default Drawer;