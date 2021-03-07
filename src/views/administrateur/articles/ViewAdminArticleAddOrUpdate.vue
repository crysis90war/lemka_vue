<template>
  <b-container >

    <div v-if="loading === true" class="loading text-center">
      <b-spinner type="grow" label="Loading..." variant="secondary"></b-spinner>
    </div>

    <div v-else>
      <b-form @submit.prevent="submit">
        <b-button-group class="float-right">
          <b-button type="submit"
                    :variant="slug !== undefined ? 'outline-primary' : 'outline-success'"
                    :disabled="submitStatus === 'PENDING'">
            {{ slug !== undefined ? 'Modifier' : 'Ajouter' }}
          </b-button>
          <b-button variant="outline-danger"
                    @click="reset">
            Reset
          </b-button>
          <b-button variant="outline-secondary" @click="$router.go(-1)">Retour</b-button>
        </b-button-group>
        <b-input-group class="my-1">
          <b-form-checkbox v-model="article.est_active" name="check-button" switch>
            <p v-if="article.est_active">Publier</p>
            <p v-else>En attente</p>
          </b-form-checkbox>
        </b-input-group>

        <b-form-group label="Titre"
                      description="Encodez le titre de l'article"
                      class="my-1">
          <b-form-input placeholder="Titre ..."
                        type="text"
                        v-model="$v.article.titre.$model"
                        :state="validateState('titre')"/>
          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.article.titre.required"
                              :returned-function="required()"/>
            <invalid-feedback :condition="!$v.article.titre.minLength"
                              :returned-function="minLength($v.article.titre.$params.minLength.min)"/>
            <invalid-feedback :condition="!$v.article.titre.maxLength"
                              :returned-function="maxLength($v.article.titre.$params.maxLength.max)"/>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Description"
                      description="Veuillez encoder la description de l'article"
                      class="my-1">
          <b-form-textarea placeholder="Encodage de la description"
                           v-model="$v.article.description.$model"
                           :state="validateState('description')"/>
          <b-form-invalid-feedback>
            <invalid-feedback :condition="!$v.article.description.required"
                              :returned-function="required()"/>
            <invalid-feedback :condition="!$v.article.description.minLength"
                              :returned-function="minLength($v.article.description.$params.minLength.min)"/>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-row>
          <b-col lg="6">
            <b-form-group label="Service"
                          description="Veuillez selectionner le service de l'article"
                          class="my-1">
              <multiselect v-model="article.ref_type_service"
                           :options="serviceOptions"
                           placeholder="Veuillez selectionner le service"
                           selectLabel="Appuyez sur enter pour selectionner."
                           deselectLabel="Appuyez sur enter pour retirer"
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
                           :options="catalogueOptions"
                           :internal-search="false"
                           :clear-on-select="false"
                           :close-on-select="true"
                           :options-limit="20"
                           :show-no-results="false"
                           label="catalogue"
                           track-by="id"
                           placeholder="Veuillez encoder pour lancer la recherche..."
                           selectLabel="Appuyez sur enter pour selectionner."
                           deselectLabel="Appuyez sur enter pour retirer"
                           open-direction="bottom">
                <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.ref_rayon.rayon }} - {{
                    option.ref_section.section
                  }} - {{ option.ref_type_produit.type_produit }}</span>
                </template>
                <template slot="option" slot-scope="{ option }">
                <span>{{ option.ref_rayon.rayon }} - {{
                    option.ref_section.section
                  }} - {{ option.ref_type_produit.type_produit }}</span>
                </template>
                <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
              </multiselect>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group label="Tags"
                      description="Veuillez chercher ou ajouter un tag"
                      class="my-1">
          <multiselect v-model="selected_tags"
                       :options="tag_options"
                       :multiple="true"
                       :loading="isLoading"
                       :hide-selected="true"
                       label="tag"
                       track-by="tag"
                       selectLabel="Appuyez sur enter pour selectionner."
                       deselectLabel="Appuyez sur enter pour retirer"
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

        <!--      <b-form-group label="Images"-->
        <!--                    description="Veuillez ajouter des images à l'article"-->
        <!--                    class="my-1">-->
        <!--        <b-file type="file" multiple @change="previewMultiImage"></b-file>-->
        <!--      </b-form-group>-->

        <!--      <div v-if="preview_list.length > 0">-->
        <!--        <b-list-group horizontal="md">-->
        <!--          <b-list-group-item v-for="(image, index) in preview_list" :key="index" class="text-center">-->
        <!--            <b-radio v-model="selected" name="is_main" :value="image">Principale</b-radio>-->
        <!--            <br/>-->
        <!--            <b-img :src="image" height="120" width="120"></b-img>-->
        <!--            <br/>-->
        <!--            <b-button variant="danger" @click="deleteImage(index)" class="mt-1">Supprimer</b-button>-->
        <!--          </b-list-group-item>-->
        <!--        </b-list-group>-->
        <!--      </div>-->
      </b-form>

      <div v-if="slug" class="mt-4">
        <b-button variant="outline-success"
                  size="sm" @click="showModal('image-modal')">Ajouter des images
        </b-button>

        <b-modal id="image-modal"
                 ref="image-modal"
                 hide-footer
                 title="Modifier image du profil"
                 size="xl">
          <b-form @submit.prevent="createImage">

            <b-form-group id="input-group-image"
                          label-for="input-image"
                          description="Formats autorisés .jpg et .png">
              <b-form-file id="input-image"
                           ref="image"
                           name="input-image"
                           accept="image/jpeg, image/png, .jpg, .png,"
                           v-model="image"
                           @change="previewImage"
                           required></b-form-file>
            </b-form-group>

            <div class="d-flex">
              <cropper class="cropper"
                       style="max-width: 720px; max-height: 576px"
                       :src="preview"
                       :stencil-props="{handlers: {}, movable: true, scalable: true, resizable: true}"
                       :stencil-size="{width: 800,height: 800}"
                       @change="change"/>

              <b-img v-if="destination !== null" :src="destination" height="360" width="360"></b-img>
            </div>
            <b-button-group class="d-flex">
              <b-button variant="outline-success" type="submit">Créer</b-button>
              <b-button variant="outline-danger" @click="hideModal('image-modal')">Annuler</b-button>
            </b-button-group>
          </b-form>
        </b-modal>

        <b-table :items="article_images"
                 :fields="articles_images_fields"
                 class="mt-2"
                 stacked="md"
                 small
                 show-empty>
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
            <b-button v-if="data.item.is_main === false" size="sm"
                      variant="outline-success"
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
    </div>



  </b-container>
