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
        showModal: false
      }

      this.updateDimensions = this.updateDimensions.bind(this);
    }

    let sensorQuantity = 0;
    let sensorHeight = 0;

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

    createSensorWindow() {
      getSensorQuantity(function(){
        sensorHeight = 100 / sensorQuantity;
      });
      console.log("Sensor Height: " + sensorHeight + "\tSensor Quantity: " + sensorQuantity);
    }

    getSensorQuantity() {
      const sensorRef = firebase.database().ref("sensors");
      sensorRef.once('value').then((snapshot) => {
        sensorQuantity = snapshot.numChildren() - 2;
        console.log("Number of Sensors: " + sensorQuantity);
      });
      console.log("Got sensor quantity.\nQuantity: " + sensorQuantity);
    }

    render() {



      createSensorWindow();

      let sensorBlocks = [];
      return (
        <Grid bsClass="SensorsWindow" style={{height: this.props.height * 1}}>
          <Row bsClass="SColumn" style={{height: sensorHeight + "%"}}>
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
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="00" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="01" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
          </Row>
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
              <Sensor sensor="00" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="01" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
          </Row>
          <Row>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="00" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
            <Col xs={6} id="SensorColumn">
              <Sensor sensor="01" height={(this.props.height * .5)} width={(this.props.width * .7)}/>
            </Col>
          </Row>
          <Row id="AirSensors">
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
