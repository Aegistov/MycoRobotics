import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './master.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import * as firebase from 'firebase';
import generalChartData from './data/user.json';
import {PageHeader, Grid, Row, Col, Modal, Button} from 'react-bootstrap';

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
      temperatures: []
    }
  }
  componentDidMount() {
    const sensorRef = firebase.database().ref("sensors").child(this.props.sensor);
    sensorRef.on('value', (snapshot) => {
      let allTemps = snapshot.val();
      let container = [];
      console.log("List of Objects " + allTemps);
      Object.keys(allTemps).forEach(function(singleTemp) {
        container.push(allTemps[singleTemp]);
        let test = allTemps[singleTemp];
        console.log("Key: " + singleTemp);
        console.log("Temp: " + test.singleTemp);
        console.log("Time: " + test.time);
      });
      this.setState({
        temperatures: container
      })
      this.state.temperatures.forEach(function(value){ console.log("Time: " + value.time + "\tTemp: " + value.singleTemp + "\tValue: " + value); })
      console.log("Stored Values: " + this.state.temperatures);
    });
  }
  render() {
    return(
      <div>
        <LineChart
          width={this.props.width}
          height={this.props.height}
          data={this.state.temperatures} >
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
            isOpen={this.state.showModal}
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
      showModal: false
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggleChart = this.toggleChart.bind(this);
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  toggleChart() {
      this.setState(prevState => ({
      active: !prevState.active
    }));
  }

  render() {
    return(
      <div className="SensorInfo">
        <Button className="SensorButton" onClick={this.open} bsStyle="primary" bsSize="large">
          79
        </Button>
        <div>
        <Modal
          show={this.state.showModal}
          onHide={this.close}
        >
          <Modal.Header closeButton>
            <Modal.Title> Sensor {this.props.sensor}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Chart sensor={this.props.sensor} height={this.props.height} width={this.props.width}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
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
        showModal: false
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
        <Grid bsClass="Test" style={{height: this.props.height * .9}}>
          <Row>
            <Col xs={6}>
              <Sensor sensor="00" height={(this.props.height * .5)} width={(this.props.width * .5)}/>
            </Col>
            <Col xs={6}>
              <Sensor sensor="01" height={(this.props.height * .5)} width={(this.props.width * .5)}/>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Sensor sensor="02" height={(this.props.height * .5)} width={(this.props.width * .5)}/>
            </Col>
            <Col xs={6}>
              <Sensor sensor="03" height={(this.props.height * .5)} width={(this.props.width * .5)}/>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Sensor sensor="04" height={(this.props.height * .5)} width={(this.props.width * .5)}/>
            </Col>
            <Col xs={6}>
              <Sensor sensor="05" height={(this.props.height * .5)} width={(this.props.width * .5)}/>
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
      temperatures: []
    }
    this.state = {
      active: false,
      width: 1024,
      height: 1500,
      showModal: false
    }

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    const sensorRef = firebase.database().ref("sensors").child("00");
    sensorRef.on('value', (snapshot) => {
      let allTemps = snapshot.val();
      let container = [];
      console.log("List of Objects " + allTemps);
      Object.keys(allTemps).forEach(function(singleTemp) {
        container.push(allTemps[singleTemp]);
        let test = allTemps[singleTemp];
        console.log("Key: " + singleTemp);
        console.log("Temp: " + test.singleTemp);
        console.log("Time: " + test.time);
      });
      this.setState({
        temperatures: container
      })
      this.state.temperatures.forEach(function(value){ console.log("Here's the current object:\n" + "Time: " + value.time + "\tTemp: " + value.singleTemp + "\tValue: " + value); })
      console.log("Stored Values: " + this.state.temperatures);
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
              <SensorsWindow height={this.state.height} width={this.state.width}/>
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
