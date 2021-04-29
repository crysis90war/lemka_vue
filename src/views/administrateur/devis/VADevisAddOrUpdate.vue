<template>
  <l-spinner v-if="isLoading === true"></l-spinner>
  <div v-else>
    <section class="boutons mt-4">
      <b-container fluid="">
        <b-button-group>
          <b-button
              v-b-tooltip
              title="Retourner vers les devis"
              variant="outline-dark"
              :to="{name: routes.DEVIS.name}"
          >
            <i class="fas fa-arrow-left"></i>
          </b-button>
          <b-button
              v-if="devis.est_soumis === false"
              v-b-tooltip.top
              :title="`Envoyer le devis : ${devis.numero_devis}`"
              variant="outline-success"
              @click="envoyerLeDevis"
          >
            <i class="fas fa-paper-plane"></i>
          </b-button>
        </b-button-group>
      </b-container>
    </section>

    <!-- region Demande de devis -->
    <section class="demande_devis mt-4">
      <b-container fluid="">
        <b-button
            v-b-toggle.demande_devis
            variant="secondary"
        >
          Demande de devis numéro : {{ devis.demande_devis.numero_demande_devis }}
        </b-button>
        <hr>
        <b-collapse
            id="demande_devis"
            class="mt-2"
            visible
        >
          <b-card>
            <b-card-body>
              <div>
                <b-tabs
                    content-class="mt-3"
                    align="center"
                >
                  <!-- region Informations -->
                  <b-tab
                      title="Informations"
                      active
                  >
                    <b-row>
                      <b-col lg="4">
                        <b-card-text><strong>N°: </strong> {{ devis.demande_devis.numero_demande_devis }}</b-card-text>
                      </b-col>

                      <b-col lg="4">
                        <b-card-text><strong>Nom: </strong> {{ devis.demande_devis.utilisateur }}</b-card-text>
                      </b-col>

                      <b-col lg="4">
                        <b-card-text><strong>Date: </strong> {{ devis.demande_devis.created_at | localTimeStr }}</b-card-text>
                      </b-col>
                    </b-row>

                    <hr>

                    <b-row>
                      <b-col lg="4">
                        <b-card-text><strong>Titre: </strong> {{ devis.demande_devis.titre }}</b-card-text>
                      </b-col>

                      <b-col lg="4">
                        <b-card-text>
                          <strong>Urgent: </strong>
                          <b-badge
                              pill
                              :variant="devis.demande_devis.est_urgent === true ? 'success' : 'danger'"
                          >
                            <i :class="`fas fa-${devis.demande_devis.est_urgent  === true ? 'check' : 'times'}-circle`"></i>
                          </b-badge>
                        </b-card-text>
                      </b-col>

                      <b-col lg="4">
                        <b-card-text>
                          <strong>Statut: </strong>
                          <b-badge
                              pill
                              :variant="variante(devis.demande_devis).variant"
                          >
                            {{ variante(devis.demande_devis).text }}
                          </b-badge>
                        </b-card-text>
                      </b-col>
                    </b-row>

                    <hr>

                    <b-row>
                      <b-col>
                        <strong>Service :</strong>
                        <p>{{ devis.demande_devis.type_service.type_service }}</p>
                      </b-col>
                    </b-row>

                    <hr>

                    <b-row>
                      <b-col>
                        <strong>Remarque: </strong>
                        <b-card-text style="white-space: pre-wrap">{{ devis.demande_devis.remarque }}</b-card-text>
                      </b-col>
                    </b-row>
                  </b-tab>
                  <!-- endregion -->

                  <!-- region Mensurations -->
                  <b-tab
                      title="Mensurations"
                      :disabled="devis.demande_devis.mensuration === null"
                  >
                    <div v-if="devis.demande_devis.mensuration !== null">
                      <b-row>
                        <b-col v-for="mesure in devis.demande_devis.mensuration.mesures" :key="mesure.id" lg="4">
                          <p><strong>{{ mesure.mensuration }} : </strong> {{ mesure.mesure }} cm</p>
                        </b-col>
                      </b-row>
                    </div>
                  </b-tab>
                  <!-- endregion -->

                  <!-- region Article -->
                  <b-tab
                      title="Article"
                      :disabled="devis.demande_devis.article === null"
                  >
                    <b-row v-if="devis.demande_devis.article !== null">
                      <b-col cols="3">
                        <b-img
                            width="128"
                            height="128"
                            :src="getMainImage(devis.demande_devis.article.images)"
                        />
                      </b-col>
                      <b-col>
                        <h4><strong>{{ devis.demande_devis.article.titre }}</strong></h4>
                        <div style="white-space: pre-wrap">
                          <p>{{ devis.demande_devis.article.description }}</p>
                        </div>
                      </b-col>
                    </b-row>
                  </b-tab>
                  <!-- endregion -->

                  <!-- region Merceries -->
                  <b-tab
                      title="Merceries"
                      :disabled="devis.demande_devis.merceries.length === 0"
                  >
                    <div v-if="devis.demande_devis.merceries.length !== 0">
                      <b-list-group>
                        <b-list-group-item
                            v-for="mercerieOption in devis.demande_devis.merceries"
                            :key="mercerieOption.id"
                        >
                          <b-img
                              :src="getMainImage(mercerieOption.images)"
                              height="72"
                              width="72"
                          />
                          <span class="ml-3"><strong>{{ mercerieOption.reference }}</strong> | {{ mercerieOption.nom }}</span>
                          <b-button
                              variant="outline-success"
                              size="sm"
                              class="mx-4"
                              @click="ajouterMercerieAuDetail(mercerieOption)"
                          >
                            <i class="fas fa-plus"></i>
                          </b-button>
                        </b-list-group-item>
                      </b-list-group>
                    </div>
                  </b-tab>
                  <!-- endregion -->
                </b-tabs>
              </div>
            </b-card-body>
          </b-card>
        </b-collapse>
      </b-container>
    </section>
    <!-- endregion -->

    <!-- region Details -->
    <section class="details mt-4">
      <b-container fluid="">
        <b-button
            v-b-toggle.details
            variant="secondary"
        >
          Devis : {{ devis.numero_devis }}
        </b-button>
        <hr>
        <b-collapse
            id="details"
            class="mt-2"
            visible
        >
          <b-card>
            <b-card-body>
              <b-button
                  variant="outline-success"
                  @click="ouvrirModalAjouter"
                  size="sm"
              >
                <i class="fas fa-plus"></i>
              </b-button>

              <!-- region Modal -->
              <b-modal
                  id="ajout-detail"
                  title="Ajout nouveau détail"
              >
                <div>
                  <b-form-group
                      label="Designation"
                      description="Veuillez encoder la designation"
                  >
                    <b-form-input
                        v-model="$v.detail.designation.$model"
                        :state="validateDetailState('designation')"
                    />
                    <b-form-invalid-feedback>
                      <l-invalid-feedback
                          :condition="!$v.detail.designation.required"
                          :error-message="required()"
                      />
                      <l-invalid-feedback
                          :condition="!$v.detail.designation.minLength"
                          :error-message="minLength($v.detail.designation.$params.minLength.min)"
                      />
                      <l-invalid-feedback
                          :condition="!$v.detail.designation.maxLength"
                          :error-message="maxLength($v.detail.designation.$params.maxLength.max)"
                      />
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group
                      label="Prix HT"
                      description="Veuillez encoder le prix"
                  >
                    <b-form-input
                        v-model="$v.detail.prix_u_ht.$model"
                        type="number"
                        step="0.01"
                        :state="validateDetailState('prix_u_ht')"
                    />
                    <b-form-invalid-feedback>
                      <l-invalid-feedback
                          :condition="!$v.detail.prix_u_ht.required"
                          :error-message="required()"
                      />
                      <l-invalid-feedback
                          :condition="!$v.detail.designation.minValue"
                          :error-message="minValue($v.detail.prix_u_ht.$params.minValue.min)"
                      />
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group
                      label="Quantité"
                      description="Veuillez encoder la quantitée"
                  >
                    <b-form-input
                        v-model="$v.detail.quantite.$model"
                        type="number"
                        :state="validateDetailState('quantite')"
                    />
                    <b-form-invalid-feedback>
                      <l-invalid-feedback
                          :condition="!$v.detail.quantite.required"
                          :error-message="required()"
                      />
                      <l-invalid-feedback
                          :condition="!$v.detail.quantite.minValue"
                          :error-message="minValue($v.detail.quantite.$params.minValue.min)"
                      />
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group
                      label="TVA"
                      description="Veuillez selectionner la TVA"
                  >
                    <multiselect
                        v-model="detail.tva"
                        :options="tvas"
                        :show-labels="false"
                        placeholder="Veuillez selectionner la TVA"
                        :class="{ 'invalid': invalidTVA }"
                        @close="toucheTVA"
                    >
                      <template slot="singleLabel" slot-scope="{ option }">
                        <strong>{{ option.id !== null ? `${option.taux * 100} %` : null }}</strong>
                      </template>
                      <template slot="option" slot-scope="{ option }">
                        <span>{{ option.taux * 100 }} %</span>
                      </template>
                    </multiselect>
                    <span class="text-danger" v-show="invalidTVA"><small>Ce champ est requis</small></span>
                  </b-form-group>
                </div>
                <template #modal-footer>
                  <div class="text-right">
                    <b-button-group>
                      <b-button
                          variant="outline-danger"
                          @click="hideModal('ajout-detail')"
                      >
                        Annuler
                      </b-button>
                      <b-button
                          variant="outline-success"
                          @click="ajouterDetail()"
                          :disabled="submitStatus === 'PENDING'"
                      >
                        Ajouter
                      </b-button>
                    </b-button-group>
                  </div>
                </template>
              </b-modal>
              <!-- endregion -->

              <b-table
                  :items="devis.details"
                  :fields="fields"
                  class="text-center my-2"
                  small
                  stacked="md"
                  :show-empty="true"
              >
                <template #empty>
                  <l-table-empty></l-table-empty>
                </template>
                <template #cell(prix_u_ht)="data">
                  <p>{{ data.item.prix_u_ht }} €</p>
                </template>
                <template #cell(tva)="data">
                  <p>{{ data.item.tva.taux * 100 }} %</p>
                </template>
                <template #cell(total_ht)="data">
                  <p>{{ detail.calculeTotalHT(data.item) }} €</p>
                </template>
                <template #cell(total_tva)="data">
                  <p>{{ detail.calculerTVA(data.item) }} €</p>
                </template>
                <template #cell(total_ttc)="data">
                  <p>{{ detail.calculerTotalTTC(data.item) }} €</p>
                </template>
                <template #cell(actions)="data">
                  <b-button-group size="sm">
                    <b-button
                        v-b-tooltip.top
                        :title="`Modifier ${data.item.designation}`"
                        variant="outline-primary"
                        @click="ouvrirModalModifier(data.item.id, data.item)"
                    >
                      <i :class="icons.MODIFIER"></i>
                    </b-button>
                    <b-button
                        v-b-tooltip.top
                        :title="`Supprimer ${data.item.designation}`"
                        variant="outline-danger"
                        @click="showModal(`supprimer-detail-modal-${data.item.id}`)"
                    >
                      <i :class="icons.SUPPRIMER"></i>
                    </b-button>
                  </b-button-group>
                  <b-modal
                      :id="`modifier-detail-modal-${data.item.id}`"
                      :title="detail.designation"
                  >
                    <div>
                      <b-form-group
                          label="Designation"
                          description="Veuillez encoder la designation"
                      >
                        <b-form-input
                            v-model="$v.detail.designation.$model"
                            :state="validateDetailState('designation')"
                        />
                        <b-form-invalid-feedback>
                          <l-invalid-feedback
                              :condition="!$v.detail.designation.required"
                              :error-message="required()"
                          />
                          <l-invalid-feedback
                              :condition="!$v.detail.designation.minLength"
                              :error-message="minLength($v.detail.designation.$params.minLength.min)"
                          />
                          <l-invalid-feedback
                              :condition="!$v.detail.designation.maxLength"
                              :error-message="maxLength($v.detail.designation.$params.maxLength.max)"
                          />
                        </b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group
                          label="Prix HT"
                          description="Veuillez encoder le prix"
                      >
                        <b-form-input
                            v-model="$v.detail.prix_u_ht.$model"
                            type="number"
                            step="0.01"
                            :state="validateDetailState('prix_u_ht')"
                        />
                        <b-form-invalid-feedback>
                          <l-invalid-feedback
                              :condition="!$v.detail.prix_u_ht.required"
                              :error-message="required()"
                          />
                          <l-invalid-feedback
                              :condition="!$v.detail.designation.minValue"
                              :error-message="minValue($v.detail.prix_u_ht.$params.minValue.min)"
                          />
                        </b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group
                          label="Quantité"
                          description="Veuillez encoder la quantitée"
                      >
                        <b-form-input
                            v-model="$v.detail.quantite.$model"
                            type="number"
                            :state="validateDetailState('quantite')"
                        />
                        <b-form-invalid-feedback>
                          <l-invalid-feedback
                              :condition="!$v.detail.quantite.required"
                              :error-message="required()"
                          />
                          <l-invalid-feedback
                              :condition="!$v.detail.quantite.minValue"
                              :error-message="minValue($v.detail.quantite.$params.minValue.min)"
                          />
                        </b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group
                          label="TVA"
                          description="Veuillez selectionner la TVA"
                      >
                        <multiselect
                            v-model="detail.tva"
                            :options="tvas"
                            :show-labels="false"
                            placeholder="Veuillez selectionner la TVA"
                            :class="{ 'invalid': invalidTVA }"
                            @close="toucheTVA"
                        >
                          <template slot="singleLabel" slot-scope="{ option }">
                            <strong>{{ option.id !== null ? `${option.taux * 100} %` : null }}</strong>
                          </template>
                          <template slot="option" slot-scope="{ option }">
                            <span>{{ option.taux * 100 }} %</span>
                          </template>
                        </multiselect>
                        <span class="text-danger" v-show="invalidTVA"><small>Ce champ est requis</small></span>
                      </b-form-group>
                    </div>
                    <template #modal-footer>
                      <div class="text-right">
                        <b-button-group>
                          <b-button
                              variant="outline-danger"
                              @click="fermerModalModifier(data.item.id)"
                          >
                            Annuler
                          </b-button>
                          <b-button
                              variant="outline-primary"
                              @click="modifierDetail(data.item)"
                          >
                            Modifier
                          </b-button>
                        </b-button-group>
                      </div>
                    </template>
                  </b-modal>
                  <b-modal
                      :id="`supprimer-detail-modal-${data.item.id}`"
                      :title="`${data.item.designation}`"
                  >
                    <div class="text-center">
                      <p>Êtes-vous sur de vouloir supprimer</p>
                      <h3><strong>{{ data.item.designation }}</strong></h3>
                    </div>
                    <template #modal-footer>
                      <div class="text-right">
                        <b-button-group>
                          <b-button
                              variant="outline-primary"
                              @click="hideModal(`supprimer-detail-modal-${data.item.id}`)"
                          >
                            Annuler
                          </b-button>
                          <b-button
                              variant="outline-danger"
                              @click="supprimerDetail(data.item)"
                          >
                            Supprimer
                          </b-button>
                        </b-button-group>
                      </div>
                    </template>
                  </b-modal>
                </template>
              </b-table>
              <hr>
              <b-row>
                <b-col cols="8"></b-col>
                <b-col cols="4">
                  <p><strong>Total HT : </strong>{{ detail.totalHT(details) }} €</p>
                  <p><strong>Total TVA : </strong>{{ detail.totalTVA(details) }} €</p>
                  <p><strong>Total TTC : </strong>{{ detail.totalTTC(details) }} €</p>
                </b-col>
              </b-row>
              <b-form-group
                  label="Remarque"
                  description="Veuillez encoder une remarque si nécessaire"
              >
                <b-textarea
                    v-model="devis.remarque"
                    @keyup="updateRemarque"
                />
              </b-form-group>
            </b-card-body>
          </b-card>
        </b-collapse>
      </b-container>
    </section>
    <!-- endregion -->
  </div>
