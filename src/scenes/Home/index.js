import React, { Component } from 'react';
import {PageHeader, Grid, Row, Col, Modal, Button, Navbar, Nav, NavItem} from 'react-bootstrap';
import SensorsWindow from './components/SensorsWindow';
import './style.css';
class Home extends Component {
  constructor() {
    super();
    this.state = {
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
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
      this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  render() {
    return (
      <div>
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
            </Col>
          </Row>
          <Row>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
