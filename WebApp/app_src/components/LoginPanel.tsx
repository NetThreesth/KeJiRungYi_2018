import * as React from "react";
import { socketClient } from '../common/SocketClient';
import { EventCenter, Event } from '../common/MessageCenter';
import { GlobalData } from '../common/GlobalData';
import { CommonUtility } from '../common/CommonUtility';

import "./LoginPanel.scss";

export class LoginPanel extends React.Component<
    { eventCenter: EventCenter },
    { signInName: string }
    > {

    constructor(props) {
        super(props);
        this.state = { signInName: CommonUtility.getCookie('signInName') };
    };

    render() {
        return <div id="loginPanel"
            onClick={this.focus.bind(this)}>

            <div className="text-center wordCard">
                概念有名而成數據，
                    <br /> 物體無形而成概念，
                    <br /> 彼自成空間；
                </div>
            <div className="text-center wordCard">
                萬物竄流宇宙，
                    <br /> 在邊隙處落下，
                    <br /> 於彼端再現；
                </div>
            <div className="text-center wordCard startBackgroundTransform">
                千萬形貌，
                    <br /> 終歸涅槃，
                    <br /> 生生不息，
                    <br /> 周而復始。
                </div>
            <div id="signInWrapper" className="wordCard">
                <span className="label">Sign in with:&nbsp;</span>
                <input type="text" id="signInName"
                    value={this.state.signInName}
                    onKeyPress={this.keyPress.bind(this)}
                    onChange={this.signInNameChanged.bind(this)} />
                <button type="button" className="signInButton"
                    onClick={this.signInButtonClickHandler.bind(this)}>
                    <i className="fas fa-arrow-circle-right"></i>
                </button>
            </div>
            <div className="skipAnimation">
                <button type="button"
                    onClick={this.skipAnimation.bind(this)}>
                    skip
                </button>
            </div>
        </div>;
    };

    componentDidMount() {
        this.wordCardsAnimation();
    };




    private fadeAnimation(
        ele: HTMLElement,
        setting: {
            fadeIn: number,
            sustain?: number,
            fadeOut?: number
        },
        afterFunc: (ele: HTMLElement) => void
    ) {
        const animation = $(ele).fadeIn(setting.fadeIn, undefined, () => {
            if (!setting.fadeOut) afterFunc(ele);
        });
        if (!setting.fadeOut) return;
        animation.delay(setting.sustain || 0).fadeOut(setting.fadeOut, undefined, () => {
            afterFunc(ele);
        });
    };


    private fadeSequence(
        eleArray: HTMLElement[],
        setting: {
            fadeIn: number,
            sustain: number,
            fadeOut: number
        },
        afterFunc: (ele: HTMLElement) => void
    ) {
        setting.fadeOut = (eleArray.length === 1) ? null : setting.fadeOut;
        this.fadeAnimation(eleArray.shift(), setting, ele => {
            afterFunc(ele);
            if (eleArray.length === 0) return;
            this.fadeSequence(eleArray, setting, afterFunc);
        });
    };


    private wordCardsAnimation() {
        const wordCards = $('.wordCard').toArray();
        const setting = {
            fadeIn: 5000,
            sustain: 1000,
            fadeOut: 2000
        };
        this.fadeSequence(
            wordCards,
            setting,
            ele => {
                if (ele.classList.contains('startBackgroundTransform'))
                    this.afterWordCardsAnimation();
            }
        );
    };

    private skipAnimation(e: React.MouseEvent) {
        e.stopPropagation();
        const $wordCards = $('.wordCard');
        $wordCards.stop(true);
        $wordCards.hide();
        $('.skipAnimation').hide();
        $wordCards.last().fadeIn();

        this.afterWordCardsAnimation();
    };

    private afterWordCardsAnimation() {
        $('.skipAnimation').hide();
        this.props.eventCenter.trigger(Event.AfterWordCardsAnimation);
    };

    private focus() {
        setTimeout(() => $('#signInName').focus());
    };

    private signInNameChanged(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ signInName: e.target.value });
    };

    private keyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.which == 13 || e.keyCode == 13)
            this.signInButtonClickHandler();
    };

    private signInButtonClickHandler() {
        const signInName = this.state.signInName;
        if (signInName.length === 0) return;

        GlobalData.userName = this.state.signInName;
        CommonUtility.setCookie('signInName', GlobalData.userName, 30);
        GlobalData.signInTime = new Date();
        setTimeout(() => socketClient.emit('updateUserInfo', GlobalData), 0);

        const $loginPanel = $('#loginPanel');
        $loginPanel.animate({ opacity: 0 }, 2000, () => $loginPanel.hide());
        this.props.eventCenter.trigger(Event.AfterLogin);
    };
};