import * as R from 'ramda'
import {required, email, maxLength, minLength, sameAs} from 'vuelidate/lib/validators'

class TokenModel {
    constructor(tokens = {}) {
        this.access = R.is(String, tokens.access) ? tokens.access : ""
        this.refresh = R.is(String, tokens.refresh) ? tokens.refresh : ""
    }
}

export default class AuthModel {
    constructor(auth = {}) {
        this.email = R.is(String, auth.email) ? auth.email : ""
        this.username = R.is(String, auth.username) ? auth.username : ""
        this.is_staff = R.is(Boolean, auth.is_staff) ? auth.is_staff : false
        this.password = R.is(String, auth.password) ? auth.password : ""
        this.password2 = R.is(String, auth.password2) ? auth.password2 : ""
        this.tokens = R.is(Object, auth.tokens) ? new TokenModel(this.tokens) : new TokenModel()
    }

    toRegisterPayload() {
        return {
            email: this.email,
            username: this.username,
            password: this.password,
            password2: this.password2
        }
    }

    toLoginPayload() {
        return {
            email: this.email,
            password: this.password
        }
    }

    static get loginValidations() {
        return {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(5)
            }
        }
    }

    static get registerValidations() {
        return {
            email: {
                required,
                email
            },
            username: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(50)
            },
            password: {
                required,
                minLength: minLength(5)
            },
            password2: {
                required,
                sameAsPassword: sameAs('password')
            }
        }
    }
}