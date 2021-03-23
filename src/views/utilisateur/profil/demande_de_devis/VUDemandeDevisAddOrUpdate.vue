<template>
  <div class="demande_devis_add_or_udpate">
    <div :class="shadow">
      <h2>{{ id === undefined ? 'Créer une demande de devis' : `` }}</h2>
      <hr>
      <b-button-group>
        <b-button variant="outline-dark" @click="$router.push({name: routes.DEMANDE_DE_DEVIS.name})">
          <i class="fas fa-arrow-left"></i>
        </b-button>
        <b-button variant="outline-primary">
          Enregistrer sans soumettre
        </b-button>
        <b-button variant="outline-success">
          Enregitstrer et soumettre
        </b-button>
      </b-button-group>
      <hr>

      <b-container>
        <b-form>
          <b-form-group>
            <b-form-checkbox v-model="demande_devis.est_urgent" name="check-button" switch>
              <p>{{ demande_devis.est_urgent === true ? 'Urgent' : 'Pas urgent' }}</p>
              <span v-if="demande_devis.est_urgent === true" class="text-danger">
                <small> (toute demande urgente engendre des frais supplémentaires)</small>
              </span>
            </b-form-checkbox>
          </b-form-group>

          <b-form-group label="Titre *" description="Veuillez encoder le titre">
            <b-form-input v-model="demande_devis.titre"/>
          </b-form-group>

          <b-form-group label="Remarque *" description="Veuillez spécifier en détail votre demande">
            <b-form-textarea v-model="demande_devis.remarque"/>
          </b-form-group>

          <b-form-group label="Service *" description="Veuillez selectionner le service de l'article" class="my-1">
            <multiselect v-model="demande_devis.ref_type_service" :options="typeServices" :allow-empty="false" :hide-selected="true"
                         label="type_service" track-by="type_service" placeholder="Veuillez selectionner le service"
                         selectLabel="Appuyez sur enter pour selectionner" deselectLabel="Appuyez sur enter pour retirer">
              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.type_service }}</span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span>{{ option.type_service }}</span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
          </b-form-group>

          <b-row>
            <b-col lg="6">
              <b-form-group label="Article" class="my-1"
                            description="Si un article particulier vous interesse, veuillez le selecetion, sinon laissez vide">
                <multiselect v-model="demande_devis.ref_article" :options="articlesPublies"
                             :option-height="104" :show-labels="false" :hide-selected="true"
                             placeholder="Articles optionnel ..." label="Articles" track-by="titre">
                  <template slot="singleLabel" slot-scope="props">
                    <img v-if="props.option.images.length > 0" :src="props.option.images.length > 0 ? props.option.images[0].image : ''"
                         alt="" height="48" width="48">
                    <span> {{ props.option.titre }}</span>
                  </template>

                  <template slot="option" slot-scope="props">
                    <img :src="props.option.images.length > 0 ? props.option.images[0].image : require('@/assets/noimage.png')" alt=""
                         height="64" width="64">
                    <span> {{ props.option.titre }}</span>
                  </template>

                  <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
                </multiselect>
              </b-form-group>
            </b-col>
            <b-col lg="6">
              <b-form-group label="Mensuration" class="my-1"
                            description="Veuillez selectionner la mensuration pour cette demande, si vous en avez.">
                <multiselect v-model="demande_devis.ref_mensuration" :options="userMensurations" :hide-selected="true"
                             placeholder="Mensuration optionnel ..." label="mensuration" track-by="id">
                  <template slot="singleLabel" slot-scope="props">
                    <b-badge v-if="demande_devis.ref_mensuration.id !== null" pill
                             :variant="props.option.is_main === true ? 'success': 'primary'">
                      {{ props.option.is_main === true ? 'Principale' : 'Secondaire' }}
                    </b-badge>
                    <span> {{ props.option.titre }}</span>
                  </template>

                  <template slot="option" slot-scope="props">
                    <b-badge pill :variant="props.option.is_main === true ? 'success': 'primary'">
                      {{ props.option.is_main === true ? 'Principale' : 'Secondaire' }}
                    </b-badge>
                    <p>{{ props.option.titre }}</p>
                  </template>

                  <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
                </multiselect>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group>
            <multiselect v-model="selectedMerceries" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false"
                         :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true">
              <template slot="selection" slot-scope="{ values, search, isOpen }">
                <span class="multiselect__single"
                      v-if="values.length &amp;&amp; !isOpen">{{
                    values.length
                  }} options selected</span></template>
            </multiselect>
            <pre class="language-json"><code>{{ value  }}</code></pre>
          </b-form-group>
        </b-form>
      </b-container>
    </div>

    <b-jumbotron>
      <pre>{{ demande_devis.toCreatePayload() }}</pre>
      <pre>{{ demande_devis }}</pre>
    </b-jumbotron>
  </div>
</template>

<script>
import LemkaHelpers from "@/helpers";
import DemandeDevisModel from "@/models/demande_devis.model";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VUDemandeDevisAddOrUpdate",
  props: {
    id: {
      required: false
    },
  },
  computed: {
    ...mapGetters({
      typeServices: "TypeServices/typeServices",
      articlesPublies: "Articles/articlesPublies",
      userMensurations: "UserMensurations/userMensurations"
    }),
  },
  data() {
    return {
      shadow: LemkaHelpers.BSClass.CARD_BORDERLESS_SHADOW,
      demande_devis: new DemandeDevisModel(),
      routes: LemkaHelpers.Routes,
      selectedMerceries: []
    }
  },
  methods: {
    ...mapActions({
      loadTypeServices: "TypeServices/loadTypeServices",
      loadArticles: "Articles/loadArticles",
      loadUserMensurations: "UserMensurations/loadUserMensurations"
    }),
    initialisation: async function () {
      if (this.userMensurations.length === 0 || this.articlesPublies.length === 0 || this.typeServices.length === 0) {
        await this.loadTypeServices()
        await this.loadArticles()
        await this.loadUserMensurations()
      }
    }
  },
  created() {
    this.initialisation()
  }
}
</script>

<style scoped>

</style>