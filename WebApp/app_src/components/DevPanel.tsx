import * as React from "react";
import { CommonUtility } from '../common/CommonUtility';
import { connect } from 'react-redux';
import { DevPanelData } from '../models/DevPanelData';



export const AddLogEvent = 'AddLogEvent';

import "./DevPanel.scss";

class DevPanelView
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




const mapStateToProps: (state: any) => DevPanelData = (state) => {
    const props = state.devPanelData as DevPanelData;
    props.log = state.log;
    return props;
};

export const DevPanel = connect(
    mapStateToProps
)(DevPanelView);