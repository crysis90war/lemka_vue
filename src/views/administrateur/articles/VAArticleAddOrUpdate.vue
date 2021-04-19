<template>
  <div class="article">
    <l-spinner v-if="isLoading"/>

    <b-container v-else>
      <!-- region Article -->
      <b-form>
        <!-- region Switch -->
        <b-input-group class="my-1">
          <b-form-checkbox v-model="article.est_active" name="check-button" switch>
            <p>{{ article.est_active === true ? 'Publié' : 'En attente' }}</p>
          </b-form-checkbox>
        </b-input-group>
        <!-- endregion -->

        <!-- region Titre -->
        <b-form-group label="Titre" description="Encodez le titre de l'article" class="my-1">
          <b-form-input v-model="$v.article.titre.$model" placeholder="Titre ..." type="text" :state="validateState('titre')"/>
          <b-form-invalid-feedback>
            <l-invalid-feedback :condition="!$v.article.titre.required" :errorMessage="required()"/>
            <l-invalid-feedback :condition="!$v.article.titre.minLength"
                                :errorMessage="minLength($v.article.titre.$params.minLength.min)"/>
            <l-invalid-feedback :condition="!$v.article.titre.maxLength"
                                :errorMessage="maxLength($v.article.titre.$params.maxLength.max)"/>
          </b-form-invalid-feedback>
        </b-form-group>
        <!-- endregion -->

        <!-- region Description -->
        <b-form-group label="Description" description="Veuillez encoder la description de l'article" class="my-1">
          <b-form-textarea v-model="$v.article.description.$model" placeholder="Encodage de la description"
                           :state="validateState('description')"/>
          <b-form-invalid-feedback>
            <l-invalid-feedback :condition="!$v.article.description.required" :errorMessage="required()"/>
            <l-invalid-feedback :condition="!$v.article.description.minLength"
                                :errorMessage="minLength($v.article.description.$params.minLength.min)"/>
          </b-form-invalid-feedback>
        </b-form-group>
        <!-- endregion -->

        <b-row>
          <!-- region Service -->
          <b-col lg="6">
            <b-form-group label="Service" description="Veuillez selectionner le service de l'article" class="my-1">
              <multiselect v-model="article.type_service" :options="typeServices" :allow-empty="false" :hide-selected="true"
                           label="type_service" track-by="type_service" placeholder="Veuillez selectionner le service"
                           selectLabel="Appuyez sur enter pour selectionner" deselectLabel="Appuyez sur enter pour retirer">
                <template slot="singleLabel" slot-scope="{ option }">
                  <span>{{ option.type_service.id !== null ? option.type_service : null }}</span>
                </template>
                <template slot="option" slot-scope="{ option }">
                  <span>{{ option.type_service }} - {{ option.duree_minute }} minutes</span>
                </template>
                <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
              </multiselect>
            </b-form-group>
          </b-col>
          <!-- endregion -->

          <!-- region Catalogue -->
          <b-col lg="6">
            <b-form-group label="Catalogue" description="Veuillez selectionner le catalogue de l'article" class="my-1">
              <multiselect v-model="article.catalogue" :options="catalogues" :loading="cataloguesLoadingStatus" :close-on-select="true"
                           :hide-selected="true" :options-limit="20" :show-no-results="false" open-direction="bottom" track-by="id"
                           :internal-search="false" :allow-empty="false" placeholder="Veuillez encoder pour lancer la recherche..."
                           selectLabel="Appuyez sur enter pour selectionner." deselectLabel="Appuyez sur enter pour retirer"
                           @search-change="updateSelectCatalogue">

                <template slot="singleLabel" slot-scope="{ option }">
                  <span>
                    {{option.id !== null ? `${option.rayon.rayon} - ${option.section.section} - ${option.type_produit.type_produit}` : null }}
                  </span>
                </template>

                <template slot="option" slot-scope="{ option }">
                  <span>
                    {{option.id !== null ? `${option.rayon.rayon} - ${option.section.section} - ${option.type_produit.type_produit}` : null }}
                  </span>
                </template>

                <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
              </multiselect>
            </b-form-group>
          </b-col>
          <!-- endregion -->
        </b-row>

        <!-- region Tag -->
        <b-form-group label="Tags" description="Veuillez chercher ou ajouter un tag" class="my-1">
          <multiselect v-model="article.tags" :options="tags" :loading="tagsLoadingStatus" :multiple="true" :hide-selected="true"
                       :taggable="true" label="tag" track-by="tag" selectLabel="Appuyez sur enter pour selectionner."
                       deselectLabel="Appuyez sur enter pour retirer" placeholder="Cherchez ou ajoutez un tag"
                       tag-placeholder="Ajoutez ça comme nouveau tag" @tag="addTag" @search-change="updateSelectTag"></multiselect>

          <template slot="singleLabel" slot-scope="{ option }">
            <span>{{ option.tag }}</span>
          </template>

          <template slot="option" slot-scope="{ option }">
            <span>{{ option.tag }}</span>
          </template>

          <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
        </b-form-group>
        <!-- endregion -->

        <b-button-group size="sm" class="my-3">
          <b-button variant="outline-dark" @click="$router.push({name: routes.ARTICLES.name})">
            <i class="fas fa-arrow-left"></i>
          </b-button>
          <b-button :variant="slug !== undefined ? 'outline-primary' : 'outline-success'" :disabled="submitStatus === 'PENDING'"
                    @click="submit">
            {{ slug !== undefined ? 'Modifier' : 'Ajouter' }}
          </b-button>
        </b-button-group>
      </b-form>
      <!-- endregion -->

      <!-- region Images -->
      <div v-if="slug" class="mt-3">
        <b-button variant="outline-success" size="sm" @click="showModal('image-modal')">
          Ajouter des images
        </b-button>

        <b-modal id="image-modal" ref="image-modal" hide-footer title="Modifier image du profil" size="xl">
          <b-form @submit.prevent="ajouterImage">
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

        <b-table :items="article.images" :fields="imagesFields" class="mt-2" stacked="md" small show-empty>
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

          <template #cell(actions)="data">
            <b-button-group>
              <b-button size="sm" variant="outline-primary">Modifier</b-button>
              <b-button size="sm" variant="outline-danger" @click="supprimerImage(data.item)">Supprimer</b-button>
            </b-button-group>
          </template>
        </b-table>
      </div>
      <!-- endregion -->
    </b-container>

    <l-jumbotron header="Article Image" :data="articleImage.toCreatePayload()"/>
    <l-jumbotron header="Form Data" :data="formData"/>
    <l-jumbotron :data="article.toCreatePayload()"/>
    <l-jumbotron :data="article"/>
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
import {fonctions} from "@/mixins/functions.mixin";
import {htmlTitle} from "@/utils/tools";

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
  title() {
    if (this.slug !== undefined) {
      return htmlTitle(this.article.titre)
    } else {
      return htmlTitle("Ajout d'une nouveau article")
    }
  },
  computed: {
    ...mapGetters({
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

      article: new ArticleModel(),
      imagesFields: ArticleImageModel.tableFields,
      articleImage: new ArticleImageModel(),
      submitStatus: null,

      preview: null,
      image: null,
      destination: null,

      formData: new FormData(),
    }
  },

  methods: {
    ...mapActions({
      loadArticles: "Articles/loadArticles",
      loadTags: "Tags/loadTags",
      loadTypeServices: "TypeServices/loadTypeServices",
      loadCatalogues: "Catalogues/loadCatalogues",
      createTag: "Tags/createTag",
      createArticle: "Articles/createArticle",
      updateArticle: "Articles/updateArticle",
      createImage: "Articles/createImage",
      updateImage: "Articles/updateImage",
      deleteImage: "Articles/deleteImage"
    }),

    initialisation: async function () {
      if (this.articles.length === 0) {
        await this.loadArticles()
      }
      if (this.tags.length === 0) {
        await this.loadTags()
      }
      if (this.catalogues.length) {
        await this.loadCatalogues()
      }
      if (this.typeServices.length === 0) {
        await this.loadTypeServices()
      }
    },

    chargerArticle: async function () {
      this.toggleLoading()
      await this.initialisation()
      let article = await this.$store.getters["Articles/articleBySlug"](this.$route.params.slug)

      if (article !== undefined) {
        Object.assign(this.article, await this.$store.getters["Articles/articleBySlug"](this.$route.params.slug))
        this.$route.meta.value = this.article.titre
      } else {
        await this.$router.push({name: this.routes.ARTICLES.name})
      }
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
      this.article.tags.push(tag)
    },

    submit: async function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        if (this.article.tags.length > 0) {
          for (let i = 0; i < this.article.tags.length; i++) {
            let newTag = new TagModel()

            if (this.article.tags[i].id === null) {
              Object.assign(newTag, this.article.tags[i])
              await this.createTag(newTag.toCreatePayload()).then(tag => {
                this.article.tags.splice(i, 1, tag)
              })
            }
          }
        }

        let payload = this.slug !== undefined ? this.article.toUpdatePayload() : this.article.toCreatePayload()

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
      this.formData = formData
    },

    hideModal: function (mondal_id) {
      this.$bvModal.hide(mondal_id)
    },

    ajouterImage: function () {
      this.createImage([this.article.slug, this.formData])
      this.hideModal('image-modal')
    },

    modifierImage: function () {
      this.updateImage([this.article.slug, this.formData])
    },

    supprimerImage: function(image) {
      console.log(image)
      this.deleteImage([this.article.slug, image])
    },

    update_image_is_main: function (image_id, is_main) {
      let payload = {
        is_main: !is_main
      }
      ArticleModel.patch_article_image(this.article.slug, image_id, payload)
    },
  },

  created() {
    if (this.slug !== undefined) {
      this.chargerArticle()
    } else {
      this.initialisation()
    }
  },

  mounted() {
  }
}
</script>

<style scoped>

</style>