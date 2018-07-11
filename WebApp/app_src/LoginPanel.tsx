import * as React from "react";
import { AppSetting } from './AppSetting';
import { EventCenter, Event } from './MessageCenter';

export class LoginPanel
    extends React.Component<{ eventCenter: EventCenter }> {

    render() {
        return <div id="loginPanel" className="flex flex-center">

            <div className="white-text text-center">
                概念有名而成數據，
                    <br /> 物體無形而成概念，
                    <br /> 彼自成空間；
                </div>
            <div className="white-text text-center">
                萬物竄流宇宙，
                    <br /> 在邊隙處落下，
                    <br /> 於彼端再現；
                </div>
            <div className="white-text text-center">
                千萬形貌，
                    <br /> 終歸涅槃，
                    <br /> 生生不息，
                    <br /> 周而復始。
                </div>
            <div id="signInWrapper">
                <span className="label white-text">Sign in with:&nbsp;</span>
                <input type="text" id="signInName" />
                <button type="button" className="sign-in-button"
                    onClick={e => { this.signInButtonClickHandler(e) }}>
                    <i className="fas fa-arrow-circle-right"></i>
                </button>
                {/*                 
                <div id="signinButton">
                    <span className="icon"></span>
                    <span className="buttonText">Google</span>
                </div> 
                */}
            </div>
        </div>;
    };

    componentDidMount() {
        //gapi.load('client', this.initGoogleClient.bind(this));
        this.wordCardsAnimation();
    };


    private fadeAnimation(
        ele: HTMLElement,
        times: {
            fadeIn: number,
            sustain?: number,
            fadeOut?: number
        },
        onComplete: () => void
    ) {

        const $ele = $(ele)
        $ele.fadeIn(times.fadeIn, undefined, () => {
            if (!times.fadeOut) {
                onComplete();
                return;
            }
            setTimeout(() => {
                $ele.fadeOut(times.fadeOut, undefined, () => {
                    onComplete();
                });

            }, times.sustain || 0);
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

        setting.fadeOut = (eleArray.length > 1) ? setting.fadeOut : null;
        this.fadeAnimation(eleArray.shift(), setting, () => {
            this.fadeSequence(eleArray, setting, afterFunc);
        });
    };

    private wordCardsAnimation() {
        const $wordCards = $('#loginPanel > div');
        const times = {
            fadeIn: 5000,
            sustain: 1000,
            fadeOut: 2000
        };
        this.fadeSequence($wordCards.toArray(), times, () => this.props.eventCenter.trigger(Event.afterWordCardsAnimation));
    };


    private signInButtonClickHandler(e) {
        const signInName = $('#signInName').val() as string;
        if (signInName.length === 0) return;
        AppSetting.userName = signInName;
        this.login();
    };

    private login() {
        const $loginPanel = $('#loginPanel');
        $loginPanel.animate({ opacity: 0 }, 2000, () => $loginPanel.hide());
        this.props.eventCenter.trigger(Event.afterLogin);
    };

};