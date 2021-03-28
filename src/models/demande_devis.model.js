import * as R from 'ramda'
import ProfilModel from "@/models/profil.model";
import {format, isValid} from "date-fns";
import TypeServiceModel from "@/models/type_service.model";
import ArticleModel from "@/models/article/article.model";
import UserMensurationModel from "@/models/user_mensuration/user_mensuration.model";
import {minLength, required, maxLength} from "vuelidate/lib/validators";


export default class DemandeDevisModel {
    constructor(demande_devis = {}) {
        this.id = R.is(Number, demande_devis.id) ? demande_devis.id : null
        this.created_at = demande_devis.created_at && isValid(demande_devis.created_at)
            ? format(demande_devis.created_at, "DD-MM-YYYY")
            : null
        this.numero_demande_devis = R.is(String, demande_devis.numero_demande_devis) ? demande_devis.numero_demande_devis : ""
        this.utilisateur = R.is(String, demande_devis.utilisateur) ? demande_devis.utilisateur : ""
        this.titre = R.is(String, demande_devis.titre) ? demande_devis.titre : ""
        this.remarque = R.is(String, demande_devis.remarque) ? demande_devis.remarque : ""
        this.est_urgent = R.is(Boolean, demande_devis.est_urgent) ? demande_devis.est_urgent : false
        this.est_soumis = R.is(Boolean, demande_devis.est_soumis) ? demande_devis.est_soumis : false
        this.est_traite = R.is(Boolean, demande_devis.est_traite) ? demande_devis.est_traite : false
        this.ref_type_service = R.is(Object, demande_devis.ref_type_service)
            ? new TypeServiceModel(demande_devis.ref_type_service)
            : new TypeServiceModel()
        this.ref_mensuration = R.is(Object, demande_devis.ref_mensuration)
            ? new UserMensurationModel(demande_devis.ref_mensuration)
            : new UserMensurationModel()
        this.ref_article = R.is(Object, demande_devis.ref_article)
            ? new ArticleModel(demande_devis.ref_article)
            : new ArticleModel()
        this.ref_mercerie_option = R.is(Array, demande_devis.ref_mercerie_option) ? [demande_devis.ref_type_service] : []
        this.ref_user = R.is(Object, demande_devis.ref_user) ? new ProfilModel(demande_devis.ref_user) : new ProfilModel()
    }

    toCreatePayload() {
        return {
            titre: this.titre,
            remarque: this.remarque,
            est_urgent: this.est_urgent,
            est_soumis: this.est_soumis,
            ref_type_service: this.ref_type_service.id,
            ref_article: this.ref_article.id,
            ref_mensuration: this.ref_mensuration.id,
            ref_mercerie_option: this.ref_mercerie_option
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
            {key: 'actions', label: 'Actions'}
        ]
    }

    static get taiteTableFields() {
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
            {key: 'actions:', label: 'Actions'},
        ]
    }
}