</template>

<script>
import {localTimeStr} from "@/utils/filters";
import DevisModel from "@/models/devis/devis.model";
import {mapActions, mapGetters} from "vuex";
import DetailModel from "@/models/devis/detail.model";
import {fonctions} from "@/mixins/functions.mixin";
import LemkaHelpers from "@/helpers";
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";

export default {
  name: "VADevisAddOrUpdate",
  mixins: [fonctions, validationMixin, validationMessageMixin],
  props: {
    id: {}
  },
  validations: {
    detail: DetailModel.validations
  },
  data() {
    return {
      devis: new DevisModel(),
      detail: new DetailModel(),
      details: [],
      fields: DetailModel.tableFields,
      routes: LemkaHelpers.Routes,
      icons: LemkaHelpers.FontAwesomeIcons,

      submitStatus: null,
      tvaTouched: false
    }
  },
  computed: {
    ...mapGetters({tvas: "TVA/tvas", busy: "TVA/loadingStatus", deviss: "Devis/deviss"}),
    invalidTVA() {
      return this.tvaTouched && this.detail.tva.id === null
    }
  },
  methods: {
    ...mapActions({
      loadDevis: "Devis/loadDevis",
      createDetail: "Devis/createDetail",
      deleteDetail: "Devis/deleteDetail",
      updateDetail: "Devis/updateDetail",
      updateDevis: "Devis/updateDevis"
    }),
    initialisation: async function () {
      if (this.deviss.length === 0) {
        await this.loadDevis()
      }
    },
    chargerDevis: async function () {
      this.toggleLoading()
      await this.initialisation()
      let devis = await this.$store.getters["Devis/devis"](parseInt(this.$route.params.id))
      if (devis !== undefined) {
        Object.assign(this.devis, await this.$store.getters["Devis/devis"](parseInt(this.$route.params.id)))
        this.$route.meta.value = this.devis.numero_devis
      }

      this.details = this.devis.details
      this.toggleLoading()
    },
    envoyerLeDevis: function () {
      let payload = this.devis.toUpdatePayload()
      payload.est_soumis = true
      this.updateDevis(payload).then(() => {
        this.makeToast('succes', 'Devis envoyé avec succès', 'Devis')
        setTimeout(() => {
          this.$router.push({name: this.routes.DEVIS.name})
        }, 500)
      }, () => {
        this.makeToast('danger', 'Une erreure s\'est produit lors de la requete.', 'Envoi du devis')
      })
    },
    variante: function (demande_devis) {
      if (demande_devis.en_cours === true && demande_devis.est_traite === false) {
        return {variant: "warning", text: "En cours de traitement"}
      } else if (demande_devis.en_cours === true && demande_devis.est_traite === true) {
        return {variant: "success", text: "Traité"}
      } else {
        return {variant: "danger", text: "Une erreur s'est produite"}
      }
    },
    ajouterMercerieAuDetail(mercerie) {
      // TODO - compléter l'ajout depuis bouton "+" mercerie
      let index = this.devis.details.findIndex(item => item.designation === `${mercerie.reference} | ${mercerie.nom}` && item.prix_u_ht === mercerie.prix_u_ht)
      if (index === -1) {
        this.detail.designation = `${mercerie.reference} | ${mercerie.nom}`
        this.detail.quantite = 1
        this.detail.prix_u_ht = mercerie.prix_u_ht
        this.detail.tva = mercerie.tva
        this.ajouterDetail()
      } else {
        Object.assign(this.detail, this.details[index])
        this.detail.quantite++
        this.updateDetail([this.devis.id, this.detail.toUpdatePayload()])
        this.detail = new DetailModel()
      }
    },
    updateRemarque: function () {
      let payload = this.devis.toUpdatePayload()
      this.updateDevis(payload)
    },
    ouvrirModalAjouter: function () {
      this.detail = new DetailModel()
      this.showModal('ajout-detail')
    },
    ouvrirModalModifier: function (modal_id, item) {
      Object.assign(this.detail, item)
      this.showModal(`modifier-detail-modal-${modal_id}`)
    },
    fermerModalModifier: function (modal_id) {
      this.hideModal(`modifier-detail-modal-${modal_id}`)
      this.detail = new DetailModel()
    },
    ajouterDetail() {
      this.$v.$touch()
      if (this.$v.$invalid ||
          (this.tvaTouched === false && this.invalidTVA === false) ||
          (this.tvaTouched === true && this.invalidTVA === true)) {
        this.tvaTouched = true
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        this.createDetail([this.devis.id, this.detail.toCreatePayload()])
            .then(() => {
              this.makeToast('success', `${this.detail.designation} ajouté avec succès.`, this.detail.designation)
              this.detail = new DetailModel()
              this.hideModal('ajout-detail')
            }, () => {
              this.makeToast('danger', "Une erreure s'est produit lors de la requete.", "Erreur")
              this.detail = new DetailModel()
              this.hideModal('ajout-detail')
            })

        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    },
    modifierDetail(item) {
      this.$v.$touch()
      if (this.$v.$invalid ||
          (this.tvaTouched === false && this.invalidTVA === false) ||
          (this.tvaTouched === true && this.invalidTVA === true)) {
        this.tvaTouched = true
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        this.updateDetail([this.devis.id, this.detail.toUpdatePayload()]).then(() => {
          this.makeToast('success', 'mis a jour effectué avec succes', this.detail.designation)
          this.detail = new DetailModel()
          this.hideModal(`modifier-detail-modal-${item.id}`)
        }, () => {
          this.makeToast('danger', "Une erreure s'est produit lors de la requete.")
          this.detail = new DetailModel()
          this.hideModal(`modifier-detail-modal-${item.id}`)
        })
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    },
    supprimerDetail: function (item) {
      this.deleteDetail([this.devis.id, item]).then(() => {
        this.makeToast('success', `${item.designation} supprimé avec succès`, item.designation)
        this.hideModal(`supprimer-detail-modal-${item.id}`)
      }, () => {
        this.makeToast('danger', "Une erreure s'est produit lors de la requete.")
        this.hideModal(`supprimer-detail-modal-${item.id}`)
      })
    },
    toucheTVA: function () {
      this.tvaTouched = true
    },
    getMainImage: function (images) {
      if (images.length > 0) {
        let image = images.find(img => img.is_main === true)
        return image.image
      } else {
        return require('@/assets/noimage.png')
      }
    },
    validateDetailState: function (name) {
      const {$dirty, $error} = this.$v.detail[name];
      return $dirty ? !$error : null;
    }
  },
  created() {
    if (this.id !== undefined) {
      this.chargerDevis()
    } else {
      this.$router.push({name: this.routes.DEMANDE_DEVIS_ADMIN.name})
    }
  },
  filters: {
    localTimeStr: function (value) {
      value = localTimeStr(value)
      return value
    }
  }
}
</script>

<style scoped>

</style>