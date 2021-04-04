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
        this.ref_demande_de_devis = R.is(Object, devis.ref_demande_de_devis)
            ? new DemandeDevisModel(devis.ref_demande_de_devis)
            : new DemandeDevisModel()
    }

    toCreatePayload() {
        return {
            remarque: this.remarque,
            est_soumis: this.est_soumis,
            ref_demande_de_devis: this.ref_demande_de_devis.id
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            id: this.id
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
            {key: "est_accepte", label: "Statut", sortable: true},
            {key: "actions", label: "Actions"},
        ]
    }
}