import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './shared/redux/store';
import reportWebVitals from './reportWebVitals';
import router from './routes/router';
import { RouterProvider } from 'react-router-dom';
import ApolloGqlProvider from './core/providers/ApolloProvider';
import initSentry from './core/integrations/sentry';

import './index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

if (process.env.REACT_APP_ENVIRONMENT !== 'development' && process.env.REACT_APP_DISABLE_SENTRY !== 'true') {
  initSentry();
}

localStorage.clear();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloGqlProvider>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </ApolloGqlProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