</template>

<script>
import ArticleModel from "@/models/article.model";
import TypeServiceModel from "@/models/type_service.model";
import CatalogueModel from "@/models/catalogue.model";
import TagModel from "@/models/tag.model";
import {Cropper} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import {dataURLtoFile} from "@/helpers/functions.helper";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {validationMixin} from "vuelidate";
import InvalidFeedback from "@/components/InvalidFeedback";
import LemkaHelpers from "@/helpers";

export default {
  name: "ViewAdminArticlesAddOrUpdate",
  components: {InvalidFeedback, Cropper},
  mixins: [validationMixin, validationMessageMixin],
  validations: {
    article: ArticleModel.validations
  },
  props: {
    slug: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      article: new ArticleModel(),
      article_images: [],
      articles_images_fields: [
        {key: 'image', label: 'Image'},
        {key: 'is_main', label: 'Priorité'},
        {key: 'define', label: 'Action'},
        {key: 'actions', label: 'Actions'},
      ],

      tag_options: [],
      selected_tags: [],
      catalogueOptions: [],
      serviceOptions: [],

      cropper: null,
      preview: null,
      image: null,
      destination: null,

      preview_list: [],
      image_list: [],

      formData: new FormData(),

      selected: '',
      active: false,
      isLoading: false,
      dirty: false,
      submitStatus: null,

      loading: false,

      icons: LemkaHelpers.FontAwesomeIcons,
      BSClass: LemkaHelpers.BSClass
    }
  },

  methods: {
    chargerArticle: async function () {
      this.toggleLoading()
      Object.assign(this.article, await ArticleModel.fetch_article_by_slug(this.slug))
      this.selected_tags = this.article.ref_tag
      this.toggleLoading()
    },

    charger_article_images_by_slug: async function () {
      this.article_images = await ArticleModel.fetch_article_images(this.slug)
    },

    chargerTags: async function () {
      this.tag_options = await TagModel.getTagList()
    },

    chargerServices: async function () {
      this.serviceOptions = await TypeServiceModel.fetchTypeServices()
    },

    chargerCatalogue: async function () {
      this.catalogueOptions = await CatalogueModel.getCatalogueList()
    },

    updateSelect: async function (query) {
      this.isLoading = true
      this.tag_options = await TagModel.getTagList(query)
      this.isLoading = false
    },

    submit: async function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        console.log(this.submitStatus)
      } else {
        this.submitStatus = 'PENDING'

        let selectedTags = this.selected_tags, tagsToSubmit = []
        let payload = this.slug !== undefined ? this.article.toUpdatePayload() : this.article.toCreatePayload()

        if (selectedTags.length > 0) {
          for (let i = 0; i < selectedTags.length; i++) {
            let newTag = new TagModel()
            if (selectedTags[i].id === null) {
              Object.assign(newTag, selectedTags[i])
              let response = await TagModel.createTag(newTag.toCreatePayload())
              if (response.status === 201) {
                newTag.id = response.data.id
                tagsToSubmit.push(newTag)
              }
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
          await ArticleModel.create_article(payload)
        } else {
          await ArticleModel.update_article(payload)
        }

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$router.go(0)
        }, 500)
      }
    },

    addTag: function (newTag) {
      const tag = {
        id: null,
        tag: newTag,
      }
      this.tag_options.push(tag)
      this.selected_tags.push(tag)
    },

    validateState: function (name) {
      const {$dirty, $error} = this.$v.article[name];
      return $dirty ? !$error : null;
    },

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

    showModal: function (mondal_id) {
      this.$bvModal.show(mondal_id)
    },

    hideModal: function (mondal_id) {
      this.$bvModal.hide(mondal_id)
    },

    createImage: async function () {
      await ArticleModel.create_article_image(this.article.slug, this.formData)
      this.$router.go(0)
    },

    updateImage: async function () {
      await ArticleModel.update_article_image_by_id(this.article.slug, this.formData)
      this.$router.go(0)
    },

    update_image_is_main: async function(image_id, is_main) {
      let payload = {
        is_main: !is_main
      }
      await ArticleModel.patch_article_image(this.article.slug, image_id, payload)
      this.$router.go(0)
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
    },

    toggleLoading: function() {
      this.loading = !this.loading
    }
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    tags(newValue, oldValue) {
      this.dirty = true
    },
  },

  created() {

    this.chargerServices()
    this.chargerCatalogue()
    this.chargerTags()

    if (this.slug !== undefined) {
      try {


        this.chargerArticle()
        this.charger_article_images_by_slug()

      } catch (e) {
        console.log(e)
        this.$router.push({name: LemkaHelpers.Routes.ARTICLES.name})
      }
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