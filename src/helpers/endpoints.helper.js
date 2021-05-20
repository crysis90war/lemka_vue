let DOMAIN;
if (process.env.VUE_APP_NODE_END === 'development') {
    DOMAIN = 'http://127.0.0.1:8000';
} else {
    DOMAIN = 'https://lemka-api.herokuapp.com';
}

export const Endpoints = {
    DOMAIN: DOMAIN
}