import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import Chart from './components/Chart/index.js';
import './style.css';

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
        <h3>{this.props.sensor}</h3>
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

export default Sensor;
