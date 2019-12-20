import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';


import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux'
import reducer from './redux/reducer/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/saga/rootSaga';
import * as Types from './redux/action/actionType';

import firebase from 'firebase';

const browserHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga)

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      path: '',
    };
  }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyC983802DATeK8IbXfHMxk_ihxlO5AbUOs",
      authDomain: "manager-appshop-c9fdb.firebaseapp.com",
      databaseURL: "https://manager-appshop-c9fdb.firebaseio.com",
      projectId: "manager-appshop-c9fdb",
      storageBucket: "manager-appshop-c9fdb.appspot.com",
      messagingSenderId: "71062288585",
      appId: "1:71062288585:web:f2a6c0594412a7de833518",
      measurementId: "G-QFP8J94GDV"
    };
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        this.setState({ path: '/user' });
        browserHistory.push('/Chat');
      } else {
        // No user is signed in.
        this.setState({ path: '/' })
        browserHistory.push('/sign-in');

      }
    }.bind(this));
  }


  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}
