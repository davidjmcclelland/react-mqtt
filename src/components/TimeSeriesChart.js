import React from "react";
import { Line } from '@ant-design/charts'
import _ from "lodash"; 

const TimeSeriesChart = ({ mqtt, seriesName }) => {
 
  const data = mqtt;
  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };
  return <Line {...config} />;
};

export default TimeSeriesChart;
