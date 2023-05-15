import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../shared/components/ErrorPage/ErrorPage';
import Shifts from './Shifts/Shifts';
import Redirect from './Redirect/Redirect';
import CreateShift from './Shifts/CreateShift/CreateShift';
import CompletedShifts from './Shifts/CompletedShifts/CompletedShifts';

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
          },
          {
            path: 'completed',
            element: <CompletedShifts />
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