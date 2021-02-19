<template>
  <div v-if="$route.name === links.entreprise">

    <div v-if="entLength === 0">
      <b-button :to="{name:links.addEntreprise}" variant="outline-success">Ajouter informations</b-button>
      <p>Aucune information pour le moment, veuillez en ajouter</p>
    </div>

    <div v-if="entLength === 1">
      <b-button variant="outline-primary" :to="{name: links.updateEntreprise}" class="mb-3">Modifier</b-button>
      <div>
          <h3>{{entreprise.nom_societe}}</h3>
          <h5>{{entreprise.numero_tva}}</h5>
          <hr>
          <div>
            <span class="mr-2"><i :class="icons.email"></i></span>
            <span>{{ entreprise.mail_contact }}</span>
          </div>
          <div>
            <span class="mr-2"><i :class="icons.phone"></i></span>
            <span>{{ entreprise.numero_tel }}</span>
          </div>
          <div>
            <span class="mr-2"><i :class="icons.globe"></i></span>
            <span>{{ entreprise.site_web }}</span>
          </div>
          <hr>
          <div>
            <span><i :class="icons.adresse" class="mr-2"></i></span>
          </div>

          <div v-if="entreprise.ref_ville !== null">
            <span>{{ entreprise.rue }}, {{ entreprise.numero }}</span><br>
            <span>{{ entreprise.ref_ville.code_postale }} - {{ entreprise.ref_ville.ville }}</span><br>
            <span>{{ entreprise.ref_ville.ref_pays.pays }}</span>
          </div>
      </div>
    </div>
    <div v-if="entreprise < 0 && entLength > 1">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import EntrepriseModel from "@/models/entreprise.model";
import VilleModel from "@/models/ville.model";
import PaysModel from "@/models/pays.model";

export default {
  name: "ViewAdminEntreprise",
  data() {
    return {
      entLength: null,
      entreprise: new EntrepriseModel(),
      card_shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW,
      links: {
        entreprise: LemkaEnums.Routes.PARAMETRES_ENTREPRISE.name,
        addEntreprise: LemkaEnums.Routes.PARAMETRES_ENTREPRISE_ADD.name,
        updateEntreprise: LemkaEnums.Routes.PARAMETRES_ENTREPRISE_UPDATE.name,
      },
      icons: {
        email: LemkaEnums.FontAwesomeIcons.EMAIL,
        phone: LemkaEnums.FontAwesomeIcons.PHONE,
        globe: LemkaEnums.FontAwesomeIcons.GLOBE,
        adresse: LemkaEnums.FontAwesomeIcons.HOME,
      },
    }
  },
  methods: {
    async chargerEntreprise() {
      this.entLength = (await this.checkEntreprise()).length
      let entrepriseId = (await this.checkEntreprise()).id
      if (entrepriseId !== null && entrepriseId !== undefined) {
        let entreprise = await EntrepriseModel.getEntrepriseDetail(entrepriseId)
        if (entreprise.ref_ville !== null && entreprise.ref_ville !== undefined) {
          let ville = await VilleModel.fetchVille(entreprise.ref_ville)
          entreprise.ref_ville = ville
          if (ville.ref_pays !== null && ville.ref_pays !== undefined) {
            ville.ref_pays = await PaysModel.fetchPays(ville.ref_pays)
          }
        }

        Object.assign(this.entreprise, entreprise)
      } else {
        this.entreprise = new EntrepriseModel()
      }
    },

    async checkEntreprise() {
      let id = null
      let entreprises = await EntrepriseModel.getEntrepriseList()
      let length = entreprises.length
      if (length > 0) {
        id = entreprises[0].id
      }
      return {
        length: length,
        id: id
      }
    }
  },
  created() {
    this.chargerEntreprise()
  }
}
</script>

<style scoped>

</style>