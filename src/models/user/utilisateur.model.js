import * as R from 'ramda'
import {format, isValid} from "date-fns";
import GenreModel from "@/models/user/genre.model";

export default class UtilisateurModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.username = R.is(String, json.username) ? json.username : ""
        this.first_name = R.is(String, json.first_name) ? json.first_name : ""
        this.last_name = R.is(String, json.last_name) ? json.last_name : ""
        this.mensurations_count = R.is(Number, json.mensurations_count) ? json.mensurations_count : 0
        this.image = R.is(String, json.image) ? json.image : ""
        this.email = R.is(String, json.email) ? json.email : ""
        this.numero_tel = R.is(String, json.numero_tel) ? json.numero_tel : ""
        this.is_superuser = R.is(Boolean, json.is_superuser) ? json.is_superuser : false
        this.is_staff = R.is(Boolean, json.is_staff) ? json.is_staff : false
        this.is_active = R.is(Boolean, json.is_active) ? json.is_active : false
        this.is_verified = R.is(Boolean, json.is_verified) ? json.is_verified : false
        this.genre = R.is(Object, json.genre) ? new GenreModel(json.genre) : new GenreModel()

        this.created_at = json.created_at && isValid(json.created_at) ? format(json.created_at, "DD-MM-YYYY") : null
        this.updated_at = json.updated_at && isValid(json.updated_at) ? format(json.updated_at, "DD-MM-YYYY") : null
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
            ref_genre: this.genre.id
        }
    }

    static get validations() {
        return {}
    }

    static get tableFields() {
        return [
            {key: 'image', label: 'Image', sortable: false},
            {key: 'is_staff', label: 'Role', sortable: true},
            {key: 'username', label: 'Username', sortable: true, sortDirection: 'desc'},
            {key: 'first_name', label: 'Prénom', sortable: true, sortDirection: 'desc'},
            {key: 'last_name', label: 'Nom', sortable: true, sortDirection: 'desc'},
            {key: 'email', label: 'Email', sortable: true, sortDirection: 'desc'},
            {
                key: 'is_active', label: 'Active',
                // eslint-disable-next-line no-unused-vars
                formatter: (value, key, item) => {
                    return value ? 'Oui' : 'Non'
                },
                sortable: true,
                sortByFormatted: true,
                filterByFormatted: true
            },
            {key: 'is_verified', label: 'Vérifié', sortable: true},
            // {key: 'actions', label: 'Actions'}
        ]
    }

    getFullName() {
        let prenom = this.first_name !== '' ? this.first_name : 'Prénom'
        let nom = this.last_name !== '' ? this.last_name : 'Nom'
        return `${prenom} ${nom}`
    }
}