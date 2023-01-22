import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import TimeSeriesChart from "../TimeSeriesChart";
import moment from "moment";

let titleTopic = '';
let deviceName;
  
const Visualizer = ({ payload }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (payload.topic) {
      try {
        titleTopic = `${payload.topic} Visualizer`;
        //console.log(`payload: ${payload.message}`);
        let rawMessage = JSON.parse(payload.message);
        //console.log(`raw: ${rawMessage}`);
        let xVal = parseInt(rawMessage.readings[0].value.x, 10);
        let yVal = parseInt(rawMessage.readings[0].value.y, 10);
        let zVal = parseInt(rawMessage.readings[0].value.z, 10);
        //console.log(`val: ${xVal}, ${yVal}, ${zVal}`);
        deviceName = rawMessage.deviceName;
        //console.log(deviceName);
        if (deviceName.indexOf('integer') > -1) {
            //yValue = parseInt(yValue.substring(1, 2), 10);
          //console.log(`yValue: ${yValue} ${typeof yValue}`);
          let chartDate = moment().format('hh:mm:s.SSS');
          let messageX = {
            deviceName: "X-Axis",
            year: chartDate,
            value: xVal,
          };
          let messageY = {
            deviceName: "Y-Axis",
            year: chartDate,
            value: yVal,
          };
          let messageZ = {
            deviceName: "Z-Axis",
            year: chartDate,
            value: zVal,
          };
          //console.log(messageX);
          if(messages.length > 40) {
            messages.shift();
            messages.shift();
            messages.shift();
          }
          setMessages((messages) => [...messages, messageX, messageY, messageZ]);
          //console.log(messages.length);
        }
      } catch (error) {
        console.error(error, 'Unexpected message format');
      }
    }
  }, [payload])
  
  return (
    <Card title={titleTopic} id="visualizer">
      <div>
        <TimeSeriesChart mqtt={messages} seriesName={deviceName} />
      </div>
    </Card>
  );
}

export default Visualizer;
