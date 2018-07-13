import * as React from "react";
import { AppSetting } from './AppSetting';
import { EventCenter, Event } from './MessageCenter';

export class LoginPanel
    extends React.Component<{ eventCenter: EventCenter }> {

    render() {
        return <div id="loginPanel" className="flex flex-center">

            <div className="white-text text-center wordCard">
                概念有名而成數據，
                    <br /> 物體無形而成概念，
                    <br /> 彼自成空間；
                </div>
            <div className="white-text text-center wordCard">
                萬物竄流宇宙，
                    <br /> 在邊隙處落下，
                    <br /> 於彼端再現；
                </div>
            <div className="white-text text-center wordCard">
                千萬形貌，
                    <br /> 終歸涅槃，
                    <br /> 生生不息，
                    <br /> 周而復始。
                </div>
            <div id="signInWrapper" className="wordCard">
                <span className="label white-text">Sign in with:&nbsp;</span>
                <input type="text" id="signInName" />
                <button type="button" className="sign-in-button"
                    onClick={e => { this.signInButtonClickHandler() }}>
                    <i className="fas fa-arrow-circle-right"></i>
                </button>
            </div>
            <div className="skipAnimation">
                <button type="button"
                    onClick={e => { this.skipAnimation() }}>
                    skip
                </button>
            </div>
        </div>;
    };

    componentDidMount() {
        this.wordCardsAnimation();
    };

    private performance = null;
    private getPerformance(startNewOne = false) {
        if (startNewOne || !this.performance) this.performance = performance.now();
        const result = performance.now() - this.performance;
        this.performance = performance.now();
        return result;
    };
    private fadeAnimation(
        ele: HTMLElement,
        setting: {
            fadeIn: number,
            sustain?: number,
            fadeOut?: number
        },
        onComplete: () => void
    ) {
        console.log('fadeIn start ' + this.getPerformance());
        const animation = $(ele).fadeIn(setting.fadeIn, undefined, () => {
            console.log('fadeIn end ' + this.getPerformance());
        })

        if (!setting.fadeOut) {
            onComplete();
            return;
        }
        animation.delay(setting.sustain || 0).fadeOut(setting.fadeOut, undefined, () => {
            console.log('fadeOut end ' + this.getPerformance());
            onComplete();
        });
    };

    private fadeSequence(
        eleArray: HTMLElement[],
        setting: {
            fadeIn: number,
            sustain: number,
            fadeOut: number
        },
        afterFunc: () => void) {

        if (eleArray.length === 0) {
            afterFunc();
            return;
        }
        console.log('fadeAnimation ' + eleArray.length);
        setting.fadeOut = (eleArray.length > 1) ? setting.fadeOut : null;
        this.fadeAnimation(eleArray.shift(), setting, () => {
            this.fadeSequence(eleArray, setting, afterFunc);
        });
    };


    private wordCardsAnimation() {
        const wordCards = $('.wordCard').toArray();
        const times = {
            fadeIn: 5000,
            sustain: 1000,
            fadeOut: 2000
        };
        this.fadeSequence(
            wordCards,
            times,
            this.afterWordCardsAnimation.bind(this)
        );
    };

    private skipAnimation() {
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


    private signInButtonClickHandler() {
        const signInName = $('#signInName').val() as string;
        if (signInName.length === 0) return;
        AppSetting.userName = signInName;
        this.login();
    };

    private login() {
        const $loginPanel = $('#loginPanel');
        $loginPanel.animate({ opacity: 0 }, 2000, () => $loginPanel.hide());
        this.props.eventCenter.trigger(Event.AfterLogin);
    };

};