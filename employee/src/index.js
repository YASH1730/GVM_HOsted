import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from './Redux/store';
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));

// subscribe this function is used for making the connection between app and extension
Store.subscribe(() => console.log(Store.getState()));

root.render(
  <React.StrictMode>
    <Provider store = {Store} >
    <App />
    </Provider>
  </React.StrictMode>
);
