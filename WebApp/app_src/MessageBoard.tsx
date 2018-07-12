import * as React from "react";

import { MessageCenter, Content, ContentType, Event } from './MessageCenter';
import { AppSetting, Roles } from './AppSetting';


export class MessageBoard
    extends React.Component<{ messageCenter: MessageCenter }, { contents: Content[] }>{

    constructor(props) {
        super(props);
        const messageCenter = this.props.messageCenter;
        this.state = { contents: messageCenter.contents.slice() };
        this.props.messageCenter.observable.on(Event.afterLogin, this.refresh.bind(this));
    };

    render() {
        const contents = this.state.contents;
        const contentElements = contents.map(this.createContent.bind(this));
        return <div id="messageBoard" className="untouchable full-page flex flex-center flex-end">
            <div className="message-board-content">{contentElements}</div>
        </div>;
    };

    private createContent(content: Content) {
        if (content.type === ContentType.Text)
            return this.createTextMessage(content);
        else if (content.type === ContentType.Image)
            return this.createImageMessage(content);
    };

    private createTextMessage(content: Content) {
        const isUser = content.role === Roles.User;
        const name = isUser ? AppSetting.userName : '';
        const float = isUser ? 'left' : 'right';
        return <div className="messageBox" style={{ float: float }}>
            <img src={this.getAvatar(content.role)} className="avatar" />
            <div className="name">{name}</div>
            <div className="content">{content.content}</div>
        </div>;
    };

    private createImageMessage(content: Content) {
        const style = {
            width: '100%',
            maxWidth: '600px'
        };
        const isUser = content.role === Roles.User;
        const name = isUser ? AppSetting.userName : '';
        const float = isUser ? 'left' : 'right';
        return <div className="messageBox" style={{ float: float }}>
            <img src={this.getAvatar(content.role)} className="avatar" />
            <div className="name">{name}</div>
            <div className="content"><img src={content.content} style={style} /></div>
        </div>;
    };

    private refresh() {
        this.setState({ contents: this.props.messageCenter.contents.slice() });
    };

    private getAvatar(role: Roles) {
        if (role === Roles.User)
            return 'assets/avatar_white.png';
        if (role === Roles.Algae)
            return 'assets/avatar_yellow.png';
        if (role === Roles.ChatBot)
            return 'assets/avatar_pink.png';
    };
};