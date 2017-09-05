import React, { Component } from 'react';
import * as firebase from 'firebase';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ReferenceLine } from 'recharts';
import './Chart.css'
import * as moment from 'moment';
import * as d3_scale from 'd3-scale';
import * as d3_time from 'd3-time';

const getTicks = (data) => {
	if (!data || !data.length ) {return [];}
  
  const domain = [new Date(data[0].timestamp), new Date(data[data.length - 1].timestamp)];
	const scale = d3_scale.scaleTime().domain(domain).range([0, 1]);
  const ticks = scale.ticks(d3_time.timeDay, 1);
  
  return ticks.map(entry => +entry);
};

const getTicksData = (data, ticks) => {
	if (!data || !data.length ) {return [];}
  const dataMap = new Map(data.map((i) => [i.time, i]));
  ticks.forEach(function (item, index, array) {
  	if(!dataMap.has(item)) {
    	data.push({time: item});
    }
	});
  return data;
}

const dateFormat = (time) => {
	return moment(time).format('hh:mm');
};

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      dataPoints: [],
      maxTemp: 80,
    }
  }
  componentDidMount() {
    console.log(this.props.sensor);
    const sensorRef = firebase.database().ref("sensors").child(this.props.sensor);
    sensorRef.on('value', (snapshot) => {
      let dbDataPoints = snapshot.val();
      let dataPoints = [];
      Object.keys(dbDataPoints).forEach(function(singleTemp) {
        dataPoints.push({
          ...dbDataPoints[singleTemp],
          time: moment(new Date(dbDataPoints[singleTemp].timestamp)).format('MM/DD hh:mm:ss')
        });
      });
      this.setState({ dataPoints });
    });

  }

  render() {
    console.log('logging ticks');
    console.log(this.state.dataPoints)
    let first = this.state.dataPoints[0];
    // console.log(new Date());
    console.log(first);
    if (first) console.log(moment(first.time, 'MM/DD hh:mm:ss').toDate())
    const sortedData = this.state.dataPoints.sort(function(a, b) {
  		return a.timestamp - b.timestamp;
		});
    const ticksArr = getTicks(sortedData);
    const completeData = getTicksData(sortedData, ticksArr);
    
    console.log(completeData);
    
    // const completeSortedData = completeData.sort(function(a, b) {
  	// 	return a.timestamp - b.timestamp;
		// });
    console.log(ticksArr);
    const formattedTicks = ticksArr.map(dateFormat);
  	console.log(formattedTicks);

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
          <XAxis dataKey="time" ticks={ticksArr} tickCount={ticksArr.length} tickFormatter={dateFormat}/>
          <YAxis type="number" domain={['dataMin - 5', 'dataMax + 5']}/>
          <ReferenceLine y={this.state.maxTemp} label="Max" stroke="red" strokeDasharray="3 3" />
        </LineChart>
      </div>
    );
  }
}

export default Chart;