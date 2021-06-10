import * as R from 'ramda'
import {format, isValid} from "date-fns";
import ServiceModel from "@/models/autre/service.model";
import DevisModel from "@/models/devis/devis.model";
import {required} from "vuelidate/lib/validators";

export default class RendezVousModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.date = json.date && isValid(json.date) ? format(json.date, "DD-MM-YYYY") : null
        this.start = json.start && isValid(json.start) ? format(json.start, "HH-mm") : null
        this.end = json.end && isValid(json.end) ? format(json.end, "HH-mm") : null
        this.est_annule = R.is(Boolean, json.est_annule) ? json.est_annule : false
        this.service = R.is(Object, json.service) ? new ServiceModel(json.service) : new ServiceModel()
        this.devis = R.is(Object, json.devis) ? new DevisModel(json.devis) : null
    }

    toCreatePayload() {
        return {
            date: this.date,
            start: this.start,
            est_annule: this.est_annule,
            ref_service: this.service.id,
            ref_devis: this.devis !== null ? this.devis.id : null
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
            date: {
                required,
            },
            start: {
                required,
            }
        }
    }

    static get commonTableFields() {
        return [
            {key: 'created_at', label: 'Créé le', sortable: true},
            {key: 'service', label: 'Service', sortable: true},
            {key: 'devis', label: 'Devis', sortable: true},
            {key: 'date', label: 'Date', sortable: true},
            {key: 'start', label: 'De', sortable: true},
            {key: 'end', label: 'À', sortable: true}
        ]
    }

    static get todayAndFuturTableFields() {
        return [
            ...this.commonTableFields,
            {key: 'actions', label: 'Actions'},
        ]
    }

    static get pastTableFields() {
        return [
            {key: 'created_at', label: 'Créé le', sortable: true},
            {key: 'service', label: 'Service', sortable: true},
            {key: 'devis', label: 'Devis', sortable: true},
            {key: 'date', label: 'Date', sortable: true},
            {key: 'start', label: 'De', sortable: true},
            {key: 'end', label: 'À', sortable: true}
        ]
    }

    static get canceledTableFields() {
        return [
            {key: 'created_at', label: 'Créé le', sortable: true},
            {key: 'service', label: 'Service', sortable: true},
            {key: 'devis', label: 'Devis', sortable: true},
            {key: 'date', label: 'Date', sortable: true},
            {key: 'start', label: 'De', sortable: true},
            {key: 'end', label: 'À', sortable: true}
        ]
    }

    getVariant (status) {
        switch (status) {
            case 1:
                return 'success'
            case 2:
                return ''
            default:
                return 'active'
        }
    }
}