import * as React from "react";
import * as ReactDOM from "react-dom";


import { MessageCenter, EventCenter,Event } from './MessageCenter';

import { Scene } from './Scene';
import { DevPanel } from './DevPanel';
import { LoginPanel } from './LoginPanel';
import { ControlPanel } from './ControlPanel';
import { MessageBoard } from './MessageBoard';


const eventCenter = new EventCenter();
const messageCenter = new MessageCenter(eventCenter);

// this.observable.trigger('add');

/* afterWordCardsAnimation={scene.transformation.bind(scene)}
afterLogin={() => {
    $('.control-panel').removeClass('invisible').addClass('visible');
    scene.zoomIn.bind(scene)();
}} /> */

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
