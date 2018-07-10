import React, {Component} from 'react';
import './App.css';
import Chart from './components/Chart';
import test from './data/test.json';
import {sumData, transformData} from "./utils";
import {csv} from 'd3-request';
import Scatterplot from './components/scatterplot';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    csv('./data/elements-by-episode.csv', (error, data) => {
      if (error) {
        this.setState({loadError: true});
      }
      this.setState({
        data: data.map(d => ({...d, x: Number(d.APPLE_FRAME), y: Number(d.BARN)}))
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