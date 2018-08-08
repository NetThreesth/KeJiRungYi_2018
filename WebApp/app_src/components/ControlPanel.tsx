import * as React from "react";
import { socketClient } from '../common/SocketClient';
import { MessageCenter, EventCenter, Event } from '../common/MessageCenter';
import { Roles, GlobalData } from '../common/GlobalData';

import "./ControlPanel.scss";

export class ControlPanel extends React.Component<
    {
        messageCenter: MessageCenter,
        eventCenter: EventCenter
    },
    {
        userName: string,
        roomID: number,
        time: number,
        touchEventCount: number
    }
    >{

    state = {
        userName: '',
        roomID: null,
        time: 0,
        touchEventCount: 0
    };

    render() {
        return <div className="control-panel invisible untouchable">
            <span className="textInput invisible">
                <input type="text" onKeyPress={this.keyPress.bind(this)} />
                <button className="button" onClick={this.handleText.bind(this)}>
                    <i className="fas fa-share"></i>
                </button>
            </span>
            <div className="buttons">
                <button className="button" onClick={this.switchTextInput.bind(this)}>
                    <i className="far fa-comment-dots"></i>
                </button>
                <label htmlFor="fileUpload" className="button">
                    <i className="fas fa-camera-retro"></i>
                </label>
                <input id="fileUpload" type="file" accept="image/*" style={{ display: 'none' }}
                    onChange={this.handleFiles.bind(this)} />
                <button className="button" onClick={this.switchUserRecord.bind(this)}>
                    <i className="fas fa-ellipsis-h"></i>
                </button>
            </div>
            <div className="userRecord">
                <div>用戶: {GlobalData.userName}</div>
                <div>聊天室編號: {GlobalData.chatRoomIndex}</div>
                <div>使用時間: {this.state.time} ms</div>
                <div>觸碰事件: {this.state.touchEventCount} 次</div>
            </div>
        </div>;
    };

    componentDidMount() {
        this.props.eventCenter.on(Event.AfterLogin, () => {
            $('.control-panel').removeClass(['invisible', 'untouchable']).addClass('visible');
            this.setState({
                time: new Date().getTime() - GlobalData.signInTime.getTime(),
                touchEventCount: 0
            });
        });

        $(document).on('mouseup touchend click', () => {
            const newState = Object.assign({}, this.state, {
                touchEventCount: this.state.touchEventCount + 1
            });
            this.setState(newState);
            setTimeout(() => {
                socketClient.emit(
                    'updateUserInfo',
                    Object.assign({ touchEventCount: newState.touchEventCount }, GlobalData)
                );
            }, 0);
        });
        setInterval(() => {
            if (!GlobalData.signInTime) return;
            const newState = Object.assign({}, this.state, {
                time: new Date().getTime() - GlobalData.signInTime.getTime(),
            });
            this.setState(newState);
        }, 200);
    };

    private switchUserRecord() {
        const $userRecord = $('.userRecord');
        $userRecord.is(":visible") ? $userRecord.fadeOut() : $userRecord.fadeIn();
    };

    private onTextAdd(text: string) {
        this.props.messageCenter.addText(Roles.User, text);
    };


    private onImageAdd(image: string) {
        this.props.messageCenter.addImage(Roles.User, image);
    };


    private switchTextInput() {
        const $textInput = $('.textInput');
        $textInput.toggleClass('visible').toggleClass('invisible');
        if ($textInput.hasClass('visible')) $textInput.find('input').focus();
    };

    private keyPress(e) {
        if (e.which === 13 || e.keyCode === 13)
            this.handleText();
    };

    private handleText() {
        const $input = $('.textInput>input');
        let text = $input.val();
        if (!text) return;

        $input.val('');
        this.onTextAdd(String(text));
    };


    private handleFiles($ele) {
        const image: Blob = $ele.currentTarget.files[0];
        if (!image) return;

        const FR = new FileReader();

        FR.addEventListener("load", e => {
            const base64Image: string = e.target['result'];
            this.onImageAdd(base64Image);
        });
        FR.readAsDataURL(image);
    };
};