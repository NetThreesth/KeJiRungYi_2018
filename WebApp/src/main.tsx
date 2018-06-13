import * as React from "react";
import * as ReactDOM from "react-dom";

import { Scene } from './Scene';
import { LoginPanel } from './LoginPanel';
import { ControlPanel } from './ControlPanel';
import { MessageBoard, Content, ContentType } from './MessageBoard';


const loginPanel = new LoginPanel();
const scene = new Scene();
loginPanel.afterWordCardsAnimation = scene.transformation.bind(scene);
loginPanel.afterLogin = scene.zoomIn.bind(scene);
loginPanel.init();
scene.init();


const contents: Content[] = [{ type: ContentType.Text, content: 'asdasd' }];
new ControlPanel().initPanel(
    text => contents.push({ type: ContentType.Text, content: text }),
    b64String => contents.push({ type: ContentType.Image, content: b64String }),
);


ReactDOM.render(
    <MessageBoard contents={contents} />,
    document.getElementById("MessageBoard")
);