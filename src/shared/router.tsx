import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Shifts from '../routes/Shifts/Shifts';
import Redirect from '../routes/Redirect/Redirect';
import CreateShift from '../routes/Shifts/CreateShift/CreateShift';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'shifts',
        element: <Shifts />,
        children: [
          {
            path: 'create',
            element: <CreateShift />,
          }
        ]
      },
      {
        path: 'redirect/:redirect/token/:token/facility/:facility',
        element: <Redirect />,
      }
    ]
  },
]);

export default router;