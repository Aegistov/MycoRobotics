import React, { Component } from 'react';
import * as firebase from 'firebase';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

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
      Object.keys(allDataPoints).forEach(function(singlePoint) {
        container.push(allDataPoints[singlePoint]);
        let test = allDataPoints[singlePoint];
        console.log("Key: " + singlePoint);
        Object.keys(allDataPoints[singlePoint]).forEach(function(key) {
          if (key !== "time"){
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
      this.state.dataPoints.forEach(function(value){ console.log("Time: " + value.time + "\tTemp: " + value.singlePoint + "\tValue: " + value); })
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

export default Chart;
