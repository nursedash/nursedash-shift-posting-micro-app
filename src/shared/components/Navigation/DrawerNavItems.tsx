import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SettingsIcon from '@mui/icons-material/Settings';

interface NavItem {
  path: string;
  name: string;
  icon: JSX.Element;
  local?: boolean;
}

const nursedashUrl = `${process.env.REACT_APP_NURSEDASH_LEGACY_URL ?? ''}/`;

const navItems: NavItem[] = [
  {
    path: 'Calendar',
    name: 'Calendar',
    icon: <CalendarTodayIcon />,
  },
  {
    path: 'OverviewShift',
    name: 'Shift Overview',
    icon: <PlaylistPlayIcon />,
  },
  {
    path: 'CompletedShift',
    name: 'Past Shifts',
    icon: <PlaylistAddCheckIcon />,
  },
  {
    path: 'shifts/create',
    name: 'Create Shift',
    icon: <PlaylistAddIcon />,
    local: true,
  },
  {
    path: 'Settings',
    name: 'Contact Us',
    icon: <SettingsIcon />,
  },
  {
    path: 'Logout',
    name: 'Logout',
    icon: <PowerSettingsNewIcon />,
  }
]

const DrawerNavItems = (): JSX.Element => (
  <React.Fragment>
    {navItems.map((item) => (
      <ListItemButton key={item.path} component='a' href={`${((item?.local) === true) ? '/' : nursedashUrl}${item.path}`}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
    ))}
  </React.Fragment>
);

export default DrawerNavItems;