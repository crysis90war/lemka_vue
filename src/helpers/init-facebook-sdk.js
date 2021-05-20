// const facebookAppId = process.env.VUE_APP_FACEBOOK_APP_ID;
//
// export function initFacebookSdk() {
//     return new Promise(resolve => {
//         window.fbAsyncInit = function () {
//             FB.init({
//                 appId: facebookAppId,
//                 cookie: true,
//                 xfbml: true,
//                 version: 'v8.0'
//             });
//
//             //
//             FB.getLoginStatus(({authResponse}) => {
//                 if (authResponse) {
//                     console.log('init-facebook-sdk')
//                 } else {
//                     resolve();
//                 }
//             });
//         };
//
//         // load facebook sdk script
//         (function (d, s, id) {
//             let js, fjs = d.getElementsByTagName(s)[0];
//             if (d.getElementById(id)) {
//                 return;
//             }
//             js = d.createElement(s);
//             js.id = id;
//             js.src = "https://connect.facebook.net/en_US/sdk.js";
//             fjs.parentNode.insertBefore(js, fjs);
//         }(document, 'script', 'facebook-jssdk'));
//     });
// }