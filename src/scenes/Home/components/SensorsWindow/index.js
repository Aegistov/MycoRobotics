import React, { Component } from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import Sensor from './components/Sensor';
import * as firebase from 'firebase';
import './style.css';

class SensorsWindow extends Component {
    constructor() {
      super();
      this.state = {
        active: false,
        width: 1024,
        height: 1500,
        showModal: false,
        sensorQuantity: 0,
        sensorHeight: 0,
        sensorBlocks: [],
      }

      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      this.updateDimensions();
      window.addEventListener('resize', this.updateDimensions);
      this.getSensorQuantity();
      console.log("Got sensor quantity.\nQuantity: " + this.state.sensorQuantity);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
      this.setState({width: window.innerWidth, height: window.innerHeight});
      console.log("Class SensorsWindow\tInner width: " + window.innerWidth + "\tInner height: " + window.innerHeight);
    }

    createSensorWindow() {
      this.setState({sensorHeight: 100 / this.state.sensorQuantity});
      console.log("Sensor Height: " + this.state.sensorHeight + "\tSensor Quantity: " + this.state.sensorQuantity);
      console.log("Reading Height: " + this.props.height + "\tReading Width: " + this.props.width);
      let columnSet = [];
      let currentSensor = 0;
      if (this.props.width >= 768) {
        for (let max = 0; max < 4; max++) {
          columnSet.push(<Col xs={3} id="SensorColumn" key={currentSensor}><Sensor sensor={currentSensor.toString()} height={(this.props.height * .5)} width={(this.props.width * .7)} key={currentSensor} /></Col>);
          currentSensor++;
        }
        console.log("Row: " + <Row bsClass="SColumn" style={{height: this.state.sensorHeight.toString() + "%"}}>);
      }
      else {
        for (let max = 0; max < 2; max++) {
          columnSet.push(<Col xs={6} id="SensorColumn" key={currentSensor}><Sensor sensor={currentSensor.toString()} height={(this.props.height * .5)} width={(this.props.width * .7)} key={currentSensor} /></Col>);
          currentSensor++;
        }
      }
      this.setState({sensorBlocks: columnSet});
      console.log("Current Sensor: " + currentSensor + "\tColumns: " + columnSet + "\tColumns in State: " + this.state.sensorBlocks);
    }

    getSensorQuantity() {
      const sensorRef = firebase.database().ref("sensors");
      sensorRef.once('value').then((snapshot) => {
        this.setState({sensorQuantity: snapshot.numChildren() - 2});
        console.log("Number of Sensors: " + this.state.sensorQuantity + "\tSensor Height: " + this.state.sensorHeight);
        this.createSensorWindow();
      });
    }

    render() {
      return (
        <Grid bsClass="SensorsWindow" style={{height: this.props.height * 1}}>
          <Row bsClass="SColumn" style={{height: this.state.sensorHeight.toString() + "%"}}>
            {this.state.sensorBlocks}
          </Row>
          <Row bsClass="SColumn" style={{height: this.state.sensorHeight.toString() + "%"}}>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="04" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="05" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
          </Row>
          <Row bsClass="SColumn" style={{height: this.state.sensorHeight.toString() + "%"}}>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="00" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="01" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
          </Row>
          <Row bsClass="SColumn" style={{height: this.state.sensorHeight.toString() + "%"}}>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="00" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="01" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
          </Row>
          <Row bsClass="SColumn" style={{height: this.state.sensorHeight.toString() + "%"}}>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="00" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="01" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
          </Row>
          <Row id="AirSensors" bsClass="SColumn" style={{height: this.state.sensorHeight.toString() + "%"}}>
            <Row id="AirSensorsHeader">
              <h6>Air Sensor</h6>
            </Row>
            <Row id="AirSensorsContent">
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
          </Row>
        </Grid>
      );
    }
}

export default SensorsWindow;
