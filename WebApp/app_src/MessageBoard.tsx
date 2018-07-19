import * as React from "react";

import { MessageCenter, Content, ContentType, EventCenter } from './MessageCenter';
import { AppSetting, Roles } from './AppSetting';


export class MessageBoard
    extends React.Component<{ messageCenter: MessageCenter }, { contents: Content[] }>{

    private eventCenter = new EventCenter();

    constructor(props) {
        super(props);
        const messageCenter = this.props.messageCenter;
        this.state = { contents: messageCenter.contents.slice() };
        this.props.messageCenter.observable.on(MessageCenter.eventName, this.refresh.bind(this));
    };

    render() {
        const contents = this.state.contents;
        const contentElements = contents.map(this.createContent.bind(this));
        return <div id="messageBoard" className="invisible">
            <div className="messageBoardContent">{contentElements}</div>
            <Scrollbar syncTarget=".messageBoardContent" eventCenter={this.eventCenter} />
        </div>;
    };

    componentDidMount() {
        this.eventCenter.on<number>(Scrollbar.ScrollEvent, rate => {
            this.scrollTo(rate);
        });
    };

    componentDidUpdate() {
        this.scrollTo(1, false, () => {
            this.eventCenter.trigger(Scrollbar.UpdateEvent);
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

export class Scrollbar
    extends React.Component<{ syncTarget: string, eventCenter: EventCenter }>{

    static readonly ScrollEvent = 'scroll';
    static readonly UpdateEvent = 'update';

    private $syncTarget: JQuery<HTMLElement> = null;

    render() {
        return <div className="scrollbarContainer"><div className="scrollbar" /></div>;
    };

    componentDidMount() {
        this.$syncTarget = $(this.props.syncTarget);
        this.initScrollbar();
    };


    private initScrollbar() {
        const eventCenter = this.props.eventCenter;

        let isDragging = false;
        const origin = { pageY: 0, scrollbarOffset: 0 };
        const $scrollbarContainer = $('.scrollbarContainer');
        const $scrollbar = $scrollbarContainer.find('.scrollbar');
        $(document)
            .on('mousedown touchstart', '.scrollbarContainer', e => {
                e.preventDefault();
                isDragging = true;
                origin.pageY = e.pageY;

                const scrollbarOffset = Number($scrollbar.css('top').replace('px', ''));
                origin.scrollbarOffset = scrollbarOffset;
            })
            .on('mousemove touchmove', '.scrollbarContainer', e => {
                e.preventDefault();
                if (!isDragging) return;
                const offsetY = e.pageY - origin.pageY;
                console.log(offsetY);
                const maxOffset = $scrollbarContainer.height() - $scrollbar.height();
                let scrollbarOffset = origin.scrollbarOffset + offsetY;
                if (scrollbarOffset > maxOffset) scrollbarOffset = maxOffset;
                else if (scrollbarOffset < 0) scrollbarOffset = 0;
                $scrollbar.css('top', scrollbarOffset);

                eventCenter.trigger(Scrollbar.ScrollEvent, scrollbarOffset / maxOffset);
            }).on('mouseup touchend', e => {
                if (!isDragging) return;
                isDragging = false;
                console.log('mouseup');
            });

        eventCenter.on(Scrollbar.UpdateEvent, () => {
            this.adjustScrollbarH();
            this.adjustScrollbarOffset();
        });
    };

    private adjustScrollbarH() {
        const $scrollTarget = this.$syncTarget;
        const targetTotalH = $scrollTarget.prop('scrollHeight');
        const targetViewH = $scrollTarget.height();

        const $scrollbarContainer = $('.scrollbarContainer');
        const scrollbarContainerH = $scrollbarContainer.height();

        const scrollbarH = scrollbarContainerH * (targetViewH / targetTotalH);
        $scrollbarContainer.find('.scrollbar').height(scrollbarH);
    };

    private adjustScrollbarOffset() {
        const $scrollTarget = this.$syncTarget;
        const targetTotalH = $scrollTarget.prop('scrollHeight');
        const targetScrollTop = $scrollTarget.scrollTop();

        const $scrollbarContainer = $('.scrollbarContainer');
        const scrollbarContainerH = $scrollbarContainer.height();
        const offset = scrollbarContainerH * targetScrollTop / targetTotalH;
        $scrollbarContainer.find('.scrollbar').css('top', offset);
    };
};