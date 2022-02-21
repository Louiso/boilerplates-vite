import './index.css';

import { ApolloProvider } from '@apollo/client';
import { AuthContextProvider } from 'app/extensions/context';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import client from './app/client';
import Root from './routes';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ApolloProvider client={client}>
          <Root />
        </ApolloProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
