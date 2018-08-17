import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries} from 'react-vis';

class Chart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentSelected: null
        }

        this.clearCurrentSelection = this.clearCurrentSelection.bind(this);
        this.setCurrentSelected = this.setCurrentSelected.bind(this);
    }

    clearCurrentSelection() {
        this.setState({
            currentSelected: null
        });
    }

    setCurrentSelected(data) {
        this.setState({
            currentSelected: data
        });
    }

    render() {
        const dataArr = this.props.data;
    
        return (
            <React.Fragment>
                <XYPlot
                    xType="ordinal"
                    width={1600}
                    height={700}
                    margin={{
                        left: 70,
                        right: 10,
                        bottom: 300,
                        top: 20
                    }}>
                    <HorizontalGridLines />
                    <VerticalBarSeries
                            data={dataArr}
                            style={{stroke: 'black', strokeWidth: 1}}
                            onValueMouseOver={(datapoint, event)=>{
                                this.setCurrentSelected(datapoint);
                            }}/>
                    <XAxis tickLabelAngle={-90} />
                    <YAxis />
                </XYPlot>
                {this.state.currentSelected && (
                    <React.Fragment>
                        <h2>{this.state.currentSelected.key}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Episode</th>
                                    <th>Title</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(this.state.currentSelected.episodes || []).filter(episode => episode.value>0).map(episode => (
                                    <tr>
                                        <td>{episode.episode}</td>
                                        <td>{episode.title}</td>
                                        <td>{episode.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

export default Chart;