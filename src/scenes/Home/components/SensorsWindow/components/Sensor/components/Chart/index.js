import React, { Component } from 'react';
import * as firebase from 'firebase';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ReferenceLine } from 'recharts';
import './Chart.css'


class Chart extends Component {
  constructor() {
    super();
    this.state = {
      dataPoints: []
    }
  }
  componentDidMount() {
    console.log(this.props.sensor);
    const sensorRef = firebase.database().ref("sensors").child(this.props.sensor);
    sensorRef.on('value', (snapshot) => {
      let dbDataPoints = snapshot.val();
      let dataPoints = [];
      Object.keys(dbDataPoints).forEach(function(singleTemp) {
        dataPoints.push(dbDataPoints[singleTemp]);
      });
      this.setState({ dataPoints });
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
            dataKey="temp"
            stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis type="number" domain={['dataMin - 5', 'dataMax + 5']}/>
          <ReferenceLine y={50} label="Max" stroke="red" strokeDasharray="3 3" />
        </LineChart>
      </div>
    );
  }
}

export default Chart;