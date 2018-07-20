import * as React from "react";
import { EventCenter, Event } from './MessageCenter';
import { CommonUtility } from './CommonUtility';

export const AddLogEvent = 'AddLogEvent';

export class DevPanel
    extends React.Component<{ eventCenter: EventCenter }, DevPanelData> {

    private isdev = CommonUtility.getQueryString('isdev');
    state = { log: [] } as DevPanelData;

    constructor(props) {
        super(props);

        if (!this.isdev) return;

        const eventCenter = this.props.eventCenter;

        eventCenter.on<DevPanelData>(Event.UpdateDevPanelData, data => {
            if (Object.keys(data).some(key => this.state[key] !== data[key]))
                this.setState(Object.assign({}, this.state, data));
        });

        eventCenter.on<string>(AddLogEvent, log => {
            this.state.log.push(log);
            if (this.state.log.length > 3) this.state.log.shift();
            this.setState(Object.assign({}, this.state));
        });
    };

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
                    <tr>
                        <td colSpan={2}>{this.renderLog()}</td>
                    </tr>
                </tbody>
            </table>
        </div>;
    };

    private renderLog() {
        const lis = this.state.log.map(e => <li>{e}</li>);
        return <ul>{lis}</ul>;
    };

    componentDidMount() {
        if (!this.isdev) return;
        $('#devPanel').show();
    };
};

export interface DevPanelData {
    fps: string;
    coordinate: string;
    linesystemPerformance: string;
    greenMask: string;
    log: string[];
};