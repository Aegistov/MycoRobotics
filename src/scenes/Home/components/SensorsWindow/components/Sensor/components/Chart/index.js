import React, { Component } from 'react';
import * as firebase from 'firebase';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import './Chart.css'


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
      let dbDataPoints = snapshot.val();
      let dataPoints = [];
      console.log(dbDataPoints);
      Object.keys(dbDataPoints).forEach(function(idx) {
        dataPoints.push(dbDataPoints[idx]);
      });
      this.setState({
        dataPoints,
        dataKey: keyHolder
      })
      this.state.dataPoints.forEach(function(value){ console.log("Time: " + value.time + "\tTemp: " + value.temp + "\tValue: " + value); })
      console.log("Stored Values: " + this.state.dataPoints + "\tStored Key: " + this.state.dataKey);
    });
  }
  componentWillUnmount() {
    console.log("Unmounting chart")
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

export default Chart;
