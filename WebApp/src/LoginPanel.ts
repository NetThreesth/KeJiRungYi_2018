declare const gapi: any;


const clientId = '380947346613-l6gvf9laj9fuko3ljph9ej99olo5qa3k.apps.googleusercontent.com';
const apiKey = 'AIzaSyBmozdLmtDDry_ah4NhYPqOTeZ2wr9Er2A';

export class LoginPanel {

    init() {
        gapi.load('client', this.initClient.bind(this));
    };

    private initClient() {
        gapi.client.init({
            clientId: clientId,
            apiKey: apiKey,
            discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
            scope: 'profile'
        }).then(() => {
            const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
            if (!isSignedIn) this.setSignInButton();
            else this.queryUser();
        });
    };


    private setSignInButton() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.login.bind(this));
        $('#signInWrapper').show();
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
        $('#signInWrapper').show();
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