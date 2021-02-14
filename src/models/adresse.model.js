import * as R from 'ramda'
import VilleModel from "@/models/ville.model";
import {minLength, alphaNum} from "vuelidate/lib/validators"
import ApiService from "@/services";

export default class AdresseModel {
    constructor(adresse = {}) {
        this.id = R.is(Number, adresse.id) ? adresse.id : null
        this.rue = R.is(String, adresse.rue) ? adresse.rue : ""
        this.numero = R.is(String, adresse.numero) ? adresse.numero : ""
        this.boite = R.is(String, adresse.boite) ? adresse.boite : ""
        this.ref_ville = R.is(Object, adresse.ref_ville) ? new VilleModel(adresse.ref_ville) : null
    }

    toCreatePayload() {
        return {
            rue: this.rue,
            numero: this.numero,
            boite: this.boite,
            ref_ville: this.ref_ville.id
        }
    }

    toUpdatePayload() {
        return {
            ...this.toCreatePayload(),
            // id: this.id
        }
    }

    static get validations() {
        return {
            rue: {
                minLength: minLength(3)
            },
            numero: {
                minLength: minLength(1),
                alphaNum
            },
            boite: {
                minLength: minLength(1),
                alphaNum
            }
        }
    }

    static async getAdresseDetail() {
        let adresse = null
        await ApiService.AdresseService.getAdresse().then(response => {
            adresse = response.data
        }).catch(error => {
            if (error.response.status === 404) {
                adresse = null
            }
        })
        await this.recuperationVillePays(adresse);
        return adresse
    }

    static async getAdresseByUsername(username) {
        let adresse = null;
        await ApiService.AdresseService.getAdresseByUsername(username).then(response => {
            adresse = response.data
        }, error => {
            if (error.response.status === 404) {
                adresse = null
            }
        })
        await this.recuperationVillePays(adresse);
        return adresse
    }

    static async recuperationVillePays(adresse) {
        if (adresse !== null && !R.isEmpty(adresse) && adresse !== undefined) {
            let ville = null
            await ApiService.VilleService.getVillesDetail(adresse.ref_ville).then(response => {
                ville = response.data
            })
            if (ville !== null) {
                let pays = null
                await ApiService.PaysService.getPaysDetail(ville.ref_pays).then(response => {
                    pays = response.data
                    ville.ref_pays = pays
                })
            }
            adresse.ref_ville = ville
        }
    }

    static async updateAdresse(payload) {
        await ApiService.AdresseService.putAdresse(payload)
    }

    static async createAdresse(payload) {
        await ApiService.AdresseService.postAdresse(payload)
    }
}