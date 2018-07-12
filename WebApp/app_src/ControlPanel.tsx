import * as React from "react";
import { MessageCenter, EventCenter, Event } from './MessageCenter';
import { Roles } from './AppSetting';

export class ControlPanel
    extends React.Component<{ messageCenter: MessageCenter, eventCenter: EventCenter }>
{
    render() {
        return <div className="control-panel invisible untouchable">
            <span className="textInput invisible">
                <input type="text" />
                <button className="button" onClick={() => this.handleText()}>
                    <i className="fas fa-share"></i>
                </button>
            </span>
            <div className="buttons">
                <button id="textInputSwitch" className="button white-text" onClick={() => this.switchTextInput()}>
                    <i className="far fa-comment-dots"></i>
                </button>
                <label htmlFor="fileUpload" className="button white-text">
                    <i className="fas fa-camera-retro"></i>
                </label>
                <input id="fileUpload" type="file" accept="image/*" style={{ display: 'none' }}
                    onChange={(e) => this.handleFiles(e)} />
            </div>
            <div className="flashMask" />
        </div>;
    };

    componentDidMount() {
        this.props.eventCenter.on(Event.afterLogin, () => {
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
    };


    private handleText() {
        const $input = $('.textInput>input');
        let text = $input.val();
        if (!text) return;

        text = String(text);
        $input.val('').focus();

        this.onTextAdd(text);

        const $mask = $('.flashMask');
        $mask.addClass('flash');
        setTimeout(() => {
            $mask.removeClass('flash');
        }, 500);
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