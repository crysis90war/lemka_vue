import * as R from 'ramda'
import {isValid, format} from 'date-fns'
import {required, minLength, alphaNum, numeric} from "vuelidate/lib/validators"
import ApiService from "@/services/";
import GenreModel from "@/models/genre.model";

export default class UserModel {
    constructor(user = {}) {
        this.username = R.is(String, user.username) ? user.username : ""
        this.email = R.is(String, user.email) ? user.email : ""
        this.last_login = user.last_login && isValid(user.last_login) ? format(user.last_login, "DD-MM-YYYY") : null
        this.created_at = user.created_at && isValid(user.created_at) ? format(user.created_at, "DD-MM-YYYY") : null
        this.updated_at = user.updated_at && isValid(user.updated_at) ? format(user.updated_at, "DD-MM-YYYY") : null
        this.is_verified = R.is(Boolean, user.is_verified) ? user.is_verified : false
        this.is_active = R.is(Boolean, user.is_active) ? user.is_active : false
        this.is_staff = R.is(Boolean, user.is_staff) ? user.is_staff : false
        this.image = R.is(String, user.image) ? user.image : ""
        this.first_name = R.is(String, user.first_name) ? user.first_name : ""
        this.last_name = R.is(String, user.last_name) ? user.last_name : ""
        this.numero_tel = R.is(String, user.numero_tel) ? user.numero_tel : ""
        this.ref_genre = R.is(Object, user.ref_genre) ? new GenreModel(user.ref_genre) : new GenreModel()
    }

    toUpdatePayload() {
        return {
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            numero_tel: this.numero_tel,
            ref_genre: this.ref_genre.id
        }
    }

    static get validations() {
        return {
            username: {
                required,
                minLength: minLength(4),
                alphaNum
            },
            first_name: {
                minLength: minLength(2),
            },
            last_name: {
                minLength: minLength(2),
            },
            numero_tel: {
                minLength: minLength(6),
                numeric
            }
        }
    }

    static async fetchProfil() {
        let user = {}
        await ApiService.UserService.getProfilDetail().then(response => {
            user = response.data
        })
        return user
    }
}