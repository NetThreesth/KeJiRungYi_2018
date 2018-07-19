import "./base.scss";
import "./flexbox.scss";

import "./scene.scss";
import "./controlPanel.scss";
import "./loginPanel.scss";
import "./messageBoard.scss";
import "./devPanel.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { MessageCenter, EventCenter, Event } from './MessageCenter';
import { Scene } from './Scene';
import { DevPanel } from './DevPanel';
import { LoginPanel } from './LoginPanel';
import { ControlPanel } from './ControlPanel';
import { MessageBoard } from './MessageBoard';
import { CommonUtility } from './CommonUtility';


const isdev = CommonUtility.getQueryString('isdev');
if (!isdev) console.info = console.debug = console.log = () => { };


const eventCenter = new EventCenter();
const messageCenter = new MessageCenter(eventCenter);

ReactDOM.render(
    <div>
        <Scene eventCenter={eventCenter} />
        <DevPanel eventCenter={eventCenter} />
        <LoginPanel eventCenter={eventCenter} />
        <MessageBoard messageCenter={messageCenter} />
        <ControlPanel messageCenter={messageCenter} eventCenter={eventCenter} />
    </div>,
    document.getElementById("app")
);
