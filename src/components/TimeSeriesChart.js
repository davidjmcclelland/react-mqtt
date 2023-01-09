import React from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryTooltip,
} from "victory";
class TimeSeriesChart extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    let mqtt;
    if (this.props && this.props.mqtt) {
      console.log(this.props.mqtt);
      mqtt = this.props.mqtt;
    };
    return (
      <div>
        <VictoryChart
          width={550}
          height={280}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              responsive={true}
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "tomato" },
            }}
            labelComponent={<VictoryTooltip />}
            data={mqtt}
          />
        </VictoryChart>

        <VictoryChart
          width={550}
          height={90}
          scale={{ x: "time" }}
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          containerComponent={
            <VictoryBrushContainer
              responsive={false}
              brushDimension="x"
              brushDomain={this.state.selectedDomain}
              onBrushDomainChange={this.handleBrush.bind(this)}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "tomato" },
            }}
            data={mqtt}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default TimeSeriesChart;
