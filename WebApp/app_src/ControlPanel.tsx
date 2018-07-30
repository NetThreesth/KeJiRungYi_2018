import * as React from "react";
import { MessageCenter, EventCenter, Event } from './MessageCenter';
import { Roles } from './AppSetting';

export class ControlPanel
    extends React.Component<{ messageCenter: MessageCenter, eventCenter: EventCenter }>
{
    render() {
        return <div className="control-panel invisible untouchable">
            <span className="textInput invisible">
                <input type="text" onKeyPress={this.keyPress.bind(this)} />
                <button className="button" onClick={this.handleText.bind(this)}>
                    <i className="fas fa-share"></i>
                </button>
            </span>
            <div className="buttons">
                <button id="textInputSwitch" className="button white-text" onClick={this.switchTextInput.bind(this)}>
                    <i className="far fa-comment-dots"></i>
                </button>
                <label htmlFor="fileUpload" className="button white-text">
                    <i className="fas fa-camera-retro"></i>
                </label>
                <input id="fileUpload" type="file" accept="image/*" style={{ display: 'none' }}
                    onChange={this.handleFiles.bind(this)} />
            </div>
        </div>;
    };

    componentDidMount() {
        this.props.eventCenter.on(Event.AfterLogin, () => {
            $('.control-panel').removeClass(['invisible', 'untouchable']).addClass('visible');
        });
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
        if (e.which == 13 || e.keyCode == 13)
            this.handleText();
    };

    private handleText() {
        const $input = $('.textInput>input');
        let text = $input.val();
        if (!text) return;

        $input.val('');
        this.onTextAdd(String(text));
        this.switchTextInput();
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