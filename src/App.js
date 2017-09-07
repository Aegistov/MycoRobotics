import React, { Component } from 'react';
import './App.css';
import Home from './scenes/Home';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { TimeSeries } from "pondjs";
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  AreaChart
} from "react-timeseries-charts";

// const config = {
//     apiKey: "AIzaSyDlPyqOgzi6kJVZiL6dcsGBiOTdEoQce6c",
//     authDomain: "shroom-iot.firebaseapp.com",
//     databaseURL: "https://shroom-iot.firebaseio.com",
//     projectId: "shroom-iot",
//     storageBucket: "shroom-iot.appspot.com",
//     messagingSenderId: "190253158967"
//   };

var config = {
    apiKey: "AIzaSyAEXhHEhACdtYi0X2IQNJN-jOj9WH894ak",
    authDomain: "ai-story-teller-big.firebaseapp.com",
    databaseURL: "https://ai-story-teller-big.firebaseio.com",
    projectId: "ai-story-teller-big",
    storageBucket: "ai-story-teller-big.appspot.com",
    messagingSenderId: "387719186830"
  };
firebase.initializeApp(config);



class SensorUtility extends Component {
  constructor() {
    super();
    this.state = {}
  }
}

class MyChart extends Component {
  constructor() {
    super();
    this.state = {
      dataPoints: [],
      maxTemp: 80,
      series: new TimeSeries({
        name: "USD_vs_EURO",
        columns: ["time", "value"],
        points: [],
        maxTime: Date.now()
      })
    }
    this.changeTime = this.changeTime.bind(this);
  }
  changeTime(hours) {
    let { dataPoints } = this.state;
    let now = Date.now();
    let max = moment(this.state.maxTime);
    // data
    console.log(max.format("YYYY MM DD"))
    // console.log(moment(this.state.maxTime).subtract(7, 'days').format("YYYY MM DD"))
    console.log(max.subtract(hours, 'hours').format("YYYY MM DD"))
    console.log(max.format("YYYY MM DD"));
    console.log(+max);
    dataPoints = dataPoints.filter((val) => {
      return val[0] != +max && val[1] != 0;
    })
    console.log(dataPoints);
    dataPoints.unshift([+max, 0])
    dataPoints.sort((a, b) => {
      return a[0] - b[0]
    })
    const series = new TimeSeries({
      name: "USD_vs_EURO",
      columns: ["time", "value"],
      points: dataPoints
  });

    this.setState({
      dataPoints,
      series
    });
    // dataPoints.push([]);
  }
  componentDidMount() {
    console.log("00_m");
    const sensorRef = firebase.database().ref("sensors").child("00_m");
    sensorRef.on('value', (snapshot) => {
      let dbDataPoints = snapshot.val();
      let dataPoints = [];
      let maxTime = 0;

      Object.keys(dbDataPoints).forEach(function(singleTemp) {
        if (dbDataPoints[singleTemp].timestamp > maxTime) {
          maxTime = dbDataPoints[singleTemp].timestamp;
        }
        dataPoints.push([
          dbDataPoints[singleTemp].timestamp,
          dbDataPoints[singleTemp].temp
        ]);
      });
      console.log(dataPoints);
      const series = new TimeSeries({
        name: "USD_vs_EURO",
        columns: ["time", "value"],
        points: dataPoints
    });
    console.log(series.timerange());
      this.setState({ dataPoints, series, maxTime });
    });
  }
  render() {
    if (this.state.series.timerange() === undefined) {
      return (<div>Nothing</div>)
    }
    return (
      <div>
        <button onClick={() => this.changeTime(0)}>0 Hours</button>
        <button onClick={() => this.changeTime(1)}>10 Hours</button>
        <button onClick={() => this.changeTime(24)}>24 Hours</button>
        <ChartContainer timeRange={this.state.series.timerange()} width={800}>
          <ChartRow height="200">
              <YAxis id="axis1" label="AUD" min={70} max={85} width="60" type="linear" />
              <Charts>
                  <LineChart axis="axis1" series={this.state.series}/>
                  <AreaChart
                    axis="axis1"
                    series={this.state.series}
                    columns={{up: ["value"]}}
                    interpolation="curveBasis"
                    fillOpacity={0.4} />
              </Charts>
          </ChartRow>
      </ChartContainer>
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <MyChart />
        <Home />
      </div>
    );
  }
}

export default App;
