<template>
  <l-spinner v-if="isLoading === true"></l-spinner>
  <div v-else>
    <section class="boutons mt-4">
      <b-container fluid="">
        <b-button-group>
          <b-button variant="outline-dark" :to="{name: routes.DEVIS.name}"><i class="fas fa-arrow-left"></i></b-button>
          <b-button variant="outline-success">Envoyer <i class="fas fa-paper-plane"></i></b-button>
        </b-button-group>
      </b-container>
    </section>

    <section class="demande_devis mt-4">
      <b-container fluid="">
        <b-button v-b-toggle.demande_devis variant="secondary">
          Demande de devis numéro : {{ devis.demande_devis.numero_demande_devis }}
        </b-button>
        <hr>
        <b-collapse id="demande_devis" class="mt-2" visible>
          <b-card>
            <b-card-body>
              <div>
                <b-tabs content-class="mt-3" align="center">
                  <b-tab title="Informations" active>
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
                          <b-badge pill :variant="devis.demande_devis.est_urgent === true ? 'success' : 'danger'">
                            <i :class="`fas fa-${devis.demande_devis.est_urgent  === true ? 'check' : 'times'}-circle`"></i>
                          </b-badge>
                        </b-card-text>
                      </b-col>

                      <b-col lg="4">
                        <b-card-text>
                          <strong>Statut: </strong>
                          <b-badge pill :variant="variante(devis.demande_devis).variant">{{ variante(devis.demande_devis).text }}</b-badge>
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
                        <b-card-text>{{ devis.demande_devis.remarque }}</b-card-text>
                      </b-col>
                    </b-row>
                  </b-tab>

                  <b-tab title="Mensurations" :disabled="devis.demande_devis.mensuration === null">
                    <div v-if="devis.demande_devis.mensuration !== null">
                      <b-row>
                        <b-col v-for="mesure in devis.demande_devis.mensuration.mesures" :key="mesure.id" lg="4">
                          <p><strong>{{ mesure.mensuration }} : </strong> {{ mesure.mesure }} cm</p>
                        </b-col>
                      </b-row>
                    </div>
                  </b-tab>

                  <b-tab title="Article" :disabled="devis.demande_devis.article === null">
                    <b-row v-if="devis.demande_devis.article !== null">
                      <b-col cols="3">
                        <b-img width="128" height="128"
                               :src="getImage(devis.demande_devis.article.images)"/>
                      </b-col>
                      <b-col>
                        <p>{{ devis.demande_devis.article.titre }}</p>
                        <p>{{ devis.demande_devis.article.description }}</p>
                      </b-col>
                    </b-row>
                  </b-tab>

                  <b-tab title="Merceries" :disabled="devis.demande_devis.mercerie_options.length === 0">
                    <div v-if="devis.demande_devis.mercerie_options.length !== 0">
                      <b-list-group>
                        <b-list-group-item v-for="mercerieOption in devis.demande_devis.mercerie_options" :key="mercerieOption.id">
                          <b-img :src="require('@/assets/noimage.png')" height="72" width="72"/>
                          <span class="ml-3"><strong>{{ mercerieOption.reference }}</strong> | {{ mercerieOption.name }}</span>
                          <b-button variant="outline-success" size="sm" class="mx-4" :disabled="mercerieOption.stock === 0"
                                    @click="ajouterMercerieAuDetail(mercerieOption)">
                            <i class="fas fa-plus"></i>
                          </b-button>
                        </b-list-group-item>
                      </b-list-group>
                    </div>
                  </b-tab>

                  <b-tab title="Image" disabled><p>I'm a disabled tab!</p></b-tab>
                </b-tabs>
              </div>
            </b-card-body>
          </b-card>
        </b-collapse>
      </b-container>
    </section>

    <section class="details mt-4">
      <b-container fluid="">
        <b-button v-b-toggle.details variant="secondary">Devis : {{ devis.numero_devis }}</b-button>
        <hr>
        <b-collapse id="details" class="mt-2" visible>
          <b-card>
            <b-card-body>
              <b-button variant="outline-success" @click="showModal('ajout-detail')" size="sm"><i class="fas fa-plus"></i></b-button>

              <!-- region Modal -->
              <b-modal id="ajout-detail" hide-footer>
                <template #modal-header>Ajout nouveau détail</template>
                <b-form-group label="Designation">
                  <b-form-input v-model="detail.designation"></b-form-input>
                </b-form-group>

                <b-form-group label="Prix HT">
                  <b-form-input v-model="detail.prix_u_ht" type="number" step="0.01"></b-form-input>
                </b-form-group>
                <b-form-group label="Quantité">
                  <b-form-input v-model="detail.quantite" type="number"></b-form-input>
                </b-form-group>

                <b-form-group label="TVA">
                  <multiselect v-model="detail.tva" :options="tvas">
                    <template slot="singleLabel" slot-scope="{ option }">
                      <strong>{{ option.taux }}</strong>
                    </template>
                    <template slot="option" slot-scope="{ option }">
                      <span>{{ option.taux * 100 }} %</span>
                    </template>
                  </multiselect>
                </b-form-group>
                <b-button variant="success" @click="ajouterDetail()">Ajouter</b-button>
              </b-modal>
              <!-- endregion -->

              <b-table :items="devis.details" :fields="fields" class="text-center my-2" small stacked="md" :show-empty="true">
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
                    <b-button variant="outline-primary"><i :class="icons.MODIFIER"></i></b-button>
                    <b-button variant="outline-danger" @click="supprimerDetail(data.item)">
                      <i :class="icons.SUPPRIMER"></i>
                    </b-button>
                  </b-button-group>
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
              <b-form-group label="Remarque">
                <b-textarea v-model="devis.remarque" @keyup="updateRemarque"></b-textarea>
              </b-form-group>
            </b-card-body>
          </b-card>
        </b-collapse>
      </b-container>
    </section>
  </div>
