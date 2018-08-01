import * as React from "react";

import { MessageCenter, Content, ContentType, EventCenter } from './common/MessageCenter';
import { Scrollbar } from './common/Scrollbar';
import { GlobalData, Roles } from './common/GlobalData';

import "./MessageBoard.scss";


export class MessageBoard
    extends React.Component<
    { messageCenter: MessageCenter, eventCenter: EventCenter },
    { contents: Content[] }
    >{


    constructor(props) {
        super(props);
        const messageCenter = this.props.messageCenter;
        this.state = { contents: messageCenter.contents.slice() };
        this.props.eventCenter.on(MessageCenter.eventName, this.refresh.bind(this));
    };

    render() {
        const contents = this.state.contents;
        const contentElements = contents.map(this.createContent.bind(this));
        return <div id="messageBoard" className="invisible">
            <div className="messageBoardContent">{contentElements}</div>
            <Scrollbar syncTarget=".messageBoardContent" eventCenter={this.props.eventCenter} />
        </div>;
    };

    componentDidMount() {
        this.props.eventCenter.on<number>(Scrollbar.ScrollEvent, rate => {
            this.scrollTo(rate);
        });
    };

    componentDidUpdate() {
        this.scrollTo(1, false, () => {
            this.props.eventCenter.trigger(Scrollbar.UpdateEvent);
        });
    };

    private createContent(content: Content) {
        if (content.type === ContentType.Text)
            return this.createTextMessage(content);
        else if (content.type === ContentType.Image)
            return this.createImageMessage(content);
    };

    private createTextMessage(content: Content) {
        const isUser = content.role === Roles.User;
        const name = isUser ? GlobalData.userName : '';
        const float = isUser ? 'right' : 'left';
        return <div className="messageBox" style={{ float: float }}>
            <img src={this.getAvatar(content.role)} className="avatar" />
            <div className="name">{name}</div>
            <div className="content">{content.content}</div>
        </div>;
    };

    private createImageMessage(content: Content) {
        const isUser = content.role === Roles.User;
        const name = isUser ? GlobalData.userName : '';
        const float = isUser ? 'right' : 'left';
        return <div className="messageBox" style={{ float: float }}>
            <img src={this.getAvatar(content.role)} className="avatar" />
            <div className="name">{name}</div>
            <div className="content"><img src={content.content} style={{ width: '100%', maxWidth: '600px' }} /></div>
        </div>;
    };

    private refresh() {
        const contents = this.props.messageCenter.contents.slice();
        if (contents.length === 0) return;
        console.log('refresh fired');
        $('#messageBoard').removeClass('invisible');
        this.setState({ contents: contents });
    };

    private getAvatar(role: Roles) {
        if (role === Roles.User)
            return 'assets/avatar_white.png';
        if (role === Roles.Algae)
            return 'assets/avatar_yellow.png';
        if (role === Roles.ChatBot)
            return 'assets/avatar_pink.png';
    };

    private scrollTo(rate: number, immediate = true, afterFunc = () => { }) {
        const $scrollTarget = $('.messageBoardContent');
        const targetTotalH = $scrollTarget.prop('scrollHeight');
        const targetViewH = $scrollTarget.height();
        const offset = (targetTotalH - targetViewH) * rate;
        $scrollTarget.animate({ scrollTop: offset }, immediate ? 0 : 500, afterFunc);
    };
};