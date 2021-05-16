import * as R from 'ramda'
import {format, isValid} from "date-fns";

export default class HoraireModel{
    constructor(horaire = {}) {
        this.id = R.is(Number, horaire.id) ? horaire.id : null
        this.jour = R.is(String, horaire.jour) ? horaire.jour : ""
        this.jour_semaine = R.is(Number, horaire.jour_semaine) ? horaire.jour_semaine : null
        this.heure_ouverture = horaire.heure_ouverture && isValid(horaire.heure_ouverture) ? format(horaire.heure_ouverture, "HH-mm-ss") : null
        this.pause_debut = horaire.pause_debut && isValid(horaire.pause_debut) ? format(horaire.pause_debut, "HH-mm-ss") : null
        this.pause_fin = horaire.pause_fin && isValid(horaire.pause_fin) ? format(horaire.pause_fin, "HH-mm-ss") : null
        this.heure_fermeture = horaire.heure_fermeture && isValid(horaire.heure_fermeture) ? format(horaire.heure_fermeture, "HH-mm-ss") : null
        this.sur_rdv = R.is(Boolean, horaire.sur_rdv) ? horaire.sur_rdv : false
        this.est_ferme = R.is(Boolean, horaire.est_ferme) ? horaire.est_ferme : false
    }

    toCreatePayload() {
        return {
            // jour: this.jour,
            // jour_semaine: this.jour_semaine,
            heure_ouverture: this.heure_ouverture,
            pause_debut: this.pause_debut,
            pause_fin: this.pause_fin,
            heure_fermeture: this.heure_fermeture,
            sur_rdv: this.sur_rdv,
            est_ferme: this.est_ferme
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

        }
    }
}