</template>

<script>
import {localTimeStr} from "@/utils/filters";
import DevisModel from "@/models/devis.model";
import {mapActions, mapGetters} from "vuex";
import DetailModel from "@/models/detail.model";
import {fonctions} from "@/mixins/functions.mixin";
import LemkaHelpers from "@/helpers";

export default {
  name: "VADevisAddOrUpdate",
  mixins: [fonctions],
  props: {
    id: {}
  },
  data() {
    return {
      devis: new DevisModel(),
      detail: new DetailModel(),
      details: [],
      fields: DetailModel.tableFields,
      routes: LemkaHelpers.Routes,
      icons: LemkaHelpers.FontAwesomeIcons
    }
  },
  computed: {
    ...mapGetters({tvas: "TVA/tvas", busy: "TVA/loadingStatus"})
  },
  methods: {
    ...mapActions({
      createDetail: "Devis/createDetail",
      deleteDetail: "Devis/deleteDetail",
      updateDetail: "Devis/updateDetail",
      updateDevis: "Devis/updateDevis"
    }),

    chargerDevis: async function () {
      Object.assign(this.devis, await this.$store.getters["Devis/devis"](this.id))
      this.details = this.devis.details
    },

    initialisation: async function () {
      this.toggleLoading()
      await this.chargerDevis()
      this.toggleLoading()
    },

    getImage: function (images) {
      if (images.length > 0) {
        let image = images.find(item => item.is_main === true)
        return image.image
      } else {
        return ""
      }
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
      if (mercerie.stock > 0) {
        this.detail.designation = `${mercerie.reference} | ${mercerie.name}`
        this.detail.quantite = 1
        this.detail.prix_u_ht = mercerie.prix_u_ht
        this.detail.tva = mercerie.tva
        this.ajouterDetail()
        console.log(this.detail.toCreatePayload())
      } else {
        this.makeToast('danger', "Il n'y a plus de stock disponible")
      }
    },
    updateRemarque: function () {
      let payload = this.devis.toUpdatePayload()
      this.updateDevis(payload)
    },
    makeToast(variant = null, message = "toast") {
      this.$bvToast.toast(message, {
        title: `Variant ${variant || 'default'}`,
        variant: variant,
        solid: true
      })
    },
    ajouterDetail() {
      this.createDetail([this.devis.numero_devis, this.detail.toCreatePayload()])
      this.detail = new DetailModel()
      this.hideModal('ajout-detail')
    },
    modifierDetail(item) {
      this.updateDetail([this.devis.id, item])
    },
    supprimerDetail: function (item) {
      this.deleteDetail([this.devis.numero_devis, item])
    }
  },
  created() {
    if (this.id !== undefined) {
      this.initialisation()
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