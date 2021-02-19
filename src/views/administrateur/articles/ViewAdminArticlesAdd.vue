<template>
  <b-card>
    <b-card-body>
      <b-card :class="shadow">
        <b-card-body>
          <b-form @submit.prevent="submit">
            <b-input-group class="my-1">
              <b-form-checkbox v-model="article.est_active" name="check-button" switch>
                <p v-if="article.est_active">Publier</p>
                <p v-else>En attente</p>
              </b-form-checkbox>
            </b-input-group>

            <b-form-group label="Titre"
                          description="Encodez le titre de l'article"
                          class="my-1">
              <b-form-input id="input-formatter"
                            placeholder="Entrer le titre"
                            v-model="article.titre"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Description"
                          description="Encodez la description de l'article"
                          class="my-1">
              <b-form-textarea id="input-formatter"
                               placeholder="Encodage de la description"
                               v-model="article.description"
              ></b-form-textarea>
            </b-form-group>

            <b-row>
              <b-col lg="6">
                <b-form-group label="Service"
                              description="Veuillez selectionner le service de l'article"
                              class="my-1">
                  <multiselect v-model="article.ref_type_service"
                               :options="serviceOptions"
                               placeholder="Veuillez selectionner le service"
                               label="type_service"
                               track-by="type_service"
                               :allow-empty="false">
                    <template slot="singleLabel" slot-scope="{ option }">
                      <span>{{ option.type_service }}</span>
                    </template>
                    <template slot="option" slot-scope="{ option }">
                      <span>{{ option.type_service }} - {{ option.duree_minute }} minutes</span>
                    </template>
                    <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
                  </multiselect>
                </b-form-group>
              </b-col>

              <b-col lg="6">
                <b-form-group label="Catalogue"
                              description="Veuillez selectionner le catalogue de l'article"
                              class="my-1">
                  <multiselect v-model="article.ref_catalogue"
                               label="ville"
                               track-by="ville"
                               placeholder="Veuillez encoder pour lancer la recherche..."
                               open-direction="bottom"
                               :options="catalogueOptions"
                               :multiple="false"
                               :searchable="true"
                               :loading="isLoading"
                               :internal-search="false"
                               :clear-on-select="false"
                               :close-on-select="true"
                               :options-limit="20"
                               :max-height="600"
                               :show-no-results="false"
                               :hide-selected="true">
                    <template slot="singleLabel" slot-scope="{ option }">
                      <span>{{ option.code_postale }} - {{ option.ville }}</span>
                    </template>
                    <template slot="option" slot-scope="{ option }">
                      <span>{{ option.code_postale }} - {{ option.ville }}</span>
                    </template>
                    <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
                  </multiselect>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group label="Tag multiselect taggable" description="Veuillez chercher ou ajouter un tag"
                          class="my-1">
              <multiselect v-model="article.ref_tag"
                           :options="tagOptions"
                           :multiple="true"
                           :loading="isLoading"
                           label="tag"
                           track-by="tag"
                           selectLabel="Appuyez sur enter pour selectionner."
                           :taggable="true"
                           tag-placeholder="Ajoutez ça comme nouveau tag"
                           placeholder="Cherchez ou ajoutez un tag"
                           @tag="addTag"
                           @search-change="updateSelect"></multiselect>

              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.tag }}</span>
              </template>

              <template slot="option" slot-scope="{ option }">
                <span>{{ option.tag }}</span>
              </template>

              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </b-form-group>

            <b-row>
              <b-col lg="6"><pre>{{ tagOptions }}</pre></b-col>
              <b-col lg="6"><pre>{{ article.ref_tag }}</pre></b-col>
            </b-row>

            <b-form-group label="Images"
                          description="Veuillez ajouter des images à l'article"
                          class="my-1">
              <b-file type="file" multiple @change="previewMultiImage"></b-file>
            </b-form-group>

            <div v-if="preview_list.length > 0">
              <b-list-group horizontal="md">
                <b-list-group-item v-for="(image, index) in preview_list" :key="index" class="text-center">
                  <b-radio v-model="selected" name="is_main" :value="image">Principale</b-radio>
                  <br/>
                  <b-img :src="image" height="120" width="120"></b-img>
                  <br/>
                  <b-button variant="danger" @click="deleteImage(index)" class="mt-1">Supprimer</b-button>
                </b-list-group-item>
              </b-list-group>
            </div>

            <pre>{{ selected }}</pre>


            <b-button-group class="mt-1">
              <b-button variant="outline-success">Créer</b-button>
              <b-button variant="outline-danger" @click="reset">Reset</b-button>
            </b-button-group>
          </b-form>
        </b-card-body>
      </b-card>
      <pre>{{ article }}</pre>
    </b-card-body>
  </b-card>
</template>

<script>
import ArticleModel from "@/models/article.model";
import TypeServiceModel from "@/models/typeService.model";
import {LemkaEnums} from "@/helpers/enums.helper";
import TagModel from "@/models/tag.model";

export default {
  name: "ViewAdminArticlesAdd",
  data() {
    return {
      article: new ArticleModel(),
      dirty: false,
      preview: null,
      image: null,
      preview_list: [],
      image_list: [],

      tagOptions: [],
      catalogueOptions: [],
      serviceOptions: [],

      selected: '',
      active: false,
      isLoading: false,
      shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW
    }
  },

  computed: {
    stateTag() {
      return this.dirty ? (this.tags.length > 0 && this.tags.length < 8) : null
    }
  },

  methods: {
    chargerTags: async function() {
      this.tagOptions = await TagModel.getTagList()
    },

    chargerServices: async function() {
      this.serviceOptions = await TypeServiceModel.getTypeServiceList()
    },

    chargerCatalogue: async function() {

    },

    updateSelect: async function(query) {
      this.isLoading = true
      this.tagOptions = await TagModel.getTagList(query)
      this.isLoading = false
    },

    submit: async function() {

    },

    addTag: function(newTag) {
      const tag = {
        id: null,
        tag: newTag,
      }
      this.tagOptions.push(tag)
      this.article.ref_tag.push(tag)
    },

    deleteImage: function (index) {
      this.preview_list.slice(index)
    },

    reset: function () {
      this.image = null;
      this.preview = null;
      this.image_list = [];
      this.preview_list = [];
    },

    previewImage: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    previewMultiImage: function (event) {
      let input = event.target;
      if (input.files) {
        for (let index = 0; index < input.files.length; index++) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.preview_list.push(e.target.result);
          }
          this.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
        }
      }
    },
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    tags(newValue, oldValue) {
      this.dirty = true
    }
  },

  created() {
    this.chargerServices()
    this.chargerTags()
  }
}
</script>

<style scoped>

</style>