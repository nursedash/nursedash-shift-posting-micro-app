import React, { useState, useEffect } from 'react';
import Drawer from './Drawer';
import { Alert, AlertTitle, Box, Container, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Copyright from '../Copyright/Copyright';
import AppBar from './AppBar';
import { useAppSelector } from '../../hooks';
import { facilityActions, selectFacility } from '../../redux/facility/slice';
import useAppDispatch from '../../hooks/useAppDispatch';

const AppContainer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(true);
  const cleanTimezoneForDisplay = (timezone: string): string => timezone?.replace('_', ' ');
  const { name: facilityName, timezone, id: facilityId } = useAppSelector(selectFacility);
  const facilityTimezone = cleanTimezoneForDisplay(timezone);
  const localTimezone = cleanTimezoneForDisplay(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [showTzAlert, setShowTzAlert] = useState<boolean>(false);

  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  useEffect(() => {
    if (facilityTimezone !== localTimezone) setShowTzAlert(true);
  }, [facilityTimezone, localTimezone]);

  useEffect(() => {
    dispatch(facilityActions.fetchFacilityDataAsync());
  }, [facilityId]);

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
          {
            showTzAlert &&
            <Box mb={3}>
              <Alert onClose={() => setShowTzAlert(false)} severity='info'>
                <AlertTitle>Timezone Difference Detected</AlertTitle>
                <Typography style={{ display: 'inline'}}>
                    {`Your local timezone is ${localTimezone} and ${facilityName}'s timezone is ${facilityTimezone}.`}
                </Typography>
                <Typography fontWeight='bold' style={{ display: 'inline'}}>
                  {` All time in the portal is displayed in ${facilityName}'s timezone (${facilityTimezone}).`}
                </Typography>
              </Alert>
            </Box>
          }
          <Outlet />
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </>
  );
}

export default AppContainer;