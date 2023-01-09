import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import LineChart from "./LineChart";
import TimeSeriesChart from "./TimeSeriesChart";
import moment from 'moment';

// DONE: change legend to show device name instead of topic
// DONE: put topic in Visualizer title
// DONE: fix warning index.js:1 Warning: Failed prop type: The prop `data[0].id` is marked as required in `Ge`, but its value is `undefined`.
// TODO: fix warning Error: <path> attribute d: Expected moveto path command ('M' or 'm'), "null".
// TODO: format date
// TODO: limit ticks to 2 or 4
// TODO: format value scale to readable values
// DONE: fix tooltips floating in chart
// TODO: allow card to expand to fullscreen
// TODO: toggle multiple series from MQTT source data

let titleTopic = '';
let deviceName;
const Visualizer = ({ payload }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (payload.topic) {
      titleTopic = `${payload.topic} Visualizer`;
      let rawMessage = JSON.parse(payload.message);
      deviceName = rawMessage.deviceName;
      console.log(deviceName);
      if (deviceName === 'Random-UnsignedInteger-Device') {
        const chartDate = moment().format('YYYY-mm-DD hh:mm:s.SSS');
        let message = {
          y: parseInt(rawMessage.readings[0].value, 10),
          x: chartDate,
        };
        console.log(chartDate);

        setMessages((messages) => [...messages, message]);
      }
    }
  }, [payload])
 
  return (
    <Card title={titleTopic}>
      <div style={{ height: 200 }}>
        <TimeSeriesChart mqtt={messages} seriesName={deviceName} />
      </div>
    </Card>
  );
}

export default Visualizer;
