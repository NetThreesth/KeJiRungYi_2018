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
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus.bind(this));
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    };

    private signin() {
        gapi.auth2.getAuthInstance().signIn();
    };

    private updateSigninStatus(isSignedIn: boolean) {
        console.log(isSignedIn);
        if (!isSignedIn) return;
        this.makeApiCall();
    };

    private makeApiCall() {
        gapi.client.people.people.get({
            'resourceName': 'people/me',
            'requestMask.includeField': 'person.names'
        }).then(function (resp) {
            console.log(resp.result);
            const name = resp.result.names[0].displayName
        });
    };
};