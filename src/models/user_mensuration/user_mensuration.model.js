import * as R from "ramda";
import {required, minLength, maxLength } from "vuelidate/lib/validators"
import MesureModel from "@/models/user_mensuration/mesure.model";

export default class UserMensurationModel {
    constructor(mensuration = {}) {
        this.id = R.is(Number, mensuration.id) ? mensuration.id : null
        this.titre = R.is(String, mensuration.titre) ? mensuration.titre : ""
        this.is_main = R.is(Boolean, mensuration.is_main) ? mensuration.is_main : false
        this.mesures = R.is(Array, mensuration.mesures) ? [new MesureModel(mensuration.mesures)] : []
    }

    toCreatePayload() {
        return {
            titre: this.titre,
            is_main: this.is_main
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            id: this.id
        }
    }

    static get validations() {
        return {
            titre: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(100)
            }
        }
    }

    static get tableFields() {
        return [
            {key: 'is_main', label: '#', sortable: true},
            {key: 'titre', label: 'Titre', sortable: true},
            {key: 'actions', label: 'Actions'}
        ]
    }
}