import * as R from "ramda";
import {format, isValid} from "date-fns";
import GenreModel from "@/models/genre.model";
import {alphaNum, maxLength, minLength, numeric, required} from "vuelidate/lib/validators";

export default class ProfilModel {
    constructor(profil = {}) {
        this.username = R.is(String, profil.username) ? profil.username : ""
        this.email = R.is(String, profil.email) ? profil.email : ""
        this.last_login = profil.last_login && isValid(profil.last_login) ? format(profil.last_login, "DD-MM-YYYY") : null
        this.created_at = profil.created_at && isValid(profil.created_at) ? format(profil.created_at, "DD-MM-YYYY") : null
        this.updated_at = profil.updated_at && isValid(profil.updated_at) ? format(profil.updated_at, "DD-MM-YYYY") : null
        this.is_verified = R.is(Boolean, profil.is_verified) ? profil.is_verified : false
        this.is_active = R.is(Boolean, profil.is_active) ? profil.is_active : false
        this.is_staff = R.is(Boolean, profil.is_staff) ? profil.is_staff : false
        this.image = R.is(String, profil.image) ? profil.image : ""
        this.first_name = R.is(String, profil.first_name) ? profil.first_name : ""
        this.last_name = R.is(String, profil.last_name) ? profil.last_name : ""
        this.numero_tel = R.is(String, profil.numero_tel) ? profil.numero_tel : ""
        this.ref_genre = R.is(Object, profil.ref_genre) ? new GenreModel(profil.ref_genre) : new GenreModel()
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