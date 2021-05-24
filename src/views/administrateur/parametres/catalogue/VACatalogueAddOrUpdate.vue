<template>
  <div class="add_or_update_catalogue">
    <l-spinner v-if="isLoading === true"/>

    <b-card
        v-else
        :title="this.$route.params.id !== undefined ? getFullCatalogueName(catalogue) : 'Ajouter un catalogue'"
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <b-card-body>
        <b-row>
          <b-col lg="4">
            <b-button-group size="sm" class="mb-1">
              <b-button variant="outline-success"><i class="fas fa-plus-square"></i></b-button>
              <b-button variant="outline-primary" disabled><i class="fas fa-edit"></i></b-button>
              <b-button variant="outline-danger" disabled><i class="fas fa-trash-alt"></i></b-button>
            </b-button-group>
            <b-form-select
                v-model="catalogue.rayon"
                :select-size="4"
            >
              <b-form-select-option v-for="rayon in rayons" :key="rayon.id" :value="rayon">{{ rayon.rayon }}</b-form-select-option>
            </b-form-select>
          </b-col>
          <b-col lg="4">
            <b-button-group size="sm" class="mb-1">
              <b-button variant="outline-success"><i class="fas fa-plus-square"></i></b-button>
              <b-button variant="outline-primary" disabled><i class="fas fa-edit"></i></b-button>
              <b-button variant="outline-danger" disabled><i class="fas fa-trash-alt"></i></b-button>
            </b-button-group>
            <b-form-select
                v-model="catalogue.section"
                :select-size="4"
            >
              <b-form-select-option v-for="section in sections" :key="section.id" :value="section">{{ section.section }}
              </b-form-select-option>
            </b-form-select>
          </b-col>
          <b-col lg="4">
            <b-button-group size="sm" class="mb-1">
              <b-button variant="outline-success"><i class="fas fa-plus-square"></i></b-button>
              <b-button variant="outline-primary" disabled><i class="fas fa-edit"></i></b-button>
              <b-button variant="outline-danger" disabled><i class="fas fa-trash-alt"></i></b-button>
            </b-button-group>
            <b-form-select
                v-model="catalogue.type_produit"
                :select-size="4"
            >
              <b-form-select-option v-for="type_produit in type_produits" :key="type_produit.id" :value="type_produit">
                {{ type_produit.type_produit }}
              </b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>

        <div class="text-center my-2">
          <b-alert :variant="`${catalogueExist === true ? 'danger':'success'}`" show="">{{ message }}</b-alert>
        </div>

        <l-button-group
            class="mt-2"
            :to="routes.PARAMETRES_CATALOGUE.name"
            :submit="submit"
            :submit-status="submitStatus"
            :params="this.$route.params.id !== undefined"
        />
      </b-card-body>
    </b-card>

    <l-jumbotron :data="catalogueExist" header="Message" class="mt-5"/>
    <l-jumbotron :data="catalogue" header="Catalogue" class="mt-5"/>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {commonMixin} from "@/mixins/common.mixin";
import {htmlTitle} from "@/utils/tools";
import LemkaHelpers from "@/helpers";
import CatalogueModel from "@/models/catalogue/catalogue.model";
import {mapActions, mapGetters} from "vuex";
import LButtonGroup from "@/components/LButtonGroup";

export default {
  name: "VACatalogueAddOrUpdate",
  components: {LButtonGroup},
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  title() {
    return htmlTitle('Catalogue');
  },
  data() {
    return {
      catalogue: new CatalogueModel(),
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes
    }
  },
  computed: {
    ...mapGetters({
      catalogues: "Catalogues/catalogues",
      rayons: "Rayons/rayons",
      sections: "Sections/sections",
      type_produits: "TypeProduits/typeProduits"
    }),
    catalogueExist() {
      if (this.catalogue.rayon.id !== null && this.catalogue.section.id !== null && this.catalogue.type_produit.id !== null) {
        let catalogue = this.catalogues.find(item => item.rayon.id === this.catalogue.rayon.id && item.section.id === this.catalogue.section.id && item.type_produit.id === this.catalogue.type_produit.id)
        return catalogue !== undefined;
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions({
      loadCatalogues: "Catalogues/loadCatalogues",
      loadRayons: "Rayons/loadRayons",
      loadSections: "Sections/loadSections",
      loadTypeProduits: "TypeProduits/loadTypeProduits",
      createCatalogue: "Catalogues/createCatalogue",
      updateCatalogue: "Catalogues/updateCatalogue"
    }),
    initialisation: async function () {
      if (this.catalogues.length === 0) {
        await this.loadCatalogues()
      }
      if (this.rayons.length === 0) {
        await this.loadRayons()
      }
      if (this.sections.length === 0) {
        await this.loadSections()
      }
      if (this.type_produits.length === 0) {
        await this.loadTypeProduits()
      }
    },
    chargerCatalogue: async function () {
      this.toggleLoading()
      await this.initialisation()
      if (this.$route.params.id !== undefined) {
        let catalogue = await this.$store.getters["Catalogues/catalogue"](parseInt(this.$route.params.id))
        if (catalogue !== undefined) {
          Object.assign(this.catalogue, await catalogue)
          this.$route.meta.value = "CATALOGUE NAME"
        } else {
          await this.$router.push({name: this.routes.PARAMETRES_CATEGORIE.name})
        }
      } else {
        this.$route.meta.value = "Ajout catalogue"
      }
      this.toggleLoading()
    },
    submit: async function () {
      if (this.catalogueExist === true) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.id !== undefined) {
          await this.updateCatalogue(this.catalogue.toUpdatePayload())
        } else {
          await this.createCatalogue(this.catalogue.toCreatePayload())
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: LemkaHelpers.Routes.PARAMETRES_CATALOGUE.name})
        }, 500)
      }
    },
    getFullCatalogueName: function (item) {
      let rayon = item.rayon.rayon;
      let section = item.section.section;
      let type_produit = item.type_produit.type_produit
      return `${rayon} / ${section} / ${type_produit}`
    }
  },
  created() {
    this.chargerCatalogue()
  }
}
</script>

<style scoped>

</style>