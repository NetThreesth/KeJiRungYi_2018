import * as React from "react";

import { MessageCenter, Content, ContentType, EventCenter } from '../common/MessageCenter';
import { Scrollbar } from '../common/Scrollbar';
import { GlobalData, Roles } from '../common/GlobalData';

import "./MessageBoard.scss";
import { CommonUtility } from "../common/CommonUtility";


export class MessageBoard
    extends React.Component<
    { messageCenter: MessageCenter, eventCenter: EventCenter },
    { contents: Content[] }
    >{


    private avatars = function () {
        const avatars: { [key: number]: string } = {};
        avatars[Roles.User] = '3sth/avatar/avatar_white.png';
        avatars[Roles.Algae] = '3sth/avatar/avatar_yellow.png';
        avatars[Roles.ChatBot] = '3sth/avatar/avatar_pink.png';
        return avatars;
    }();

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
        this.props.eventCenter.on<number>(Scrollbar.ScrollEvent, rate => this.scrollTo(rate));
        this.preloadAvatars();
    };

    componentDidUpdate() {
        setTimeout(() =>
            this.scrollTo(1, false, () => this.props.eventCenter.trigger(Scrollbar.UpdateEvent))
        );
    };

    private preloadAvatars() {
        Object.keys(this.avatars).forEach(type => {
            const img = new Image();
            img.src = this.avatars[type];
        });
    };

    private createContent(content: Content) {
        const isUser = content.role === Roles.User;
        const name = isUser ? GlobalData.userName :
            content.role === Roles.Algae ? 'aigae' : 'bot';
        const float = isUser ? 'right' : 'left';
        const colors = {};
        colors[Roles.User] = 'white';
        colors[Roles.Algae] = '#ffffe0';
        colors[Roles.ChatBot] = '#fff0f2';
        let $content: JSX.Element = null;
        if (content.type === ContentType.Text) {
            const to = (content.to === Roles.Algae) ? '@aigae ' :
                (content.to === Roles.User) ? `@${GlobalData.userName} ` : '';
            $content = <div className="content" style={{ color: colors[content.role] }}>
                {to + content.content}
            </div >;
        }
        else if (content.type === ContentType.Image) {
            $content = <div className="content"><img src={content.content} /></div>;
        }
        else if (content.type === ContentType.Algae) {
            let algaes = [];
            CommonUtility.loop(content.algaeCount, () => {
                algaes.push(<img style={{ height: '30px' }} src='3sth/algae/algae_particle.png' />);
            });
            $content = <div className="content">
                {algaes}
            </div>;
        }

        return <div className={`messageBox ${float}`}>
            <img src={this.avatars[content.role]} className="avatar" />
            <div className="name">{name}</div>
            {$content}
        </div>;
    };

    private refresh() {
        const contents = this.props.messageCenter.contents.slice();
        if (contents.length === 0) return;
        console.log('refresh fired');
        $('#messageBoard').removeClass('invisible');
        this.setState({ contents: contents });
    };


    private scrollTo(rate: number, immediate = true, afterFunc = () => { }) {
        const $scrollTarget = $('.messageBoardContent');
        const targetTotalH = $scrollTarget.prop('scrollHeight');
        const targetViewH = $scrollTarget.height();
        const offset = (targetTotalH - targetViewH) * rate;
        $scrollTarget.animate({ scrollTop: offset }, immediate ? 0 : 500, afterFunc);
    };
};