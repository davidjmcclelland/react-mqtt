import React from "react";
import { ResponsiveLine } from "@nivo/line";

const TimeSeriesChart = ({ mqtt, seriesName }) => {

    
  let seriesId = seriesName || 'no data';
  mqtt = mqtt || [{ x: 0, y: -1 }]

  const chartData = [];
  chartData.push({
    id: seriesId,
    color: "hsl(210, 80%, 50%)",
    data: mqtt,
  });
  console.log(chartData);
  return (
    <ResponsiveLine
      data={chartData}
      /* data={[
        {
          id: "signal A",
          data: [
            { x: "2023-37-09 02:37:37.100", y: 7 },
            {
              x: "2023-37-09 02:37:37.833",
              y: 9,
            },
          ],
        },
        {
          id: "signal B",
          data: [
            { x: "2018-01-01 12:00:01.100", y: 14 },
            { x: "2018-01-01 12:00:01.110", y: 14 },
            { x: "2018-01-01 12:00:01.120", y: 15 },
            { x: "2018-01-01 12:00:01.130", y: 11 },
            { x: "2018-01-01 12:00:01.140", y: 10 },
            { x: "2018-01-01 12:00:01.150", y: 12 },
            { x: "2018-01-01 12:00:01.160", y: 9 },
            { x: "2018-01-01 12:00:01.170", y: 7 },
          ],
        },
      ]} */
      animate={true}
      colors={{ datum: 'color' }}
      dotLabel="y"
      dotLabelYOffset={-12}
      margin={{
        top: 80,
        right: 110,
        bottom: 50,
        left: 80,
      }}
      motionStiffness={90}
      motionDamping={15}
      xScale={{
        type: "time",
        format: "%Y-%m-%d %H:%M:%S.%L",
        useUTC: false,
        precision: "millisecond",
      }}
      xFormat="time:%Y-%m-%d %H:%M:%S.%L"
      yScale={{
        type: "linear",
        stacked: true,
      }}
      minY="auto"
      maxY="auto"
      stacked={true}
      axisLeft={{
        legend: "linear scale",
        legendOffset: -74,
        tickValues: [0, 10],
      }}
      axisBottom={{
        format: ".%L",
        legend: "millis",
        legendOffset: 40,
      }}
      enablePointLabel={true}
      pointSize={16}
      pointBorderWidth={1}
      pointBorderColor={{
        from: "color",
        modifiers: [["darker", 0.3]],
      }}
      useMesh={true}
      enableSlices={false}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}

export default TimeSeriesChart;