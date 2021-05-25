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
          <!-- region Rayon -->
          <b-col lg="4">
            <add-update-delete-modal-component
                v-model="$v.rayon.nom.$model"

                :add-modal-id="modalAddRayon"
                add-modal-title="Ajout d'un rayon"
                @clickShowAddModal="toggleModal(modalAddRayon, typeCatalogue.RAYON, true)"
                @clickHideAddModal="toggleModal(modalAddRayon, typeCatalogue.RAYON, false)"
                @clickSubmitCreate="creerRayon(modalAddRayon, 'Ajout rayon', typeCatalogue.RAYON)"

                :update-modal-id="modalUpdateRayon"
                :update-delete-modal-title="catalogue.rayon.nom"
                @clickShowUpdateModal="showuUpdateDeleteModal(modalUpdateRayon, typeCatalogue.RAYON)"
                @clickHideUpdateModal="toggleModal(modalUpdateRayon, typeCatalogue.RAYON, false)"
                @clickSubmitUpdate="modifierRayon(modalUpdateRayon, 'Modification rayon', typeCatalogue.RAYON)"

                :delete-modal-id="modalDeleteRayon"
                @clickShowDeleteModal="showuUpdateDeleteModal(modalDeleteRayon, typeCatalogue.RAYON)"
                @clickHideDeleteModal="toggleModal(modalDeleteRayon, typeCatalogue.RAYON, false)"
                @clickSubmitDelete="supprimerRayon(modalDeleteRayon, 'Suppression rayon')"

                :disabled-buttons="catalogue.rayon.id === null"
                :submit-status="rayonSubmitStatus"
                input-label="Rayon"
                input-description="Veuillez encoder le rayon !"
                input-placeholder="ex: Maison"
                :validate-state="validateState($v.rayon, 'nom')"
            >
              <template #invalid-feedback-validations>
                <l-invalid-feedback
                    :condition="!$v.rayon.nom.required"
                    :error-message="required()"
                />
                <l-invalid-feedback
                    :condition="!$v.rayon.nom.minLength"
                    :error-message="minLength($v.rayon.nom.$params.minLength.min)"
                />
                <l-invalid-feedback
                    :condition="!$v.rayon.nom.maxLength"
                    :error-message="maxLength($v.rayon.nom.$params.maxLength.max)"
                />
                <l-invalid-feedback
                    :condition="!$v.rayon.nom.alpha"
                    :error-message="alpha()"
                />
              </template>
            </add-update-delete-modal-component>

            <b-form-select
                v-model="catalogue.rayon"
                :select-size="4"
            >
              <b-form-select-option v-for="rayon in rayons" :key="rayon.id" :value="rayon">{{ rayon.nom }}</b-form-select-option>
            </b-form-select>
          </b-col>
          <!-- endregion -->

          <!-- region Section -->
          <b-col lg="4">
            <add-update-delete-modal-component
                v-model="$v.section.nom.$model"

                :add-modal-id="modalAddSection"
                add-modal-title="Ajout d'un rayon"
                @clickShowAddModal="toggleModal(modalAddSection, typeCatalogue.SECTION, true)"
                @clickHideAddModal="toggleModal(modalAddSection, typeCatalogue.SECTION, false)"
                @clickSubmitCreate="creerSection(modalAddSection, 'Ajout section', typeCatalogue.SECTION)"

                :update-modal-id="modalUpdateSection"
                :update-delete-modal-title="catalogue.section.nom"
                @clickShowUpdateModal="showuUpdateDeleteModal(modalUpdateSection, typeCatalogue.SECTION)"
                @clickHideUpdateModal="toggleModal(modalUpdateSection, typeCatalogue.SECTION, false)"
                @clickSubmitUpdate="modifierSection(modalUpdateSection, 'Modification section', typeCatalogue.SECTION)"

                :delete-modal-id="modalDeleteSection"
                @clickShowDeleteModal="showuUpdateDeleteModal(modalDeleteSection, typeCatalogue.SECTION)"
                @clickHideDeleteModal="toggleModal(modalDeleteSection, typeCatalogue.SECTION, false)"
                @clickSubmitDelete="supprimerSection(modalDeleteSection, 'Suppression section')"

                :disabled-buttons="catalogue.section.id === null"
                :submit-status="sectionSubmitStatus"
                input-label="Section"
                input-description="Veuillez encoder la section !"
                input-placeholder="ex: Vêtements"
                :validate-state="validateState($v.section, 'nom')"
            >
              <template #invalid-feedback-validations>
                <l-invalid-feedback
                    :condition="!$v.section.nom.required"
                    :error-message="required()"
                />
                <l-invalid-feedback
                    :condition="!$v.section.nom.minLength"
                    :error-message="minLength($v.section.nom.$params.minLength.min)"
                />
                <l-invalid-feedback
                    :condition="!$v.section.nom.maxLength"
                    :error-message="maxLength($v.section.nom.$params.maxLength.max)"
                />
                <l-invalid-feedback
                    :condition="!$v.section.nom.alpha"
                    :error-message="alpha()"
                />
              </template>
            </add-update-delete-modal-component>

            <b-form-select
                v-model="catalogue.section"
                :select-size="4"
            >
              <b-form-select-option v-for="section in sections" :key="section.id" :value="section">{{ section.nom }}
              </b-form-select-option>
            </b-form-select>
          </b-col>
          <!-- endregion -->

          <!-- region Type Produit -->
          <b-col lg="4">
            <add-update-delete-modal-component
                v-model="$v.typeProduit.nom.$model"

                :add-modal-id="modalAddTypeProduit"
                add-modal-title="Ajout d'un type produit"
                @clickShowAddModal="toggleModal(modalAddTypeProduit, typeCatalogue.TYPE_PRODUIT, true)"
                @clickHideAddModal="toggleModal(modalAddTypeProduit, typeCatalogue.TYPE_PRODUIT, false)"
                @clickSubmitCreate="creerTypeProduit(modalAddTypeProduit, 'Ajout type produit', typeCatalogue.TYPE_PRODUIT)"

                :update-modal-id="modalUpdateTypeProduit"
                :update-delete-modal-title="catalogue.type_produit.nom"
                @clickShowUpdateModal="showuUpdateDeleteModal(modalUpdateTypeProduit, typeCatalogue.TYPE_PRODUIT)"
                @clickHideUpdateModal="toggleModal(modalUpdateTypeProduit, typeCatalogue.TYPE_PRODUIT, false)"
                @clickSubmitUpdate="modifierTypeProduit(modalUpdateTypeProduit, 'Modification type produit', typeCatalogue.TYPE_PRODUIT)"

                :delete-modal-id="modalDeleteTypeProduit"
                @clickShowDeleteModal="showuUpdateDeleteModal(modalDeleteTypeProduit, typeCatalogue.TYPE_PRODUIT)"
                @clickHideDeleteModal="toggleModal(modalDeleteTypeProduit, typeCatalogue.TYPE_PRODUIT, false)"
                @clickSubmitDelete="supprimerTypeProduit(modalDeleteTypeProduit, 'Suppression type produit')"

                :disabled-buttons="catalogue.type_produit.id === null"
                :submit-status="typeProduitSubmitStatus"
                input-label="Type produit"
                input-description="Veuillez encoder le type produit !"
                input-placeholder="ex: Robes"
                :validate-state="validateState($v.typeProduit, 'nom')"
            >
              <template #invalid-feedback-validations>
                <l-invalid-feedback
                    :condition="!$v.typeProduit.nom.required"
                    :error-message="required()"
                />
                <l-invalid-feedback
                    :condition="!$v.typeProduit.nom.minLength"
                    :error-message="minLength($v.typeProduit.nom.$params.minLength.min)"
                />
                <l-invalid-feedback
                    :condition="!$v.typeProduit.nom.maxLength"
                    :error-message="maxLength($v.typeProduit.nom.$params.maxLength.max)"
                />
                <l-invalid-feedback
                    :condition="!$v.typeProduit.nom.alpha"
                    :error-message="alpha()"
                />
              </template>
            </add-update-delete-modal-component>

            <b-form-select
                v-model="catalogue.type_produit"
                :select-size="4"
            >
              <b-form-select-option v-for="type_produit in typeProduits" :key="type_produit.id" :value="type_produit">
                {{ type_produit.nom }}
              </b-form-select-option>
            </b-form-select>
          </b-col>
          <!-- endregion -->
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

    <l-jumbotron :data="catalogue" header="Catalogue" class="mt-5"/>
    <l-jumbotron :data="catalogueExist" header="Message" class="mt-5"/>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {commonMixin} from "@/mixins/common.mixin";
