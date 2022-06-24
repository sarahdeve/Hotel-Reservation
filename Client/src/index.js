import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SearchContextProvider } from './contex/SearchContext';
import { AuthContextProvider } from './contex/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AuthContextProvider>
   </BrowserRouter>
</React.StrictMode>
  );


serviceWorkerRegistration.register();

reportWebVitals();
