import { AppSetting } from './AppSetting';
declare const gapi: any;


const clientId = '380947346613-l6gvf9laj9fuko3ljph9ej99olo5qa3k.apps.googleusercontent.com';
const apiKey = 'AIzaSyBmozdLmtDDry_ah4NhYPqOTeZ2wr9Er2A';

export class LoginPanel {

    init() {
        this.setSignInButton();
        //gapi.load('client', this.initGoogleClient.bind(this));
        this.wordCardsAnimation();
    };

    afterWordCardsAnimation = () => { };

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
        this.fadeSequence($wordCards.toArray(), times, this.afterWordCardsAnimation);
    };


    private setSignInButton() {

        $('.sign-in-button').on('click', e => {
            const signInName = $('#signInName').val() as string;
            if (signInName.length === 0) return;
            AppSetting.userName = signInName;
            this.login();
        });
    };


    private initGoogleClient() {
        gapi.client.init({
            clientId: clientId,
            apiKey: apiKey,
            discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
            scope: 'profile'
        }).then(() => {
            const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
            if (!isSignedIn) this.setGoogleSignInButton();
            else this.queryUser();
        });
    };

    private setGoogleSignInButton() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.login.bind(this));
        // $('#signInWrapper').show();
        $('#signinButton').on('click', () => gapi.auth2.getAuthInstance().signIn());
    };



    private queryUser() {
        gapi.client.people.people.get({
            'resourceName': 'people/me',
            'requestMask.includeField': 'person.names'
        }).then(resp => {
            const name = resp.result.names[0].displayName;
            this.setLoiginButton(name);
        });
    };

    private setLoiginButton(name) {
        // $('#signInWrapper').show();
        $('#signInWrapper .buttonText').text(name);
        $('#signinButton').on('click', this.login.bind(this));
    };

    private login() {
        const $loginPanel = $('#loginPanel');
        $loginPanel.animate({ opacity: 0 }, 2000, () => $loginPanel.hide());
        this.afterLogin();
    };

    afterLogin: () => void = () => { };
};