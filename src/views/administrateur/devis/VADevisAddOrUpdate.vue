<template>
  <div>
    <section class="demande_devis mt-4">
      <l-spinner v-if="loading === true"></l-spinner>
      <b-container v-else fluid="">
        <b-button v-b-toggle.demande_devis variant="secondary">Demande de devis numéro: {{ demandeDevis.numero_demande_devis }}</b-button>
        <b-collapse id="demande_devis" class="mt-2" visible>
          <b-card>
            <b-card-body>
              <div>
                <b-tabs content-class="mt-3" align="center">
                  <b-tab title="Informations" active>
                    <b-row>
                      <b-col lg="4">
                        <b-card-text><strong>N°: </strong> {{ demandeDevis.numero_demande_devis }}</b-card-text>
                      </b-col>

                      <b-col lg="4">
                        <b-card-text><strong>Nom: </strong> {{ demandeDevis.utilisateur }}</b-card-text>
                      </b-col>

                      <b-col lg="4">
                        <b-card-text><strong>Date: </strong> {{ demandeDevis.created_at | localTimeStr }}</b-card-text>
                      </b-col>
                    </b-row>

                    <hr>

                    <b-row>
                      <b-col lg="4">
                        <b-card-text><strong>Titre: </strong> {{ demandeDevis.titre }}</b-card-text>
                      </b-col>

                      <b-col lg="4">
                        <b-card-text>
                          <strong>Urgent: </strong>
                          <b-badge pill :variant="demandeDevis.est_urgent === true ? 'success' : 'danger'">
                            <i :class="`fas fa-${demandeDevis.est_urgent  === true ? 'check' : 'times'}-circle`"></i>
                          </b-badge>
                        </b-card-text>
                      </b-col>

                      <b-col lg="4">
                        <b-card-text>
                          <strong>Traité: </strong>
                          <b-badge pill :variant="demandeDevis.est_traite === true ? 'success' : 'danger'">
                            <i :class="`fas fa-${demandeDevis.est_traite  === true ? 'check' : 'times'}-circle`"></i>
                          </b-badge>
                        </b-card-text>
                      </b-col>
                    </b-row>

                    <hr>

                    <b-row>
                      <b-col>
                        <strong>Remarque: </strong>
                        <b-card-text>{{ demandeDevis.remarque }}</b-card-text>
                      </b-col>
                    </b-row>
                  </b-tab>

                  <b-tab title="Mensurations">
                    <p>TODO - Récupérer les mensuration de l'utilisateur</p>
                  </b-tab>

                  <b-tab title="Article" :disabled="demandeDevis.ref_article === null">
                    <b-row v-if="demandeDevis.ref_article !== null">
                      <b-col cols="3">
                        <b-img v-if="demandeDevis.ref_article" :src="demandeDevis.mainImage(demandeDevis.ref_article.images)" width="128"
                               height="128"></b-img>
                      </b-col>
                      <b-col>
                        <p>{{ demandeDevis.ref_article.titre }}</p>
                        <p>{{ demandeDevis.ref_article.description }}</p>
                      </b-col>
                    </b-row>
                  </b-tab>

                  <b-tab title="Merceries" :disabled="demandeDevis.ref_mercerie_option.length === 0">
                    <b-list-group>
                      <b-list-group-item v-for="item in demandeDevis.ref_mercerie_option" :key="item.id">
                        <b-img :src="require('@/assets/noimage.png')" height="72" width="72"></b-img>
                        <span class="ml-3"><strong>{{ item.reference }}</strong> | {{ item.name }}</span>
                        <b-button variant="outline-success" size="sm" class="mx-4"><i class="fas fa-plus"></i></b-button>
                      </b-list-group-item>
                    </b-list-group>
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
        <b-button v-b-toggle.details variant="secondary">Détails</b-button>
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
                  <multiselect v-model="detail.ref_tva" :options="tva">
                    <template slot="singleLabel" slot-scope="{ option }">
                      <strong>{{ option.taux }}</strong>
                    </template>
                    <template slot="option" slot-scope="{ option }">
                      <span>{{ option.taux * 100 }} %</span>
                    </template>
                  </multiselect>
                </b-form-group>
                <b-button variant="success" @click="ajouter(); hideModal('ajout-detail')">Ajouter</b-button>
              </b-modal>
              <!-- endregion -->

              <b-table :items="details" :fields="fields" class="text-center my-2" small stacked="md" :show-empty="true">
                <template #empty>
                  <l-table-empty></l-table-empty>
                </template>

                <template #cell(prix_u_ht)="data">
                  <p>{{ data.item.prix_u_ht }} €</p>
                </template>

                <template #cell(ref_tva)="data">
                  <p>{{ data.item.ref_tva.taux * 100 }} %</p>
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
                <b-textarea v-model="devis.remarque"></b-textarea>
              </b-form-group>

              <b-button-group>
                <b-button variant="outline-dark"><i class="fas fa-arrow-left"></i></b-button>
                <b-button variant="outline-primary"><i class="fas fa-save"></i></b-button>
                <b-button variant="outline-success"><i class="fas fa-paper-plane"></i></b-button>
              </b-button-group>
            </b-card-body>
          </b-card>
        </b-collapse>
      </b-container>
    </section>

    <b-jumbotron class="mt-4" header="DemandeDevis">
      <pre>{{ demandeDevis }}</pre>
    </b-jumbotron>
    <b-jumbotron class="mt-4" header="Detail">
      <pre>{{ detail.toCreatePayload() }}</pre>
    </b-jumbotron>
  </div>
