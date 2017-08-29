import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './master.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import * as firebase from 'firebase';
import generalChartData from './data/user.json';
import Modal from 'react-modal';
import {PageHeader, Grid, Row, Col} from 'react-bootstrap';

const config = {
    apiKey: "AIzaSyDlPyqOgzi6kJVZiL6dcsGBiOTdEoQce6c",
    authDomain: "shroom-iot.firebaseapp.com",
    databaseURL: "https://shroom-iot.firebaseio.com",
    projectId: "shroom-iot",
    storageBucket: "shroom-iot.appspot.com",
    messagingSenderId: "190253158967"
  };
firebase.initializeApp(config);

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor      : 'blue'
  }
};

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      tempsArray: []
    }
  }
  componentDidMount() {
    const sensorRef = firebase.database().ref("sensors").child(this.props.sensor);
    sensorRef.on('value', (snapshot) => {
      let temps = snapshot.val();
      let tmpArray = [];
      console.log("List of Objects " + temps);
      Object.keys(temps).forEach(function(temp) {
        tmpArray.push(temps[temp]);
        let test = temps[temp];
        console.log("Key: " + temp);
        console.log("Temp: " + test.temp);
        console.log("Time: " + test.time);
      });
      this.setState({
        tempsArray: tmpArray
      })
      this.state.tempsArray.forEach(function(value){ console.log("Time: " + value.time + "\tTemp: " + value.temp + "\tValue: " + value); })
      console.log("Stored Values: " + this.state.tempsArray);
    });
  }
  render() {
    return(
      <div>
        <LineChart
          width={1100}
          height={500}
          data={this.state.tempsArray} >
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis />
        </LineChart>
      </div>
    );
  }
}

class AirSensor extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    return (
      <div className="AirSensorInfo">
          <button className="AirSensorButton" onClick={this.openModal}>
            <h3>{this.props.name}</h3>
            79
          </button>
          <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
            style={customStyles}
          >
            <Chart />
            <button onClick={this.closeModal}>close</button>
          </Modal>
        </div>
      </div>
    );
  }
}

class Sensor extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      // width: 1024,
      // height: 1500,
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleChart = this.toggleChart.bind(this);
    // this.updateDimensions = this.updateDimensions.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  toggleChart() {
    console.log("click!\n");
      this.setState(prevState => ({
      active: !prevState.active
    }));
      console.log(this.state.active);
  }

  render() {
    return(
      <div className="SensorInfo">
        <button className="SensorButton" onClick={this.openModal}>
          79
        </button>
        <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <Chart sensor={this.props.sensor}/>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
      </div>
    );
  }
}

class SensorsWindow extends Component {
    constructor() {
      super();
      this.state = {
        active: false,
        width: 1024,
        height: 1500,
        modalIsOpen: false
      }

      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      this.updateDimensions();
      window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
      this.setState({width: window.innerWidth, height: window.innerHeight});
      console.log("Class SensorsWindow\tInner width: " + window.innerWidth + "\tInner height: " + window.innerHeight);
    }

    render() {
      return (
        <Grid bsClass="Test" style={{height: this.props.height}}>
          <Row>
            <Col xs={6}>
              <Sensor sensor="00"/>
            </Col>
            <Col xs={6}>
              <Sensor sensor="01"/>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Sensor sensor="02"/>
            </Col>
            <Col xs={6}>
              <Sensor sensor="03"/>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Sensor sensor="04"/>
            </Col>
            <Col xs={6}>
              <Sensor sensor="05"/>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <AirSensor name="Temperature"/>
            </Col>
            <Col xs={4}>
              <AirSensor name="Humidity"/>
            </Col>
            <Col xs={4}>
              <AirSensor name="Carbon Dioxide"/>
            </Col>
          </Row>
        </Grid>
      );
    }
}

class SensorsMenu extends Component {
  render() {
    return(
      <div>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      tempsArray: []
    }
    this.state = {
      active: false,
      width: 1024,
      height: 1500,
      modalIsOpen: false
    }

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    const sensorRef = firebase.database().ref("sensors").child("00");
    sensorRef.on('value', (snapshot) => {
      let temps = snapshot.val();
      let tmpArray = [];
      console.log("List of Objects " + temps);
      Object.keys(temps).forEach(function(temp) {
        tmpArray.push(temps[temp]);
        let test = temps[temp];
        console.log("Key: " + temp);
        console.log("Temp: " + test.temp);
        console.log("Time: " + test.time);
      });
      this.setState({
        tempsArray: tmpArray
      })
      this.state.tempsArray.forEach(function(value){ console.log("Here's the current object:\n" + "Time: " + value.time + "\tTemp: " + value.temp + "\tValue: " + value); })
      console.log("Stored Values: " + this.state.tempsArray);
    });
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
      console.log("Class: App\tInner width: " + window.innerWidth + "\tInner height: " + window.innerHeight);
      this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  render() {
    return (
      // Hamburger Icon for menu on left for all devices
      <div className="App">
        <PageHeader>
          MycoRobotics<br/><small>Tech Meets Ag</small>
        </PageHeader>
        <br/>
        <Grid>
          <Row>
          </Row>
          <Row>
            <Col xs={8} xsOffset={2} s={8}>
              <SensorsWindow height={this.state.height}/>
            </Col>
            <Col>
              <SensorsMenu height={this.state.height}/>
            </Col>
          </Row>
          <Row>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
