const facebookAppId = process.env.VUE_APP_FACEBOOK_APP_ID;

export function initFacebookSdk() {
    return new Promise(resolve => {
        window.fbAsyncInit = function () {
            // eslint-disable-next-line no-undef
            FB.init({
                appId: facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v10.0'
            });
            // eslint-disable-next-line no-undef
            FB.getLoginStatus(({authResponse}) => {
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
    });
}