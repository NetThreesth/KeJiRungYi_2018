import * as React from "react";
import * as ReactDOM from "react-dom";

import { Scene } from './Scene';
import { LoginPanel } from './LoginPanel';
import { ControlPanel } from './ControlPanel';
import { MessageBoard } from './MessageBoard';


const loginPanel = new LoginPanel();
const scene = new Scene();
loginPanel.afterWordCardsAnimation = scene.transformation.bind(scene);
loginPanel.afterLogin = () => {
    $('.control-panel').removeClass('invisible').addClass('visible');
    scene.zoomIn.bind(scene)();
};
loginPanel.init();
scene.init();


export enum ContentType {
    Text, Image
};

export interface Content {
    type: ContentType;
    content: string;
};

export class MessageCenter {

    contents: Content[] = [];
    observable = $({});


    addText(text) {
        this.contents.push({ type: ContentType.Text, content: text });
        this.observable.trigger('add');
    };
    addImage(b64String) {
        this.contents.push({ type: ContentType.Image, content: b64String });
        this.observable.trigger('add');
    };
};

const messageCenter = new MessageCenter();
new ControlPanel().initPanel(
    messageCenter.addText.bind(messageCenter),
    messageCenter.addImage.bind(messageCenter)
);


ReactDOM.render(
    <MessageBoard messageCenter={messageCenter} />,
    document.getElementById("app")
);
