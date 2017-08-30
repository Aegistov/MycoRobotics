import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './master.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import * as firebase from 'firebase';
import generalChartData from './data/user.json';
import {PageHeader, Grid, Row, Col, Modal, Button, Navbar, Nav, NavItem} from 'react-bootstrap';

const config = {
    apiKey: "AIzaSyDlPyqOgzi6kJVZiL6dcsGBiOTdEoQce6c",
    authDomain: "shroom-iot.firebaseapp.com",
    databaseURL: "https://shroom-iot.firebaseio.com",
    projectId: "shroom-iot",
    storageBucket: "shroom-iot.appspot.com",
    messagingSenderId: "190253158967"
  };
firebase.initializeApp(config);

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      dataPoints: [],
      dataKey: '',
    }
  }
  componentDidMount() {
    const sensorRef = firebase.database().ref("sensors").child(this.props.sensor);
    sensorRef.on('value', (snapshot) => {
      let allDataPoints = snapshot.val();
      let container = [];
      let keyHolder = '';
      console.log("List of Objects " + allDataPoints);
      Object.keys(allDataPoints).forEach(function(singleTemp) {
        container.push(allDataPoints[singleTemp]);
        let test = allDataPoints[singleTemp];
        console.log("Key: " + singleTemp);
        Object.keys(allDataPoints[singleTemp]).forEach(function(key) {
          if (key != "time"){
            console.log("Key within: " + key);
            keyHolder = key;
            console.log("Key Holder: " + keyHolder);
          }
        });
        console.log("Temp: " + test[keyHolder]);
        console.log("Time: " + test.time);
      });
      this.setState({
        dataPoints: container,
        dataKey: keyHolder
      })
      this.state.dataPoints.forEach(function(value){ console.log("Time: " + value.time + "\tTemp: " + value.singleTemp + "\tValue: " + value); })
      console.log("Stored Values: " + this.state.dataPoints + "\tStored Key: " + this.state.dataKey);
    });
  }
  render() {
    return(
      <div>
        <LineChart
          width={this.props.width}
          height={this.props.height}
          data={this.state.dataPoints} >
          <Line
            type="monotone"
            dataKey={this.state.dataKey}
            stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis type="number" domain={['dataMin - 5', 'dataMax + 5']}/>
        </LineChart>
      </div>
    );
  }
}

class SensorUtility extends Component {
  constructor() {
    super();
    this.state = {}
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
      <div id="SensorButtonWrapper">
        <Button className="SensorButton" onClick={this.open} bsStyle="primary">
        <h3>{this.props.name}</h3>
          79
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={this.close}
          dialogClassName="custom-modal"
          container={this}
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
        <Grid bsClass="Test" style={{height: this.props.height * 1}}>
          <Row>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="00" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="01" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
          </Row>
          <Row>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="02" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="03" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
          </Row>
          <Row>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="04" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="05" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
          </Row>
          <Row>
            <Col xs={4} id="SensorColumn">
              <Sensor name="Temperature" sensor="AirTemperature" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
            <Col xs={4} id="SensorColumn">
              <Sensor name="Humidity" sensor="AirHumidity" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
            <Col xs={4} id="SensorColumn">
              <Sensor name="Carbon Dioxide" sensor="AirCarbonDioxide" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
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
      dataPoints: [],
      active: false,
      width: 1024,
      height: 1500,
      showModal: false
    }

    this.updateDimensions = this.updateDimensions.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    const sensorRef = firebase.database().ref("sensors").child("00");
    sensorRef.on('value', (snapshot) => {
      let allDataPoints = snapshot.val();
      let container = [];
      console.log("List of Objects " + allDataPoints);
      Object.keys(allDataPoints).forEach(function(singleTemp) {
        container.push(allDataPoints[singleTemp]);
        let test = allDataPoints[singleTemp];
        console.log("Key: " + singleTemp);
        console.log("Temp: " + test.singleTemp);
        console.log("Time: " + test.time);
      });
      this.setState({
        dataPoints: container
      })
      this.state.dataPoints.forEach(function(value){ console.log("Here's the current object:\n" + "Time: " + value.time + "\tTemp: " + value.singleTemp + "\tValue: " + value); })
      console.log("Stored Values: " + this.state.dataPoints);
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

  open() {
    console.log("It opened!");
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  render() {
    return (
      // Hamburger Icon for menu on left for all devices
      <div className="App">
        <PageHeader>
          MycoRobotics<br/><small>Tech Meets Ag</small>
        </PageHeader>
        <br/>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">MycoRobotics</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} onClick={this.open}>Sensor Utility</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Modal
          show={this.state.showModal}
          onHide={this.close}
          dialogClassName="custom-modal"
          container={this}
        >
          <Modal.Header closeButton>
            <Modal.Title> Sensor {this.props.sensor}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Content!
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Grid>
          <Row>
          </Row>
          <Row>
            <Col id="SensorsWindowWrapper" xs={8} xsOffset={2}>
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
