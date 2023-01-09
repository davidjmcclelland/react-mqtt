import React from "react";
import { ResponsiveLine } from "@nivo/line";

const TimeSeriesChart = ({ mqtt, seriesName }) => {

    
  let seriesId = seriesName || 'no data';
  mqtt = mqtt || [{ x: 0, y: -1 }]

  const chartData = [];
  chartData.push({
    id: seriesId,
    color: "hsl(135, 70%, 100%)",
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
      xScale={{
        type: "time",
        format: "%Y-%m-%d %H:%M:%S.%L",
        useUTC: false,
        precision: "millisecond",
      }}
      xFormat="time:%Y-%m-%d %H:%M:%S.%L"
      yScale={{
        type: "linear",
        stacked: false,
      }}
      axisLeft={{
        legend: "linear scale",
        legendOffset: 12,
      }}
      axisBottom={{
        format: ".%L",
        legend: "time scale",
        legendOffset: -12,
      }}
      curve="cardinal"
      enablePointLabel={true}
      pointSize={16}
      pointBorderWidth={1}
      pointBorderColor={{
        from: "color",
        modifiers: [["darker", 0.3]],
      }}
      useMesh={true}
      enableSlices={false}
    />
  );
}

export default TimeSeriesChart;