import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import App from './App';
import config from './aws-exports';
import { BrowserRouter } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
Amplify.configure(config);

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <BrowserRouter>
        <Authenticator.Provider>
          <App />
        </Authenticator.Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
