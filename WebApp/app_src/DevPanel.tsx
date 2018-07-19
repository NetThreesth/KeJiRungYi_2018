import * as React from "react";
import { EventCenter, Event } from './MessageCenter';
import { CommonUtility } from './CommonUtility';


export class DevPanel
    extends React.Component<{ eventCenter: EventCenter }, DevPanelData> {

    state = {} as DevPanelData;


    render() {
        return <div id="devPanel">
            <table>
                <tbody>
                    <tr>
                        <td>FPS</td>
                        <td>{this.state.fps}</td>
                    </tr>
                    <tr>
                        <td>LSPerformance</td>
                        <td>{this.state.linesystemPerformance}</td>
                    </tr>
                    <tr>
                        <td>Coordinate</td>
                        <td>{this.state.coordinate}</td>
                    </tr>
                    <tr>
                        <td>GreenMask</td>
                        <td>{this.state.greenMask}</td>
                    </tr>
                </tbody>
            </table>
        </div>;
    };

    componentDidMount() {
        if (!CommonUtility.getQueryString('isdev')) return;

        this.props.eventCenter.on<DevPanelData>(Event.UpdateDevPanelData, data => {
            if (Object.keys(data).some(key => this.state[key] !== data[key]))
                this.setState(Object.assign({}, this.state, data));
        });
    };
};

export interface DevPanelData {
    fps: string;
    coordinate: string;
    linesystemPerformance: string;
    greenMask: string;
};