</template>

<script>
import {localTimeStr} from "@/utils/filters";
import DemandeDevisModel from "@/models/demande_devis.model";
import DevisModel from "@/models/devis.model";
import {mapActions} from "vuex";
import DetailModel from "@/models/detail.model";
import {fonctions} from "@/mixins/functions.mixin";

export default {
  name: "VADevisAddOrUpdate",
  mixins: [fonctions],
  props: {
    demande_devis_id: {},
    devis_id: {}
  },
  data() {
    return {
      demandeDevis: new DemandeDevisModel(),
      devis: new DevisModel(),
      detail: new DetailModel(),
      details: [],
      fields: DetailModel.tableFields,
      loading: false,
      tva: [
        {id: 1, taux: 0.21}
      ]
    }
  },
  methods: {
    ...mapActions({loadGlobalMerceries: "Merceries/loadGlobalMercerieOptions"}),
    initialisation: async function () {
      this.toggleLoading()

      Object.assign(this.demandeDevis, await this.$store.getters["DemandesDevis/adminUserDD"](this.demande_devis_id))

      this.demandeDevis.ref_type_service = this.$store.getters["TypeServices/typeService"](this.demandeDevis.ref_type_service)

      if (this.demandeDevis.ref_article !== null) {
        this.demandeDevis.ref_article = this.$store.getters["Articles/articleById"](this.demandeDevis.ref_article)
      }

      if (this.demandeDevis.ref_mercerie_option.length > 0) {
        await this.loadGlobalMerceries()
        let merceries = []
        this.demandeDevis.ref_mercerie_option.forEach(item => {
          if (item !== undefined) {
            let mercerie = this.$store.getters["Merceries/globalMercerie"](item)
            if (mercerie !== undefined) {
              merceries.push(mercerie)
            }
          }
        })
        this.demandeDevis.ref_mercerie_option = merceries
      }

      if (this.devis_id !== undefined) {
        this.$route.meta.value = this.devis.id
      } else {
        this.$route.meta.value = this.demandeDevis.numero_demande_devis
      }
      this.toggleLoading()
    },

    submitSave: function() {

    },

    submitSend: function() {

    },

    ajouter() {
      this.detail.ref_devis = this.demande_devis_id
      this.details.push(this.detail)
      this.detail = new DetailModel()
    }
  },
  created() {
    this.initialisation()
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