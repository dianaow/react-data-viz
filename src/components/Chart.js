import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

const Chart = (props) => {

  const dataArr = props.data

  //console.log(dataArr);

  return (
      <XYPlot
          xType="ordinal"
          width={1000}
          height={500}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <LineSeries
                  data={dataArr}
                  style={{stroke: 'violet', strokeWidth: 3}}/>
      </XYPlot>
  );
}

export default Chart;