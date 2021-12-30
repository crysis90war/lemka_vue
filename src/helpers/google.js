class Google extends EventTarget {
    constructor({apiKey, clientId}) {
        super();

        this.apiKey = apiKey;
        this.clientId = clientId;
    }

    async init() {
        return new Promise((resolve, reject) => {
            window.gapi.load('clients:auth2', async () => {
                try {
                    await window.gapi.client.init({
                        apiKey: this.apiKey,
                        clientId: this.clientId,
                        // List of discovery docs that we'll use on our application.
                        // On this example we're using Google Drive API.
                        // discoveryDocs: [
                        //     'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
                        // ],
                        // The scopes we're using separated by space.
                        // https://developers.google.com/identity/protocols/oauth2/scopes
                        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
                    });
                    window.gapi.auth2
                        .getAuthInstance()
                        .isSignedIn.listen(status =>
                        status
                            ? this.dispatchEvent(new Event('loggedIn'))
                            : this.dispatchEvent(new Event('loggedOut'))
                    );

                    resolve(window.gapi);
                } catch (error) {
                    reject(new Error(error.error.message));
                }
            });
        });
    }

    async singIn() {
        await window.gapi.auth2.getAuthInstance().signIn();
    }

    static get AuthResponse() {
        return window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
    }

    static get BasicProfile() {
        return window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
    }

    static get id_token() {
        return window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
    }
}

export default Google;

// let googleUser = Google.BasicProfile
// customConsole(googleUser, 'Google user')
// customConsole(auth_response, 'auth response')
// customConsole(auth_response.id_token, 'id_token')
// customConsole(auth_response.access_token, 'access_token')
//
// // var profile = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
// console.log('ID: ' + googleUser.getId());
// console.log('Full Name: ' + googleUser.getName());
// console.log('Given Name: ' + googleUser.getGivenName());
// console.log('Family Name: ' + googleUser.getFamilyName());
// // console.log('Image URL: ' + profile.getImageUrl());
// console.log('Email: ' + googleUser.getEmail());