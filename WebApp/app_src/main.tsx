import "./common/site.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { MessageCenter, EventCenter, Event } from './common/MessageCenter';
import { Scene } from './components/Scene';
import { DevPanel } from './components/DevPanel';
import { LoginPanel } from './components/LoginPanel';
import { ControlPanel } from './components/ControlPanel';
import { MessageBoard } from './components/MessageBoard';
import { ProjectInfo } from './components/ProjectInfo';

import { CommonUtility } from './common/CommonUtility';



const isdev = CommonUtility.getQueryString('isdev');
if (!isdev) console.info = console.debug = console.log = () => { };


const eventCenter = new EventCenter();
const messageCenter = new MessageCenter(eventCenter);

const App = () => (
    <div>
        <Scene eventCenter={eventCenter} />
        <DevPanel eventCenter={eventCenter} />
        <LoginPanel eventCenter={eventCenter} />
        <MessageBoard messageCenter={messageCenter} eventCenter={eventCenter} />
        <ControlPanel messageCenter={messageCenter} eventCenter={eventCenter} />
        <ProjectInfo />
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById("app")
);