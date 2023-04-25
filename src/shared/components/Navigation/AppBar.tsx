import React from 'react';
import {
  // Badge,
  IconButton,
  styled,
  Toolbar,
  Typography
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector } from '../../hooks';
import { selectFacilityName } from '../../redux/facility/slice';

interface CustomAppBarProps extends MuiAppBarProps {
  open?: boolean;
  toggleDrawer?: () => void;
}

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<CustomAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...((open === true) && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface AppBarProps {
  open?: boolean;
  toggleDrawer: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ open = true, toggleDrawer }): JSX.Element => {
  const facilityName = useAppSelector(selectFacilityName);

  return (
    <>
      <CustomAppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            { facilityName }
          </Typography>
          {/* <IconButton color="inherit"> */}
          {/*  <Badge badgeContent={4} color="secondary"> */}
          {/*    <NotificationsIcon /> */}
          {/*  </Badge> */}
          {/* </IconButton> */}
        </Toolbar>
      </CustomAppBar>
    </>
  );
}

export default AppBar;