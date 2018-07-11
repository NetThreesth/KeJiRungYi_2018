import * as React from "react";
import { EventCenter, Event } from './MessageCenter';

export class DevPanel
    extends React.Component<{ eventCenter: EventCenter }, DevPanelData> {
    state = { fps: '', coordinate: '' };

    render() {
        return <div id="devPanel">
            <table>
                <tbody>
                    <tr>
                        <td>FPS</td>
                        <td>{this.state.fps}</td>
                    </tr>
                    <tr>
                        <td>Coordinate</td>
                        <td>{this.state.coordinate}</td>
                    </tr>
                </tbody>
            </table>
        </div>;
    };
    componentDidMount() {
        $('#devPanel').show();
        this.props.eventCenter.on<DevPanelData>(Event.updateDevPanelData, data => {
            this.setState({ fps: data.fps, coordinate: data.coordinate });
        });
    };
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    };
};

export interface DevPanelData {
    fps: string;
    coordinate: string;
};