import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import TimeSeriesChart from "../TimeSeriesChart";
import moment from "moment";
import _ from 'lodash';

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
      if (deviceName.indexOf('Integer') > -1) {
        let yValue = rawMessage.readings[0].value;
            yValue = parseInt(yValue.substring(1, 2), 10);
        console.log(`yValue: ${yValue} ${typeof yValue}`);
        let chartDate = moment().format('hh:mm:s.SSS');
        let message = {
          deviceName: deviceName,
          year: chartDate,
          value: yValue
        };
        console.log(message);
        if(messages.length > 20) {
          messages.shift();
        }
        setMessages((messages) => [...messages, message]);
        console.log(messages.length);
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
