class Facebook extends EventTarget {
    constructor({appId}) {
        super();

        this.appId = appId
    }

    async init() {
        return new Promise(resolve => {
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: this.appId,
                    cookie: true,
                    xfbml: true,
                    version: 'v8.0'
                });
                window.FB.getLoginStatus(({authResponse}) => {
                    if (authResponse) {
                        console.log('init-facebook-sdk')
                    } else {
                        resolve();
                    }
                });
            };

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        })
    }
}

export default Facebook;