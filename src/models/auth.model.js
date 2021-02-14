import * as R from 'ramda'

class TokenModel {
    constructor(tokens = {}) {
        this.access = R.is(String, tokens.access) ? tokens.access : ""
        this.refresh = R.is(String, tokens.refresh) ? tokens.refresh : ""
    }
}

export default class AuthModel {
    constructor(auth = {}) {
        this.email = R.is(String, auth.email) ? auth.email : ""
        this.password = R.is(String, auth.password) ? auth.password : ""
        this.tokens = R.is(Object, auth.tokens) ? new TokenModel(this.tokens) : null
    }

    toCreatePayload() {
        return {

        }
    }
}