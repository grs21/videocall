import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './initalpage/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './stores/store';
import './style/css/style.css'
import './style/css/bootstrap.min.css'
import './style/css/line-awesome.min.css'
import './style/css/font-awesome.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>
);
reportWebVitals();