import {htmlTitle} from "@/utils/tools";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import LButtonGroup from "@/components/LButtonGroup";
import AddUpdateDeleteModalComponent from "@/views/administrateur/parametres/catalogue/AddUpdateDeleteModalComponent";
import CatalogueModel from "@/models/catalogue/catalogue.model";
import RayonModel from "@/models/catalogue/rayon.model";
import SectionModel from "@/models/catalogue/section.model";
import TypeProduitModel from "@/models/catalogue/type_produit.model";

export default {
  name: "VACatalogueAddOrUpdate",
  components: {AddUpdateDeleteModalComponent, LButtonGroup},
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  title() {
    return htmlTitle('Catalogue');
  },
  validations: {
    rayon: RayonModel.validations,
    section: SectionModel.validations,
    typeProduit: TypeProduitModel.validations
  },
  data() {
    return {
      catalogue: new CatalogueModel(),
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes,
      typeCatalogue: {
        RAYON: 'Rayon',
        SECTION: 'Section',
        TYPE_PRODUIT: 'Type produit'
      },

      rayon: new RayonModel(),
      rayonSubmitStatus: null,
      modalAddRayon: 'modal-create-rayon',
      modalUpdateRayon: 'modal-update-rayon',
      modalDeleteRayon: 'modal-delete-rayon',

      section: new SectionModel(),
      sectionSubmitStatus: null,
      modalAddSection: 'modal-create-section',
      modalUpdateSection: 'modal-update-section',
      modalDeleteSection: 'modal-delete-section',

      typeProduit: new TypeProduitModel(),
      typeProduitSubmitStatus: null,
      modalAddTypeProduit: 'modal-create-type-produit',
      modalUpdateTypeProduit: 'modal-update-type-produit',
      modalDeleteTypeProduit: 'modal-delete-type-produit',
    }
  },
  computed: {
    ...mapGetters({
      catalogues: "Catalogues/catalogues",
      rayons: "Rayons/rayons",
      sections: "Sections/sections",
      typeProduits: "TypeProduits/typeProduits"
    }),
    catalogueExist() {
      if (this.catalogue.rayon.id !== null && this.catalogue.section.id !== null && this.catalogue.type_produit.id !== null) {
        let catalogue = this.catalogues.find(item =>
            item.rayon.id === this.catalogue.rayon.id &&
            item.section.id === this.catalogue.section.id &&
            item.type_produit.id === this.catalogue.type_produit.id
        )
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
      updateCatalogue: "Catalogues/updateCatalogue",
      createRayon: "Rayons/createRayon",
      updateRayon: "Rayons/updateRayon",
      deleteRayon: "Rayons/deleteRayon",
      createSection: "Sections/createSection",
      updateSection: "Sections/updateSection",
      deleteSection: "Sections/deleteSection",
      createTypeProduit: "TypeProduits/createTypeProduit",
      updateTypeProduit: "TypeProduits/updateTypeProduit",
      deleteTypeProduit: "TypeProduits/deleteTypeProduit",
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
      if (this.typeProduits.length === 0) {
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
    },

    newObject: function (test) {
      if (test === this.typeCatalogue.RAYON) {
        this.rayon = new RayonModel()
      }
      if (test === this.typeCatalogue.SECTION) {
        this.section = new SectionModel()
      }
      if (test === this.typeCatalogue.TYPE_PRODUIT) {
        this.typeProduit = new TypeProduitModel()
      }
    },
    assingObject: function (test) {
      if (test === this.typeCatalogue.RAYON) {
        Object.assign(this.rayon, this.catalogue.rayon)
      }
      if (test === this.typeCatalogue.SECTION) {
        Object.assign(this.section, this.catalogue.section)
      }
      if (test === this.typeCatalogue.TYPE_PRODUIT) {
        Object.assign(this.typeProduit, this.catalogue.type_produit)
      }
    },
    showuUpdateDeleteModal: function (modal_id, test) {
      this.showModal(modal_id)
      this.assingObject(test)
    },
    toggleModal: function (modal_id, test, show) {
      show === true ? this.showModal(modal_id) : this.hideModal(modal_id)
      this.newObject(test)
    },

    // region Rayon
    creerRayon: async function (modal_id, title, test) {
      this.$v.rayon.$touch()
      if (this.$v.rayon.$invalid) {
        this.rayonSubmitStatus = 'ERROR'
      } else {
        this.rayonSubmitStatus = 'PENDING'

        this.createRayon(this.rayon.toCreatePayload()).then(() => {
          this.makeToast('success', 'Rayon ajouté avec succès', title)
        }, error => {
          this.makeToast('danger', error.response.data.nom[0], title)
        })
        this.toggleModal(modal_id, test)
        setTimeout(() => {
          this.rayonSubmitStatus = 'OK'
        }, 1000)
      }
    },
    modifierRayon: function (modal_id, title, test) {
      this.$v.rayon.$touch()
      if (this.$v.rayon.$invalid) {
        this.rayonSubmitStatus = 'ERROR'
      } else {
        this.rayonSubmitStatus = 'PENDING'

        this.updateRayon(this.rayon.toUpdatePayload()).then(() => {
          this.makeToast('success', 'Rayon modifié avec succès', title)
        }, error => {
          this.makeToast('danger', error.response.data.nom[0], title)
        })
        this.toggleModal(modal_id, test)
        setTimeout(() => {
          this.rayonSubmitStatus = 'OK'
        }, 1000)
      }
    },
    supprimerRayon: function (modal_id, title) {
      this.deleteRayon(this.rayon).then(() => {
        this.makeToast('success', 'Rayon supprimé avec succès', title)
      }, error => {
        this.makeToast('danger', error, title)
      })
      this.hideModal(modal_id)
    },
    // endregion

    // region Section
    creerSection: async function (modal_id, title, test) {
      this.$v.section.$touch()
      if (this.$v.section.$invalid) {
        this.sectionSubmitStatus = 'ERROR'
      } else {
        this.sectionSubmitStatus = 'PENDING'

        this.createSection(this.section.toCreatePayload()).then(() => {
          this.makeToast('success', 'Section ajoutée avec succès', title)
        }, error => {
          this.makeToast('danger', error.response.data.nom[0], title)
        })
        this.toggleModal(modal_id, test, false)
        setTimeout(() => {
          this.sectionSubmitStatus = 'OK'
        }, 1000)
      }
    },
    modifierSection: function (modal_id, title, test) {
      this.$v.section.$touch()
      if (this.$v.section.$invalid) {
        this.sectionSubmitStatus = 'ERROR'
      } else {
        this.sectionSubmitStatus = 'PENDING'

        this.updateSection(this.section.toUpdatePayload()).then(() => {
          this.makeToast('success', 'Section modifiée avec succès', title)
        }, error => {
          this.makeToast('danger', error.response.data.nom[0], title)
        })
        this.toggleModal(modal_id, test)
        setTimeout(() => {
          this.sectionSubmitStatus = 'OK'
        }, 1000)
      }
    },
    supprimerSection: function (modal_id, title) {
      this.deleteSection(this.section).then(() => {
        this.makeToast('success', 'Section supprimée avec succès', title)
      }, error => {
        this.makeToast('danger', error.response.data.nom[0], title)
      })
      this.hideModal(modal_id)
    },
    // endregion

    // region TypeProduit
    creerTypeProduit: async function (modal_id, title, test) {
      this.$v.typeProduit.$touch()
      if (this.$v.typeProduit.$invalid) {
        this.typeProduitSubmitStatus = 'ERROR'
      } else {
        this.typeProduitSubmitStatus = 'PENDING'

        this.createTypeProduit(this.typeProduit.toCreatePayload()).then(() => {
          this.makeToast('success', 'Type produit ajouté avec succès', title)
        }, error => {
          this.makeToast('danger', error.response.data.nom[0], title)
        })
        this.toggleModal(modal_id, test, false)
        setTimeout(() => {
          this.typeProduitSubmitStatus = 'OK'
        }, 1000)
      }
    },
    modifierTypeProduit: function (modal_id, title, test) {
      this.$v.typeProduit.$touch()
      if (this.$v.typeProduit.$invalid) {
        this.typeProduitSubmitStatus = 'ERROR'
      } else {
        this.typeProduitSubmitStatus = 'PENDING'

        this.updateTypeProduit(this.typeProduit.toUpdatePayload()).then(() => {
          this.makeToast('success', 'Type produit modifié avec succès', title)
        }, error => {
          this.makeToast('danger', error.response.data.nom[0], title)
        })
        this.toggleModal(modal_id, test)
        setTimeout(() => {
          this.typeProduitSubmitStatus = 'OK'
        }, 1000)
      }
    },
    supprimerTypeProduit: function (modal_id, title) {
      this.deleteTypeProduit(this.typeProduit).then(() => {
        this.makeToast('success', 'Type produit supprimé avec succès', title)
      }, error => {
        this.makeToast('danger', error.response.data.nom[0], title)
      })
      this.hideModal(modal_id)
    },
    // endregion
  },
  created() {
    this.chargerCatalogue()
  }
}
</script>

<style scoped>

</style>