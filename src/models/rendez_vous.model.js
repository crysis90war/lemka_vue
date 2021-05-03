import * as R from 'ramda'
import {format, isValid} from "date-fns";
import TypeServiceModel from "@/models/type_service.model";
import DevisModel from "@/models/devis/devis.model";

export default class RendezVousModel {
    constructor(json = {}) {
        this.id = R.is(Number, json.id) ? json.id : null
        this.date = json.date && isValid(json.date) ? format(json.date, "DD-MM-YYYY") : null
        this.start = json.start && isValid(json.start) ? format(json.start, "HH-mm") : null
        this.end = json.end && isValid(json.end) ? format(json.end, "HH-mm") : null
        this.est_annule = R.is(Boolean, json.est_annule) ? json.est_annule : false
        this.type_service = R.is(Object, json.type_service) ? new TypeServiceModel(json.type_service) : new TypeServiceModel()
        this.devis = R.is(Object, json.devis) ? new DevisModel(json.devis) : null
    }

    toCreatePayload() {
        return {
            date: this.date,
            start: this.start,
            est_annule: this.est_annule,
            ref_type_service: this.type_service.id,
            ref_devis: this.devis !== null ? this.devis.id : null
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            id: this.id
        }
    }
}