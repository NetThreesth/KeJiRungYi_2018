declare const gapi: any;

export class LoginPanel {

    init() {
        gapi.load('client', this.initClient.bind(this));
    };

    private initClient() {
        gapi.client.init({
            clientId: '380947346613-l6gvf9laj9fuko3ljph9ej99olo5qa3k.apps.googleusercontent.com',
            apiKey: 'AIzaSyBmozdLmtDDry_ah4NhYPqOTeZ2wr9Er2A',
            discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
            scope: 'profile'
        }).then(() => {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus.bind(this));
            // Handle the initial sign-in state.
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    };

    private updateSigninStatus(isSignedIn: boolean) {
        debugger;
    }
};