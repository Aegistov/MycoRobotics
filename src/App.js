import React, { Component } from 'react';
import './App.css';
import Home from './scenes/Home';
import * as firebase from 'firebase';

// const config = {
//     apiKey: "AIzaSyDlPyqOgzi6kJVZiL6dcsGBiOTdEoQce6c",
//     authDomain: "shroom-iot.firebaseapp.com",
//     databaseURL: "https://shroom-iot.firebaseio.com",
//     projectId: "shroom-iot",
//     storageBucket: "shroom-iot.appspot.com",
//     messagingSenderId: "190253158967"
//   };

var config = {
    apiKey: "AIzaSyAEXhHEhACdtYi0X2IQNJN-jOj9WH894ak",
    authDomain: "ai-story-teller-big.firebaseapp.com",
    databaseURL: "https://ai-story-teller-big.firebaseio.com",
    projectId: "ai-story-teller-big",
    storageBucket: "ai-story-teller-big.appspot.com",
    messagingSenderId: "387719186830"
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
