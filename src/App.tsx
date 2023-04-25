import React from 'react';
import './App.scss';
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import AppContainer from './shared/components/Navigation/AppContainer';
import useAppDispatch from './shared/hooks/useAppDispatch';
import { useParams } from 'react-router-dom';
import { coreActions } from './shared/redux/core/slice';
import { facilityActions } from './shared/redux/facility/slice';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const mdTheme = createTheme();

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { token, facility} = useParams();
  const facilityId = parseInt(facility ?? '0');

  dispatch(coreActions.storeCoreDataAsync({token: token ?? '', facilityId: facilityId ?? null}));
  dispatch(facilityActions.fetchFacilityDataAsync());

  return (
    <div className="app">
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <AppContainer />
              </LocalizationProvider>
            </Box>
        </ThemeProvider>
    </div>
  );
}

export default App;
