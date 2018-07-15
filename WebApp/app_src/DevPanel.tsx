import * as React from "react";
import { EventCenter, Event } from './MessageCenter';
import { CommonUtility } from './CommonUtility';


export class DevPanel
    extends React.Component<{ eventCenter: EventCenter }, DevPanelData> {

    state = { fps: '', coordinate: '', greenMask: '' };

    constructor(props) {
        super(props);
        this.props.eventCenter.on<DevPanelData>(Event.UpdateDevPanelData, data => {
            this.setState({
                fps: data.fps || this.state.fps,
                coordinate: data.coordinate || this.state.coordinate,
                greenMask: data.greenMask || this.state.greenMask
            });
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
        const isdev = CommonUtility.getQueryString('isdev');
        if (!isdev) return;
        $('#devPanel').show();
    };
};

export interface DevPanelData {
    fps: string;
    coordinate: string;
    greenMask: string;
};