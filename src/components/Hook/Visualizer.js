import React, { useEffect, useState } from "react";
import { Card } from "antd";
import TimeSeriesChart from "../TimeSeriesChart";
import moment from "moment";

// TODO: change legend to show device name instead of topic
// TODO: put topic in Visualizer title
// TODO: fix warning index.js:1 Warning: Failed prop type: The prop `data[0].id` is marked as required in `Ge`, but its value is `undefined`.
// TODO: fix warning Error: <path> attribute d: Expected moveto path command ('M' or 'm'), "null".
// TODO: format date
// TODO: limit ticks to 2 or 4
// TODO: format value scale to readable values
// TODO: fix tooltips floating in chart
// TODO: keep series color constant
// TODO: allow card to expand to fullscreen
// TODO: toggle multiple series from MQTT source data
// TODO: add a zoom brush

let titleTopic = "";
let deviceName;
const Visualizer = ({ payload }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (payload.topic) {
      titleTopic = `${payload.topic} Visualizer`;
      let rawMessage = JSON.parse(payload.message);
      deviceName = rawMessage.deviceName;
      console.log(deviceName);
      if (deviceName === "Random-UnsignedInteger-Device") {
        let yValue = rawMessage.readings[0].value;
        yValue = parseInt(yValue.substring(0, 1), 10);
        let chartDate = moment().format("YYYY-mm-DD hh:mm:s.SSS");
        let message = {
          x: chartDate,
          y: yValue,
        };
        console.log(chartDate);

        setMessages((messages) => [...messages, message]);
      }
    }
  }, [payload]);

  return (
    <Card title={titleTopic} id="visualizer">
      <div style={{ height: 480 }}>
        <TimeSeriesChart mqtt={messages} seriesName={deviceName} />
      </div>
    </Card>
  );
};

export default Visualizer;
