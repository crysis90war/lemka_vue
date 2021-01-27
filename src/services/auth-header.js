export default function authHeader() {
    let user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.tokens) {
        return { Authorization: 'Bearer ' + user.tokens.access }; // for Spring Boot back-end
        // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    }
    else {
        return {};
    }
}