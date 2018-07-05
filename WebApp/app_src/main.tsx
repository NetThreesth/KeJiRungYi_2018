import * as React from "react";
import * as ReactDOM from "react-dom";

import { Roles } from './AppSetting';
import { Scene } from './Scene';
import { LoginPanel } from './LoginPanel';
import { ControlPanel } from './ControlPanel';
import { MessageBoard } from './MessageBoard';
import { CommonUtility } from './CommonUtility';


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
    role: Roles;
    type: ContentType;
    content: string;
};

export class MessageCenter {

    contents: Content[] = [];
    observable = $({});


    addText(role: Roles, text: string) {
        this.contents.push({ role: role, type: ContentType.Text, content: text });
        this.observable.trigger('add');
    };
    addImage(role: Roles, b64String: string) {
        this.contents.push({ role: role, type: ContentType.Image, content: b64String });
        this.observable.trigger('add');
    };
};

const messageCenter = new MessageCenter();
new ControlPanel().initPanel(
    text => messageCenter.addText(Roles.User, text),
    text => messageCenter.addImage(Roles.User, text)
);

messageCenter.addText(
    Roles.User,
    CommonUtility.createArray(30).map(e => 'and').join(' ')
);
messageCenter.addText(
    Roles.ChatBot,
    CommonUtility.createArray(10).map(e => '@@@').join(' ')
);
messageCenter.addText(
    Roles.Algae,
    CommonUtility.createArray(20).map(e => 'FFF').join(' ')
);
messageCenter.addText(
    Roles.User,
    CommonUtility.createArray(30).map(e => 'xxx').join(' ')
);


ReactDOM.render(
    <MessageBoard messageCenter={messageCenter} />,
    document.getElementById("app")
);
