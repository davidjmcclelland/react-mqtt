import React, {useState} from "react";
import { Line } from '@ant-design/plots'
import _ from "lodash"; 

const TimeSeriesChart = ({ mqtt, seriesName }) => {
  
  const data = mqtt;
  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
    seriesField: "deviceName",
    xAxis: {
      nice: true,
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: "#aaa",
        },
        length: 5,
      },
      grid: {
        line: {
          style: {
            stroke: "#ddd",
            lineDash: [4, 2],
          },
        },
        alternateColor: "rgba(0,0,0,0.05)",
      },
    },
    yAxis: {
      label: {
        autoRotate: false,
        style: {
          fill: "#aaa",
          fontSize: 12,
        },
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
      title: {
        text: "Random Integer Generators",
        style: {
          fontSize: 16,
        },
      },
      line: {
        style: {
          stroke: "#aaa",
        },
      },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: "#aaa",
        },
        length: 5,
      },
      grid: {
        line: {
          style: {
            stroke: "#ddd",
            lineDash: [4, 2],
          },
        },
        alternateColor: "rgba(0,0,0,0.05)",
      },
    },
    smooth: true,
    point: {
      size: 5,
      shape: (item) => {
        if (item.deviceName === "Random-UnsignedInteger-Device") {
          return {
            shape: "circle",
          };
        }
        return "diamond";
      },
    },
    annotations: [
      {
        type: "line",
        start: ["0%", "10%"],
        end: ["100%", "10%"],
        top: true,
        style: {
          stroke: "l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
          lineWidth: 2,
        },
      },
      {
        type: "region",
        start: ["0%", "0%"],
        end: ["20%", "10%"],
        top: true,
        style: {
          fill: "#1890ff",
          fillOpacity: 1,
          opacity: 1,
        },
      },
      {
        type: "text",
        position: ["10%", "5%"],
        content: "MQTT Stream Data",
        style: {
          fill: "#fff",
          fontSize: 12,
          textAlign: "center",
          textBaseline: "middle",
          shadowColor: "#000",
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          shadowBlur: 2,
        },
      },
      {
        type: "line",
        start: ["min", "median"],
        end: ["max", "median"],
        style: {
          stroke: "Turquoise",
          lineDash: [4, 2],
        },
      },
    ],
    legend: {
      position: "top-left",
      itemName: {
        style: {
          fill: "#000",
        },
        formatter: (name) => name,
      },
    },
    meta: {
      year: {
        range: [0, 1],
      },
    },
    color: ["#1979C9", "#D62A0D", "#FAA219"],
    lineStyle: ({ deviceName }) => {
      if (deviceName === "Random-UnsignedInteger-Device") {
        return {
          lineDash: [4, 4],
          opacity: 1,
        };
      }
    },
/*     slider: {
      start: 0,
      end: 1,
    }, */
  };
  return <Line {...config} />;
};

export default TimeSeriesChart;
