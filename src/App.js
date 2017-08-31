import React, { Component } from 'react';
import './App.css';
import './master.css';
import Home from './scenes/Home';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDlPyqOgzi6kJVZiL6dcsGBiOTdEoQce6c",
    authDomain: "shroom-iot.firebaseapp.com",
    databaseURL: "https://shroom-iot.firebaseio.com",
    projectId: "shroom-iot",
    storageBucket: "shroom-iot.appspot.com",
    messagingSenderId: "190253158967"
  };
firebase.initializeApp(config);



class SensorUtility extends Component {
  constructor() {
    super();
    this.state = {}
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
