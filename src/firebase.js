//src/firebase.js
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDlPyqOgzi6kJVZiL6dcsGBiOTdEoQce6c",
    authDomain: "shroom-iot.firebaseapp.com",
    databaseURL: "https://shroom-iot.firebaseio.com",
    projectId: "shroom-iot",
    storageBucket: "shroom-iot.appspot.com",
    messagingSenderId: "190253158967"
  };
firebase.initializeApp(config);
export default firebase;
