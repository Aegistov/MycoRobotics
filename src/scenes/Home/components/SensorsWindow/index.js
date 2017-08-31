import React, { Component } from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import Sensor from './components/Sensor'

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

export default SensorsWindow;
