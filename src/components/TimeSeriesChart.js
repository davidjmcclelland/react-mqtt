import React, { useState, useEffect, useCallback } from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import schema from "../data/schema.js";
import data from '../data/data';

ReactFC.fcRoot(FusionCharts, TimeSeries);
const chart_props = {
  timeseriesDs: {
    type: "timeseries",
    width: "600",
    height: "400",
    dataEmptyMessage: "Fetching data...",
    dataSource: {
      caption: { text: "Device Values" },
      data: null,
      yAxis: [
        {
          plot: [
            {
              value: "Count",
            },
          ],
        },
      ],
    },
  },
};

function TimeSeriesChart({ mqtt, seriesName }) {
  const [ds, setds] = useState(chart_props);
  console.log(mqtt);
  const loadData = useCallback(async () => {
      const _data = mqtt;
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        _data,
        schema
      );
      const options = { ...ds };
      options.timeseriesDs.dataSource.data = fusionTable;
      setds(options);
  }, []);

  useEffect(() => {
    console.log("render");
    loadData();
  }, [loadData]);

  return (
    <div>
      <ReactFC {...ds.timeseriesDs} />
    </div>
  );
}

export default TimeSeriesChart;
