<template>
  <div class="article">
    <l-spinner v-if="loading"/>

    <b-container v-else>
      <b-form>
        <b-input-group class="my-1">
          <b-form-checkbox v-model="article.est_active" name="check-button" switch>
            <p>{{ article.est_active === true ? 'Publié' : 'En attente' }}</p>
          </b-form-checkbox>
        </b-input-group>

        <b-form-group label="Titre" description="Encodez le titre de l'article" class="my-1">
          <b-form-input v-model="$v.article.titre.$model"
                        placeholder="Titre ..." type="text" :state="validateState('titre')"/>
          <b-form-invalid-feedback>
            <l-invalid-feedback :condition="!$v.article.titre.required"
                                :errorMessage="required()"/>
            <l-invalid-feedback :condition="!$v.article.titre.minLength"
                                :errorMessage="minLength($v.article.titre.$params.minLength.min)"/>
            <l-invalid-feedback :condition="!$v.article.titre.maxLength"
                                :errorMessage="maxLength($v.article.titre.$params.maxLength.max)"/>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Description" description="Veuillez encoder la description de l'article" class="my-1">
          <b-form-textarea v-model="$v.article.description.$model"
                           placeholder="Encodage de la description" :state="validateState('description')"/>
          <b-form-invalid-feedback>
            <l-invalid-feedback :condition="!$v.article.description.required"
                                :errorMessage="required()"/>
            <l-invalid-feedback :condition="!$v.article.description.minLength"
                                :errorMessage="minLength($v.article.description.$params.minLength.min)"/>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-row>
          <b-col lg="6">
            <b-form-group label="Service" description="Veuillez selectionner le service de l'article" class="my-1">
              <multiselect v-model="article.ref_type_service" :options="typeServices" :allow-empty="false" :hide-selected="true"
                           label="type_service" track-by="type_service" placeholder="Veuillez selectionner le service"
                           selectLabel="Appuyez sur enter pour selectionner" deselectLabel="Appuyez sur enter pour retirer">
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
            <b-form-group label="Catalogue" description="Veuillez selectionner le catalogue de l'article" class="my-1">
              <multiselect v-model="article.ref_catalogue" :options="catalogues" :loading="cataloguesLoadingStatus"
                           :close-on-select="true" :hide-selected="true" :options-limit="20" :show-no-results="false"
                           open-direction="bottom" track-by="id" :internal-search="false" :allow-empty="false"
                           placeholder="Veuillez encoder pour lancer la recherche..."
                           selectLabel="Appuyez sur enter pour selectionner." deselectLabel="Appuyez sur enter pour retirer"
                           @search-change="updateSelectCatalogue">

                <template slot="singleLabel" slot-scope="{ option }">
                  <span>{{ option.rayon }} - {{ option.section }} - {{ option.type_produit }}</span>
                </template>

                <template slot="option" slot-scope="{ option }">
                  <span>{{ option.rayon }} - {{ option.section }} - {{ option.type_produit }}</span>
                </template>

                <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
              </multiselect>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group label="Tags" description="Veuillez chercher ou ajouter un tag" class="my-1">
          <multiselect v-model="selected_tags" :options="tags" :loading="tagsLoadingStatus" :multiple="true"
                       :hide-selected="true" :taggable="true" label="tag" track-by="tag"
                       selectLabel="Appuyez sur enter pour selectionner." deselectLabel="Appuyez sur enter pour retirer"
                       placeholder="Cherchez ou ajoutez un tag" tag-placeholder="Ajoutez ça comme nouveau tag"
                       @tag="addTag" @search-change="updateSelectTag"></multiselect>

          <template slot="singleLabel" slot-scope="{ option }">
            <span>{{ option.tag }}</span>
          </template>

          <template slot="option" slot-scope="{ option }">
            <span>{{ option.tag }}</span>
          </template>

          <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
        </b-form-group>

        <b-button-group size="sm" class="my-3">
          <b-button variant="outline-dark" @click="$router.push({name: routes.ARTICLES.name})">
            <i class="fas fa-arrow-left"></i>
          </b-button>
          <b-button :variant="slug !== undefined ? 'outline-primary' : 'outline-success'"
                    :disabled="submitStatus === 'PENDING'" @click="submit">
            {{ slug !== undefined ? 'Modifier' : 'Ajouter' }}
          </b-button>
          <b-button variant="outline-danger" @click="reset">
            Reset
          </b-button>
        </b-button-group>
      </b-form>

      <div v-if="slug" class="mt-3">
        <b-button variant="outline-success" size="sm" @click="showModal('image-modal')">
          Ajouter des images
        </b-button>

        <b-modal id="image-modal" ref="image-modal" hide-footer title="Modifier image du profil" size="xl">
          <b-form @submit.prevent="createImage">
            <b-form-group id="input-group-image" label-for="input-image" description="Formats autorisés .jpg et .png">
              <b-form-file v-model="image" id="input-image" ref="image" name="input-image" required
                           accept="image/jpeg, image/png, .jpg, .png," @change="previewImage"></b-form-file>
            </b-form-group>

            <div class="d-flex">
              <cropper :src="preview" :stencil-size="{width: 800,height: 800}"
                       :stencil-props="{handlers: {}, movable: true, scalable: true, resizable: true}"
                       class="cropper" style="max-width: 720px; max-height: 576px" @change="change"/>
              <b-img v-if="destination !== null" :src="destination" height="360" width="360"></b-img>
            </div>

            <b-button-group class="d-flex">
              <b-button variant="outline-success" type="submit">Créer</b-button>
              <b-button variant="outline-danger" @click="hideModal('image-modal')">Annuler</b-button>
            </b-button-group>
          </b-form>
        </b-modal>

        <b-table :items="images" :fields="imagesFields" class="mt-2" stacked="md" small show-empty>
          <template #empty>
            <div class="text-center">
              Cet article n'a pas d'images
            </div>
          </template>

          <template #cell(image)="data">
            <b-link :href="data.item.image" target="_blank">
              <b-img :src="data.item.image" width="50" height="50"></b-img>
            </b-link>
          </template>

          <template #cell(is_main)="data">
            <b-badge :variant="data.item.is_main === true ? 'success' : 'primary'">
              {{ data.item.is_main === true ? 'Principale' : 'Secondaire' }}
            </b-badge>
          </template>

          <template #cell(define)="data">
            <b-button v-if="data.item.is_main === false" size="sm" variant="outline-success"
                      @click="update_image_is_main(data.item.id, data.item.is_main)">
              Définir comme principale
            </b-button>
          </template>

          <template #cell(actions)>
            <b-button-group>
              <b-button size="sm" variant="outline-primary">Modifier</b-button>
              <b-button size="sm" variant="outline-danger">Supprimer</b-button>
            </b-button-group>
          </template>
        </b-table>
      </div>
    </b-container>

    <b-jumbotron class="mt-5" v-if="loading === false">
      <pre>{{ article.toUpdatePayload() }}</pre>
      <pre>{{ selected_tags }}</pre>
      <pre>{{ images }}</pre>
      <pre>{{ catalogues }}</pre>
    </b-jumbotron>
  </div>
