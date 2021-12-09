import * as R from 'ramda'
import ProfilModel from "@/models/user/profil.model";
import {format, isValid} from "date-fns";
import ServiceModel from "@/models/autre/service.model";
import ArticleModel from "@/models/article/article.model";
import UserMensurationModel from "@/models/user/user_mensuration.model";
import {minLength, required, maxLength} from "vuelidate/lib/validators";

export default class DemandeDevisModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.created_at = json.created_at && isValid(json.created_at) ? format(json.created_at, "DD-MM-YYYY") : null
        this.numero_demande_devis = R.is(String, json.numero_demande_devis) ? json.numero_demande_devis : ""
        this.utilisateur = R.is(String, json.utilisateur) ? json.utilisateur : ""
        this.titre = R.is(String, json.titre) ? json.titre : ""
        this.remarque = R.is(String, json.remarque) ? json.remarque : ""
        this.est_urgent = R.is(Boolean, json.est_urgent) ? json.est_urgent : false
        this.est_soumis = R.is(Boolean, json.est_soumis) ? json.est_soumis : false
        this.est_traite = R.is(Boolean, json.est_traite) ? json.est_traite : false
        this.en_cours = R.is(Boolean, json.en_cours) ? json.en_cours : false
        this.service = R.is(Object, json.service) ? new ServiceModel(json.service) : new ServiceModel()
        this.mensuration = R.is(Object, json.mensuration) ? new UserMensurationModel(json.mensuration) : null
        this.article = R.is(Object, json.article) ? new ArticleModel(json.article) : null
        this.ref_user = R.is(Object, json.ref_user) ? new ProfilModel(json.ref_user) : new ProfilModel()
        this.merceries = R.is(Array, json.merceries) ? json.merceries : []
    }

    toCreatePayload() {
        return {
            titre: this.titre,
            remarque: this.remarque,
            est_urgent: this.est_urgent,
            est_soumis: this.est_soumis,
            est_traite: this.est_traite,
            en_cours: this.en_cours,
            ref_service: this.service.id,
            ref_article: this.article !== null ? this.article.id : null,
            ref_mensuration: this.mensuration !== null ? this.mensuration.id : null,
            ref_merceries: this.merceries.map(item => item.id)
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
            },
            remarque: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(512)
            }
        }
    }

    static get redactionTableFields() {
        return [
            {key: 'created_at', label: 'Date', sortable: true},
            {key: 'numero_demande_devis', label: 'Numéro', sortable: true},
            {key: 'titre', label: 'Titre', sortable: true},
            {key: 'est_urgent', label: 'Urgent', sortable: true},
            {key: 'actions', label: 'Actions'}
        ]
    }

    static get soumisTableFields() {
        return [
            {key: 'created_at', label: 'Date', sortable: true},
            {key: 'numero_demande_devis', label: 'Numéro', sortable: true},
            {key: 'titre', label: 'Titre', sortable: true},
            {key: 'est_urgent', label: 'Urgent', sortable: true},
        ]
    }

    static get traiteTableFields() {
        return [
            {key: 'created_at', label: 'Date', sortable: true},
            {key: 'numero_demande_devis', label: 'Numéro', sortable: true},
            {key: 'titre', label: 'Titre', sortable: true},
        ]
    }

    static get tableFields() {
        return [
            {key: 'created_at', label: 'Date', sortable: true},
            {key: 'numero_demande_devis', label: 'Numéro', sortable: true},
            {key: 'utilisateur', label: 'Nom', sortable: true},
            {key: 'est_urgent', label: 'Urgent', sortable: true},
            {key: 'est_traite', label: 'Traité', sortable: true},
            {key: 'actions', label: 'Actions'},
        ]
    }
}