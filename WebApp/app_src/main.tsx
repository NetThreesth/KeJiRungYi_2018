import "./common/site.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { MessageCenter, EventCenter, Event } from './common/MessageCenter';
import { Scene } from './Scene';
import { DevPanel } from './DevPanel';
import { LoginPanel } from './LoginPanel';
import { ControlPanel } from './ControlPanel';
import { MessageBoard } from './MessageBoard';
import { CommonUtility } from './common/CommonUtility';



const isdev = CommonUtility.getQueryString('isdev');
if (!isdev) console.info = console.debug = console.log = () => { };


const eventCenter = new EventCenter();
const messageCenter = new MessageCenter(eventCenter);

ReactDOM.render(
    <div>
        <Scene eventCenter={eventCenter} />
        <DevPanel eventCenter={eventCenter} />
        <LoginPanel eventCenter={eventCenter} />
        <MessageBoard messageCenter={messageCenter} eventCenter={eventCenter} />
        <ControlPanel messageCenter={messageCenter} eventCenter={eventCenter} />
    </div>,
    document.getElementById("app")
);