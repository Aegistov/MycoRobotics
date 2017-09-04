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
      let rowQuantity = (this.props.width >= 768) ? Math.ceil(this.state.sensorQuantity / 4) + 1 : Math.ceil(this.state.sensorQuantity / 2) + 1;
      console.log("Row Quantity: " + rowQuantity + "\tOption 1: " + this.state.sensorQuantity / 4 + "\tOption 2: " + this.state.sensorQuantity / 2);
      this.setState({sensorHeight: 100 / rowQuantity});
      console.log("Sensor Height: " + this.state.sensorHeight + "\tSensor Quantity: " + this.state.sensorQuantity);
      console.log("Reading Height: " + this.props.height + "\tReading Width: " + this.props.width);
      let columnSet = [];
      let rowSet = [];
      let currentSensor = 0;
      if (this.props.width >= 768) {
          while(currentSensor < this.state.sensorQuantity) {
            for (let max = 0; max < 4; max++) {
              columnSet.push(<Col xs={3} id='SensorColumn' key={currentSensor}><Sensor sensor={currentSensor.toString()} height={(this.props.height * .5)} width={(this.props.width * .7)} key={currentSensor} /></Col>);
              console.log("Current Sensor: " + currentSensor);
              currentSensor++;
            }
            rowSet.push(<Row bsClass="SColumn" style={{height: this.state.sensorHeight.toString() + "%"}} key={currentSensor + (Math.random() * (6 - 1) + 1)}>{columnSet}</Row>);
            columnSet = [];
          }
      }
      else {
        while (currentSensor < this.state.sensorQuantity) {
          for (let max = 0; max < 2; max++) {
            columnSet.push(<Col xs={6} id='SensorColumn' key={currentSensor}><Sensor sensor={currentSensor.toString()} height={(this.props.height * .5)} width={(this.props.width * .7)} key={currentSensor} /></Col>);
            currentSensor++;
          }
          rowSet.push(<Row bsClass="SColumn" style={{height: this.state.sensorHeight.toString() + "%"}} key={currentSensor + (Math.random() * (6 - 1) + 1)}>{columnSet}</Row>);
          columnSet = [];
        }
      }
      this.setState({sensorBlocks: rowSet});
      console.log("Current Sensor: " + currentSensor + "\tColumns: " + columnSet + "\tColumns in State: " + this.state.sensorBlocks);
    }

    getSensorQuantity() {
      const sensorRef = firebase.database().ref("sensors");
      sensorRef.once('value').then((snapshot) => {
        this.setState({sensorQuantity: snapshot.numChildren() - 3});
        console.log("Number of Sensors: " + this.state.sensorQuantity + "\tSensor Height: " + this.state.sensorHeight);
        this.createSensorWindow();
      });
    }

    render() {
      return (
        <Grid bsClass="SensorsWindow" style={{height: this.props.height * 1}}>
        <Row bsClass="SColumn" style={{height: this.state.sensorHeight.toString() + "%"}}>
          <Col xs={6} id='SensorColumn'>
            <Sensor sensor="00" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
          </Col>
          <Col xs={6} id='SensorColumn'>
            <Sensor sensor="01" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
          </Col>
        </Row>
        <Row bsClass="SColumn" style={{height: this.state.sensorHeight.toString() + "%"}}>
          <Col xs={6} id='SensorColumn'>
            <Sensor sensor="02" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
          </Col>
          <Col xs={6} id='SensorColumn'>
            <Sensor sensor="03" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
          </Col>
        </Row>
        <Row bsClass="SColumn" style={{height: this.state.sensorHeight.toString() + "%"}}>
          <Col xs={6} id='SensorColumn'>
            <Sensor sensor="04" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
          </Col>
          <Col xs={6} id='SensorColumn'>
            <Sensor sensor="05" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
          </Col>
        </Row>
        <Row bsClass="SColumn" style={{height: this.state.sensorHeight.toString() + "%"}}>
          <Col xs={6} id='SensorColumn'>
            <Sensor sensor="05" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
          </Col>
          <Col xs={6} id='SensorColumn'>
            <Sensor sensor="05" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
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
