import React from 'react';
import './App.scss';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import AppContainer from './shared/components/Navigation/AppContainer';
import { useAppSelector } from './shared/hooks';
import {selectLoadingStatus } from './shared/redux/core/slice';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Loader from './shared/components/Loader/Loader';
import theme from './theme';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'dayjs/locale/en';

const App = (): JSX.Element => {
  const isAppLoading = useAppSelector(selectLoadingStatus)

  return (
    <div className="app">
      <ToastContainer />
      <ThemeProvider theme={theme}>
        { isAppLoading === true && <Loader /> }
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
