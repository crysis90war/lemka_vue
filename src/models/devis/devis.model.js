import * as R from 'ramda'
import DemandeDevisModel from "@/models/demande_devis.model";
import {format, isValid} from "date-fns";

export default class DevisModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.created_at = json.created_at && isValid(json.created_at) ? format(json.created_at, "DD-MM-YYYY") : null
        this.updated_at = json.updated_at && isValid(json.updated_at) ? format(json.updated_at, "DD-MM-YYYY") : null
        this.numero_devis = R.is(String, json.numero_devis) ? json.numero_devis : ""
        this.remarque = R.is(String, json.remarque) ? json.remarque : ""
        this.est_accepte = R.is(Boolean, json.est_accepte) ? json.est_accepte : null
        this.est_soumis = R.is(Boolean, json.est_soumis) ? json.est_soumis : false
        this.numero_demande_devis = R.is(String, json.numero_demande_devis) ? json.numero_demande_devis : ""
        this.details = R.is(Array, json.details) ? json.details : []
        this.demande_devis = R.is(Object, json.demande_devis) ? new DemandeDevisModel(json.demande_devis) : new DemandeDevisModel()
    }

    toCreatePayload() {
        return {
            remarque: this.remarque,
            est_soumis: this.est_soumis,
            ref_demande_devis: this.demande_devis.id
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            id: this.id
        }
    }

    toUpdateRemarque() {
        return {
            remarque: this.remarque,
            numero_devis: this.numero_devis
        }
    }

    static get validations() {
        return {}
    }

    static get tableFields() {
        return [
            {key: "created_at", label: "Date", sortable: true},
            {key: "numero_devis", label: "N° Devis", sortable: true},
            {key: "numero_demande_devis", label: "N° Demande devis", sortable: true},
            {key: "demande_devis_titre", label: "Titre", sortable: true},
            {key: "est_accepte", label: "Statut", sortable: true},
            {key: "actions", label: "Actions"},
        ]
    }

    static get userTableFields() {
        return [
            {key: 'created_at', label: 'Date', sortable: true},
            {key: 'numero_devis', label: 'N° Devis', sortable: true},
            {key: 'numero_demande_devis', label: 'N° Demande devis', sortable: true},
            {key: 'est_accepte', label: 'Décision', sortable: true},
            {key: "actions", label: "Actions"},
        ]
    }

    statutDevis (item) {
        let statut = {
            etat: undefined,
            variant: undefined
        }
        switch (item.est_accepte) {
            case true:
                statut.etat = 'Accepté';
                statut.variant = 'success'
                break;
            case false:
                statut.etat = 'Réfusé';
                statut.variant = 'danger';
                break;
            case null:
                statut.etat = 'En attente';
                statut.variant = 'warning';
                break;
            default:
                console.log(item)
                break;
        }
        return statut
    }

    getFullName() {
        let prenom = this.demande_devis.ref_user.first_name !== '' ? this.demande_devis.ref_user.first_name : 'Prénom'
        let nom = this.demande_devis.ref_user.last_name !== '' ? this.demande_devis.ref_user.last_name : 'Nom'
        return `${prenom} ${nom}`
    }
}