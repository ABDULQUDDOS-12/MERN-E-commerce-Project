import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Store from './Store';
import App from './App';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
};

ReactDOM.render(
  <Provider store={Store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);
