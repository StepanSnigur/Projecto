import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './App/store'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAkFw2qaNZoM_QZBcgA4H_qP78TSQHKLi0",
  authDomain: "projecto-bec21.firebaseapp.com",
  projectId: "projecto-bec21",
  storageBucket: "projecto-bec21.appspot.com",
  messagingSenderId: "304550786389",
  appId: "1:304550786389:web:3ae50841f935ee09cb6bdc"
}
firebase.initializeApp(firebaseConfig)
firebase.firestore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
