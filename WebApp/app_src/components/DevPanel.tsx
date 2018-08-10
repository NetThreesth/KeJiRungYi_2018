import * as React from "react";
import { EventCenter, Event } from '../common/MessageCenter';
import { CommonUtility } from '../common/CommonUtility';
import { connect } from 'react-redux';



export const AddLogEvent = 'AddLogEvent';

import "./DevPanel.scss";

class DevPanel
    extends React.Component<DevPanelData> {




    render() {
        return <div id="devPanel">
            <table>
                <tbody>
                    <tr>
                        <td>FPS</td>
                        <td>{this.props.fps}</td>
                    </tr>
                    <tr>
                        <td>LSPerformance</td>
                        <td>{this.props.linesystemPerformance}</td>
                    </tr>
                    <tr>
                        <td>Coordinate</td>
                        <td>{this.props.coordinate}</td>
                    </tr>
                    <tr>
                        <td>GreenMask</td>
                        <td>{this.props.greenMask}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}><ul>{
                            this.props.log.map(e => <li>{e}</li>)
                        }</ul></td>
                    </tr>
                </tbody>
            </table>
        </div>;
    };



    componentDidMount() {
        if (CommonUtility.getQueryString('isdev'))
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


const mapStateToProps: (state: any) => DevPanelData = (state) => {
    const props = state.devPanelData as DevPanelData;
    props.log = state.log;
    return props;
};

export const devPanel = connect(
    mapStateToProps
)(DevPanel);