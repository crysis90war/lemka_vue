import ApiService from "@/services";
import * as R from 'ramda'
import {format, isValid} from "date-fns";
import GenreModel from "@/models/genre.model";

export default class UtilisateurModel {
    constructor(utilisateur = {}) {
        this.id = R.is(Number, utilisateur.id) ? utilisateur.id : null
        this.username = R.is(String, utilisateur.username) ? utilisateur.username : ""
        this.first_name = R.is(String, utilisateur.first_name) ? utilisateur.first_name : ""
        this.last_name = R.is(String, utilisateur.last_name) ? utilisateur.last_name : ""
        this.image = R.is(String, utilisateur.image) ? utilisateur.image : ""

        this.email = R.is(String, utilisateur.email) ? utilisateur.email : ""
        this.numero_tel = R.is(String, utilisateur.numero_tel) ? utilisateur.numero_tel : ""

        this.is_superuser = R.is(Boolean, utilisateur.is_superuser) ? utilisateur.is_superuser : false
        this.is_staff = R.is(Boolean, utilisateur.is_staff) ? utilisateur.is_staff : false
        this.is_active = R.is(Boolean, utilisateur.is_active) ? utilisateur.is_active : false
        this.is_verified = R.is(Boolean, utilisateur.is_verified) ? utilisateur.is_verified : false


        this.ref_genre = R.is(Object, utilisateur.ref_genre) ? new GenreModel(utilisateur.ref_genre) : null

        this.created_at = utilisateur.created_at && isValid(utilisateur.created_at) ? format(utilisateur.created_at, "DD-MM-YYYY") : null
        this.updated_at = utilisateur.updated_at && isValid(utilisateur.updated_at) ? format(utilisateur.updated_at, "DD-MM-YYYY") : null
        this.last_login = utilisateur.last_login && isValid(utilisateur.last_login) ? format(utilisateur.last_login, "DD-MM-YYYY") : null

    }

    toUpdatePayload() {
        return {
            username: this.username,
            email: this.email,
            numero_tel: this.numero_tel,
            first_name: this.first_name,
            last_name: this.last_name,
            is_active: this.is_active,
            is_staff: this.is_staff,
            ref_genre: this.ref_genre.id
        }
    }

    static get validations() {
        return {

        }
    }

    static async fetchUtilisateurs() {
        let utilisateur = []
        await ApiService.UtilisateurService.getUtilisateurList().then(response => {
            utilisateur = response.data
        })
        return utilisateur
    }

    static async getUtilisateurDetail(username) {
        let utilisateur = {}
        await ApiService.UtilisateurService.getUtilisateurDetail(username).then(response => {
            utilisateur = response.data
        })
        return utilisateur
    }

    static async getUtilisateurAdresse(username) {
        let adresse = {}
        await ApiService.UtilisateurService.getUtilisateurAdresse(username).then(response => {
            adresse = response.data
        })
        return adresse
    }
}