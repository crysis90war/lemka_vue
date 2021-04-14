import * as R from 'ramda'
import DemandeDevisModel from "@/models/demande_devis.model";
import {format, isValid} from "date-fns";

export default class DevisModel {
    constructor(devis = {}) {
        this.id = R.is(Number, devis.id) ? devis.id : null
        this.created_at = devis.created_at && isValid(devis.created_at) ? format(devis.created_at, "DD-MM-YYYY") : null
        this.updated_at = devis.updated_at && isValid(devis.updated_at) ? format(devis.updated_at, "DD-MM-YYYY") : null
        this.numero_devis = R.is(String, devis.numero_devis) ? devis.numero_devis : ""
        this.remarque = R.is(String, devis.remarque) ? devis.remarque : ""
        this.est_accepte = R.is(Boolean, devis.est_accepte) ? devis.est_accepte : null
        this.est_soumis = R.is(Boolean, devis.est_soumis) ? devis.est_soumis : false
        this.numero_demande_devis = R.is(String, devis.numero_demande_devis) ? devis.numero_demande_devis : ""
        this.details = R.is(Array, devis.details) ? devis.details : []
        this.demande_devis = R.is(Object, devis.demande_devis) ? new DemandeDevisModel(devis.demande_devis) : new DemandeDevisModel()
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
            numero_devis: this.numero_devis
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
        }
        return statut
    }
}