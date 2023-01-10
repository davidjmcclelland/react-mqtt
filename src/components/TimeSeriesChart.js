import React from "react";
import "../App.css";

import { TimeSeries } from "pondjs";
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  Baseline,
  Resizable,
} from "react-timeseries-charts";

import baselines_docs from "./baselines_docs.md";
import baselines_thumbnail from "./baselines_thumbnail.png";

// Data
const data = require("./usd_vs_euro.json");
const points = data.widget[0].data.reverse();
const series = new TimeSeries({
  name: "USD_vs_EURO",
  columns: ["time", "value"],
  points,
});
const style = {
  value: {
    stroke: "#a02c2c",
    opacity: 0.2,
  },
};

const baselineStyle = {
  line: {
    stroke: "steelblue",
    strokeWidth: 1,
    opacity: 0.4,
    strokeDasharray: "none",
  },
  label: {
    fill: "steelblue",
  },
};

const baselineStyleLite = {
  line: {
    stroke: "steelblue",
    strokeWidth: 1,
    opacity: 0.5,
  },
  label: {
    fill: "steelblue",
  },
};

const baselineStyleExtraLite = {
  line: {
    stroke: "steelblue",
    strokeWidth: 1,
    opacity: 0.2,
    strokeDasharray: "1,1",
  },
  label: {
    fill: "steelblue",
  },
};
class TimeSeriesChart extends React.Component {
  state = {
    tracker: null,
    timerange: series.range(),
  };

  handleTrackerChanged = (tracker) => {
    this.setState({ tracker });
  };

  handleTimeRangeChange = (timerange) => {
    this.setState({ timerange });
  };

  render() {
    return (
      <Resizable>
        <ChartContainer
          title="Euro price (USD)"
          titleStyle={{ fill: "#555", fontWeight: 500 }}
          timeRange={series.range()}
          format="%b '%y"
          timeAxisTickCount={5}
        >
          <ChartRow height="150">
            <YAxis
              id="price"
              label="Price ($)"
              min={series.min()}
              max={series.max()}
              width="60"
              format="$,.2f"
            />
            <Charts>
              <LineChart axis="price" series={series} style={style} />
              <Baseline
                axis="price"
                style={baselineStyleLite}
                value={series.max()}
                label="Max"
                position="right"
              />
              <Baseline
                axis="price"
                style={baselineStyleLite}
                value={series.min()}
                label="Min"
                position="right"
              />
              <Baseline
                axis="price"
                style={baselineStyleExtraLite}
                value={series.avg() - series.stdev()}
              />
              <Baseline
                axis="price"
                style={baselineStyleExtraLite}
                value={series.avg() + series.stdev()}
              />
              <Baseline
                axis="price"
                style={baselineStyle}
                value={series.avg()}
                label="Avg"
                position="right"
              />
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    );
  }
}

// Export example
export default TimeSeriesChart;