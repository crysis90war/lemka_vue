import * as R from "ramda";
import {format, isValid} from "date-fns";
import GenreModel from "@/models/genre.model";
import {alphaNum, maxLength, minLength, numeric, required} from "vuelidate/lib/validators";

export default class ProfilModel {
    constructor(json = {}) {
        this.username = R.is(String, json.username) ? json.username : ""
        this.email = R.is(String, json.email) ? json.email : ""
        this.last_login = json.last_login && isValid(json.last_login) ? format(json.last_login, "DD-MM-YYYY") : null
        this.created_at = json.created_at && isValid(json.created_at) ? format(json.created_at, "DD-MM-YYYY") : null
        this.updated_at = json.updated_at && isValid(json.updated_at) ? format(json.updated_at, "DD-MM-YYYY") : null
        this.is_verified = R.is(Boolean, json.is_verified) ? json.is_verified : false
        this.is_active = R.is(Boolean, json.is_active) ? json.is_active : false
        this.is_staff = R.is(Boolean, json.is_staff) ? json.is_staff : false
        this.image = R.is(String, json.image) ? json.image : ""
        this.first_name = R.is(String, json.first_name) ? json.first_name : ""
        this.last_name = R.is(String, json.last_name) ? json.last_name : ""
        this.numero_tel = R.is(String, json.numero_tel) ? json.numero_tel : ""
        this.genre = R.is(Object, json.genre) ? new GenreModel(json.genre) : new GenreModel()
    }

    toUpdatePayload() {
        return {
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            numero_tel: this.numero_tel,
            ref_genre: this.genre.id
        }
    }

    static get validations() {
        return {
            username: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(30),
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

    // static async updateProfilImage(payload) {
    //     await ApiService.ProfilService.updateProfilImage(payload)
    // }
}