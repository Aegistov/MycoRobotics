import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import Chart from './components/Chart/index.js';
import * as firebase from 'firebase';
import './style.css';

class Sensor extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      showModal: false,
      currentRead: 0,
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggleChart = this.toggleChart.bind(this);
    this.getCurrentRead = this.getCurrentRead.bind(this);
  }

  componentDidMount() {
    this.getCurrentRead();
  }

  getCurrentRead() {
    let tempRead = 0;
    const sensorRef = firebase.database().ref("sensors").child(this.props.sensor);
    sensorRef.on('child_added', (snapshot, prevChildKey) => {
      let newChild = snapshot.val();
      let keyHolder = '';
      console.log("New Child: " + newChild);
      console.log("New Child Temp: " + newChild.temp);
      Object.keys(newChild).forEach(function(key) {
        if (key !== "time"){
        console.log("test123");  
	console.log("Key within: " + key);
          keyHolder = key;
          console.log("Key Holder: " + keyHolder);
        }
        tempRead = newChild[keyHolder];
      });
      console.log("Temp read: " + tempRead);
      this.setState({currentRead: tempRead});
      console.log("State: " + this.state.currentRead);
    });

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
        
	<h3>{this.props.sensor}</h3>
	<p id="bvalue"> 
        <img src="https://image.flaticon.com/icons/png/512/63/63581.png" alt="temp" /> 
	{this.state.currentRead}℉
        
	</p>
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

export default Sensor;
