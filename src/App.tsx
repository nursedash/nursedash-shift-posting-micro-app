import React, { useEffect } from 'react';
import './App.scss';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import AppContainer from './shared/components/Navigation/AppContainer';
import useAppDispatch from './shared/hooks/useAppDispatch';
import { useParams } from 'react-router-dom';
import { useAppSelector } from './shared/hooks';
import { coreActions, selectCoreFacilityId, selectLoadingStatus } from './shared/redux/core/slice';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Loader from './shared/components/Loader/Loader';
import theme from './theme';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'dayjs/locale/en';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { token, facility: facilityFromRoute} = useParams();
  const facilityIdFromRoute = parseInt(facilityFromRoute != null && facilityFromRoute !== 'null' ? facilityFromRoute : '0');
  const isAppLoading = useAppSelector(selectLoadingStatus)
  const facilityIdFromStorage = useAppSelector(selectCoreFacilityId);

  useEffect(() => {
    dispatch(coreActions.storeCoreDataAsync({token: token ?? '', facilityId: facilityIdFromRoute ?? facilityIdFromStorage ?? null, role: 'facility'}));
  }, [token, facilityIdFromRoute])

  return (
    <div className="app">
      <ToastContainer />
      <ThemeProvider theme={theme}>
        { isAppLoading === true && <Loader /> }
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
            {
              facilityIdFromStorage != null && <AppContainer />
            }
          </LocalizationProvider>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
