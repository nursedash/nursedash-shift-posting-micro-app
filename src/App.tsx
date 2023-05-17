import React from 'react';
import './App.scss';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import AppContainer from './shared/components/Navigation/AppContainer';
import useAppDispatch from './shared/hooks/useAppDispatch';
import { useParams } from 'react-router-dom';
import { coreActions, selectLoadingStatus } from './shared/redux/core/slice';
import { facilityActions } from './shared/redux/facility/slice';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en';
import theme from './theme';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from './shared/hooks';
import Loader from './shared/components/Loader/Loader';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { token, facility} = useParams();
  const facilityId = parseInt(facility ?? '0');
  const isAppLoading = useAppSelector(selectLoadingStatus)

  dispatch(coreActions.storeCoreDataAsync({token: token ?? '', facilityId: facilityId ?? null, role: 'facility'}));
  dispatch(facilityActions.fetchFacilityDataAsync());

  return (
    <div className="app">
      <ToastContainer />
      <ThemeProvider theme={theme}>
        { isAppLoading === false && <Loader /> }
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
            <AppContainer />
          </LocalizationProvider>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