</template>

<script>
import ArticleModel from "@/models/article/article.model";
import TagModel from "@/models/tag.model";
import {Cropper} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import {dataURLtoFile} from "@/helpers/functions.helper";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {validationMixin} from "vuelidate";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import ArticleImageModel from "@/models/article/article_image.model";
import TypeServiceModel from "@/models/type_service.model";
import CatalogueModel from "@/models/catalogue/catalogue.model";
import {fonctions} from "@/mixins/functions.mixin";

export default {
  name: "VAArticleAddOrUpdate",
  components: {Cropper},
  mixins: [validationMixin, validationMessageMixin, fonctions],
  validations: {
    article: ArticleModel.validations
  },
  props: {
    slug: {
      type: String,
      required: false
    }
  },

  computed: {
    ...mapGetters({
      images: "Articles/images",
      tags: "Tags/tags",
      tagsLoadingStatus: "Tags/tagsLoadingStatus",
      typeServices: 'TypeServices/typeServices',
      typeServiceLoadingStatus: "TypeServices/typeServiceLoadingStatus",
      catalogues: "Catalogues/catalogues",
      articles: "Articles/articles",
      cataloguesLoadingStatus: "Catalogues/cataloguesLoadingStatus"
    })
  },

  data() {
    return {
      icons: LemkaHelpers.FontAwesomeIcons,
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes,
      loading: false,

      article: new ArticleModel(),
      imagesFields: ArticleImageModel.tableFields,
      submitStatus: null,

      selected_tags: [],

      preview: null,
      image: null,
      destination: null,

      preview_list: [],
      image_list: [],

      formData: new FormData(),

      dirty: false
    }
  },

  methods: {
    ...mapActions({
      loadTags: "Tags/loadTags",
      loadTypeServices: "TypeServices/loadTypeServices",
      loadCatalogues: "Catalogues/loadCatalogues",
      loadArticles: "Articles/loadArticles",
      createArticle: "Articles/createArticle",
      updateArticle: "Articles/updateArticle",
      loadImages: "Articles/loadImages",
      createImage: "Articles/createImage",
      updateImage: "Articles/updateImage",
      createTag: "Tags/createTag"
    }),

    initialisation: async function () {
      if (this.tags.length === 0 || this.catalogues.length === 0 || this.typeServices.length === 0 || this.articles.length === 0) {
        await this.loadArticles()
        await this.loadCatalogues()
        await this.loadTypeServices()
        await this.loadTags()
      }
      await this.loadImages(this.slug)
    },

    chargerArticle: async function () {
      this.toggleLoading()
      await this.initialisation()

      Object.assign(this.article, this.$store.getters["Articles/articleBySlug"](this.slug))
      this.article.ref_type_service = Object.assign(
          new TypeServiceModel(),
          this.$store.getters["TypeServices/typeService"](this.article.ref_type_service)
      )
      this.article.ref_catalogue = Object.assign(
          new CatalogueModel(),
          this.$store.getters["Catalogues/catalogue"](this.article.ref_catalogue)
      )

      this.article.ref_tag.forEach(item => {
        this.selected_tags.push(Object.assign(new TagModel(), this.$store.getters["Tags/tag"](item)))
      })
      this.toggleLoading()
    },

    updateSelectTag: async function (query) {
      await this.loadTags(query)
    },

    updateSelectCatalogue: async function (query) {
      await this.loadCatalogues(query)
    },

    validateState: function (name) {
      const {$dirty, $error} = this.$v.article[name];
      return $dirty ? !$error : null;
    },

    addTag: function (newTag) {
      const tag = {
        id: null,
        tag: newTag,
      }
      this.tags.push(tag)
      this.selected_tags.push(tag)
    },

    submit: async function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        let selectedTags = this.selected_tags
        let tagsToSubmit = []
        let payload = this.slug !== undefined ? this.article.toUpdatePayload() : this.article.toCreatePayload()

        if (selectedTags.length > 0) {
          for (let i = 0; i < selectedTags.length; i++) {
            let newTag = new TagModel()

            if (selectedTags[i].id === null) {
              Object.assign(newTag, selectedTags[i])
              await this.createTag(newTag.toCreatePayload()).then(tag => {
                tagsToSubmit.push(tag)
              })
            } else {
              newTag = selectedTags[i]
              tagsToSubmit.push(newTag)
            }
          }

          tagsToSubmit.forEach(tag => {
            payload.ref_tag.push(tag.id)
          })
        }

        if (this.slug === undefined) {
          await this.createArticle(payload)
        } else {
          await this.updateArticle(payload)
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.push({name: this.routes.ARTICLES.name})
        }, 500)
      }
    },

    // TODO - Corriger le traitement sur l'image
    // region Traitement image
    previewImage: function (event) {
      let input = event.target;
      let formatImage = [
        "image/jpeg",
        "image/png"
      ]
      if (formatImage.includes(input.files[0]['type'])) {
        console.log('vrai')
      } else {
        console.log('faux')
      }
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
      }
    },

    // eslint-disable-next-line no-unused-vars
    change: function ({coordinates, canvas, image}) {
      // console.log(coordinates, canvas, image)
      this.destination = canvas.toDataURL()

      let formData = new FormData()
      let file = dataURLtoFile(canvas.toDataURL())
      formData.append('image', file, 'image.jpg')
      formData.append('ref_article', this.article.slug)
      this.formData = formData
    },

    hideModal: function (mondal_id) {
      this.$bvModal.hide(mondal_id)
    },

    createImage: async function () {
      await ArticleModel.create_article_image(this.article.slug, this.formData)
    },

    updateImage: async function () {
      await ArticleModel.update_article_image_by_id(this.article.slug, this.formData)
    },

    update_image_is_main: async function (image_id, is_main) {
      let payload = {
        is_main: !is_main
      }
      await ArticleModel.patch_article_image(this.article.slug, image_id, payload)
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

    deleteImage: function (index) {
      this.preview_list.slice(index)
    },

    reset: function () {
      this.image = null;
      this.preview = null;
      this.image_list = [];
      this.preview_list = [];
    }
    // endregion
  },

  created() {
    if (this.slug !== undefined) {
      this.chargerArticle()
    } else {
      this.initialisation()
    }
  },

  mounted() {
    if (this.slug !== undefined) {
      this.$route.meta.value = `Modifier ${this.article.titre}`
    } else {
      this.$route.meta.value = "Création de l'article"
    }
  }
}
</script>

<style scoped>

</style>