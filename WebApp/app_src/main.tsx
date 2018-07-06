import * as React from "react";
import * as ReactDOM from "react-dom";


import { MessageCenter } from './MessageCenter';

import { Scene } from './Scene';
import { LoginPanel } from './LoginPanel';
import { ControlPanel } from './ControlPanel';
import { MessageBoard } from './MessageBoard';


const scene = new Scene();
scene.init();
const messageCenter = new MessageCenter();


ReactDOM.render(
    <div>
        <LoginPanel
            afterWordCardsAnimation={scene.transformation.bind(scene)}
            afterLogin={() => {
                $('.control-panel').removeClass('invisible').addClass('visible');
                scene.zoomIn.bind(scene)();
            }} />
        <MessageBoard messageCenter={messageCenter} />
        <ControlPanel messageCenter={messageCenter} />
    </div>,
    document.getElementById("app")
);
