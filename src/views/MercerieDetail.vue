<template>
  <div class="article_detail">
    <l-spinner v-if="isLoading"/>

    <div v-else class="my-5">
      <b-container>
        <b-row>
          <b-col
              lg="7"
              :class="mercerie.images.length > 0 ? '' : 'my-auto'"
          >
            <lightbox
                v-if="mercerie.images.length > 0"
                :items="getImagesUrl(mercerie.images)"
                :cells="3"
            />
            <div
                v-else
                class="text-center"
            >
              <p>Cete mercerie n'a pas d'image(s)</p>
            </div>
          </b-col>

          <b-col lg="5">
            <h2>{{ mercerie.reference }}</h2>
            <h3>{{ mercerie.nom }}</h3>
            <h5>{{ mercerie.categorie.nom }}</h5>

            <h5>Couleur : {{mercerie.couleur.nom}}</h5>
            <p style="white-space: pre-wrap">{{ mercerie.description }}</p>
            <ul>
              <li v-for="(caracteristique, index) in mercerie.caracteristiques"
                  :key="index">{{ caracteristique.caracteristique.nom }} - {{ caracteristique.valeur }}
              </li>
            </ul>
            <h5>Prix : {{mercerie.prix_u_ht}}</h5>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import {commonMixin} from "@/mixins/common.mixin";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import MercerieModel from "@/models/mercerie/mercerie.model";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "MercerieDetail",
  mixins: [commonMixin],
  title() {
    return htmlTitle('Article')
  },
  props: {
    id: {
      required: true
    },
  },
  data() {
    return {
      icons: LemkaHelpers.FontAwesomeIcons,
      routes: LemkaHelpers.Routes,
      mercerie: new MercerieModel()
    }
  },
  computed: {
    ...mapGetters({merceries: "Merceries/globalMerceries"})
  },
  methods: {
    ...mapActions({loadMerceries: "Merceries/loadGlobalMerceries"}),
    initialisation: async function () {
      if (this.merceries.length === 0) {
        await this.loadMerceries()
      }
    },
    chargerMercerie: async function () {
      this.toggleLoading()
      await this.initialisation()
      let mercerie = this.merceries.find(item => item.id === parseInt(this.$route.params.id))
      if (mercerie !== undefined) {
        Object.assign(this.mercerie, mercerie)
      }
      this.toggleLoading()
    }
  },
  created() {
    this.chargerMercerie()
  }
}
</script>

<style scoped>

</style>