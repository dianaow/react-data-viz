import React, {Component} from 'react';
import './App.css';
import Chart from './components/Chart';
import {sumData, transformData} from "./utils";
import {csv} from 'd3-request';
import csvFile from './data/elements-by-episode.csv';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    csv(csvFile, (error, data) => {
      if (error) {
        this.setState({loadError: true});
      }
      const skipColumns = ["EPISODE", "TITLE"];
      let chartData = [];
      data.forEach(episode => {
        data.columns.forEach(column => {
          if(skipColumns.includes(column)) return;
          const chartColumns = chartData.filter(cd => cd.x==column);
          if(chartColumns.length==0) {
            const chartColumn = {
              episodes: [{
                episode: episode["EPISODE"],
                title: episode["TITLE"],
                value: Number(episode[column])
              }],
              x: column,
              y: Number(episode[column])
            }
            chartData.push(chartColumn);
          } else {
            const chartColumn = chartColumns[0];
            chartData = chartData.map(cc => {
              if(cc.x!=column) return cc;
              return {
                episodes: [...cc.episodes, {
                  episode: episode["EPISODE"],
                  title: episode["TITLE"],
                  value: Number(episode[column])
                }],
                x: cc.x,
                y: cc.y+Number(episode[column])
              }
            });
          }
        });
      });
      chartData = chartData.map(cd => ({x: `${cd.x} (${cd.y})`, y: cd.y, episodes: cd.episodes, key: cd.x}));
      this.setState({
        data: chartData
      });
    })
  }

  render() {

    if (this.state.loadError) {
      return <div>couldn't load file</div>;
    }

    if (!this.state.data) {
      return <div />;
    }

    return ( 

      <div className="App">
        <Chart data={this.state.data}/>
      </div>

    )
  }

}

export default App;