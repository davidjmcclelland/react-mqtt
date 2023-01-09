import React, { useEffect, useState } from 'react';
import { Card, List } from 'antd';
import LineChart from "./LineChart";

const Visualizer = ({ payload }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (payload.topic) {
      let rawMessage = JSON.parse(payload.message);
      let deviceName = rawMessage.deviceName;
      console.log(deviceName);
      if (deviceName === 'Random-UnsignedInteger-Device') {
        let message = {
          y: rawMessage.readings[0].value,
          x: Date.now(),
        };
        console.log(rawMessage);

        setMessages((messages) => [...messages, message]);
      }
    }
  }, [payload])
 
  return (
    <Card title="Visualizer">
      <div style={{ height: 200 }}>
        <LineChart mqtt={messages} topic={payload.topic} />
      </div>
    </Card>
  );
}

export default Visualizer;
