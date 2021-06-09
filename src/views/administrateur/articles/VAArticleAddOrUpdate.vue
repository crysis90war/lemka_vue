<template>
  <div class="article">
    <l-spinner v-if="isLoading"/>
    <b-container v-else>
      <div class="mb-5">
        <hr>
        <div class="d-flex justify-content-between">
          <b-button-group>
            <b-button
                v-b-tooltip.top title="Revenir vers articles"
                variant="outline-dark"
                @click="$router.push({name: routes.ARTICLES.name})"
            >
              <i class="fas fa-arrow-left"></i>
            </b-button>
            <b-button
                v-b-tooltip.top
                :title="slug !== undefined ? 'Modifier : '+ article.titre : 'Créer un nouvel article'"
                :variant="slug !== undefined ? 'outline-primary' : 'outline-success'"
                :disabled="submitStatus === 'PENDING'"
                @click="submit"
            >
              {{ slug !== undefined ? 'Modifier' : 'Créer' }}
            </b-button>
            <b-button
                v-if="slug !== undefined"
                v-b-tooltip.top :title="`Supprimer: ${article.titre}`"
                variant="outline-danger"
                @click="showModal('delete-modal-article')"
            >
              Supprimer
            </b-button>
          </b-button-group>

          <l-table-delete-modal
              modal-id="article"
              :modal-title="article.titre"
              :modal-text="article.titre"
              @clickHideModal="hideModal('delete-modal-article')"
              @clickDelete="supprimerArticle(article)"
          />
          <h3>{{ slug !== undefined ? article.titre : 'Créer nouvelle mercerie' }}</h3>
        </div>
        <hr>
      </div>

      <!-- region Publication -->
      <b-input-group class="my-1">
        <b-form-checkbox
            v-model="article.est_active"
            name="check-button"
            switch
        >
          <p>{{ article.est_active === true ? 'Publié' : 'En attente' }}</p>
        </b-form-checkbox>
      </b-input-group>
      <!-- endregion -->

      <!-- region Titre -->
      <l-input-field
          :input-type="true"
          v-model="$v.article.titre.$model"
          label="Titre"
          description="Encodez le titre de l'article"
          placeholder="Titre ..."
          :state="validateState($v.article, 'titre')"
      >
        <template #invalid-feedback>
          <l-invalid-feedback
              :condition="!$v.article.titre.required"
              :errorMessage="required()"
          />
          <l-invalid-feedback
              :condition="!$v.article.titre.minLength"
              :errorMessage="minLength($v.article.titre.$params.minLength.min)"
          />
          <l-invalid-feedback
              :condition="!$v.article.titre.maxLength"
              :errorMessage="maxLength($v.article.titre.$params.maxLength.max)"
          />
        </template>
      </l-input-field>
      <!-- endregion -->

      <!-- region Description -->
      <l-input-field
          :text-area-type="true"
          v-model="$v.article.description.$model"
          label="Description"
          description="Veuillez encoder la description de l'article"
          placeholder="Encodage de la description"
          :state="validateState($v.article, 'description')"
      >
        <template #invalid-feedback>
          <l-invalid-feedback
              :condition="!$v.article.description.required"
              :errorMessage="required()"
          />
          <l-invalid-feedback
              :condition="!$v.article.description.minLength"
              :errorMessage="minLength($v.article.description.$params.minLength.min)"
          />
        </template>
      </l-input-field>
      <!-- endregion -->

      <b-row class="mt-3">
        <!-- region Service -->
        <b-col lg="6">
          <b-form-group
              label="Service"
              description="Veuillez selectionner le service de l'article"
          >
            <multiselect
                v-model="article.type_service"
                :options="typeServices"
                :allow-empty="false"
                :show-labels="false"
                track-by="nom"
                :class="{ 'invalid': invalidTypeService }"
                @close="toucheTypeService"
            >
              <template slot="singleLabel" slot-scope="{ option }">
                <span>{{ option.id !== null ? option.nom : null }}</span>
              </template>
              <template slot="option" slot-scope="{ option }">
                <span>{{ option.nom }} - {{ option.duree_minute }} minutes</span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
            <span class="text-danger" v-show="invalidTypeService"><small>Ce champ est requis</small></span>
          </b-form-group>
        </b-col>
        <!-- endregion -->

        <!-- region Catalogue -->
        <b-col lg="6">
          <b-form-group
              label="Catalogue"
              description="Veuillez selectionner le catalogue de l'article"
          >
            <multiselect
                v-model="article.catalogue"
                :options="catalogues"
                :loading="cataloguesLoadingStatus"
                :close-on-select="true"
                :options-limit="20"
                :show-no-results="false"
                :show-labels="false"
                open-direction="bottom"
                track-by="id"
                :internal-search="false"
                :allow-empty="false"
                placeholder="Veuillez encoder pour lancer la recherche..."
                :class="{ 'invalid': invalidCatalogue }"
                @close="toucheCatalogue"
                @search-change="updateSelectCatalogue"
            >
              <template slot="singleLabel" slot-scope="{ option }">
                  <span>
                    {{ option.id !== null ? `${option.rayon.nom} - ${option.section.nom} - ${option.type_produit.nom}` : null }}
                  </span>
              </template>

              <template slot="option" slot-scope="{ option }">
                  <span>
                    {{ option.id !== null ? `${option.rayon.nom} - ${option.section.nom} - ${option.type_produit.nom}` : null }}
                  </span>
              </template>
              <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
            </multiselect>
            <span class="text-danger" v-show="invalidCatalogue"><small>Ce champ est requis</small></span>
          </b-form-group>
        </b-col>
        <!-- endregion -->
      </b-row>

      <!-- region Tag -->
      <b-form-group
          label="Tags"
          description="Veuillez chercher ou ajouter un tag"
          class="my-1"
      >
        <multiselect
            v-model="article.tags"
            :loading="loadingStatus"
            :options="tags"
            :multiple="true"
            :hide-selected="true"
            :show-labels="false"
            :taggable="true"
            label="nom"
            track-by="id"
            placeholder="Cherchez ou ajoutez un tag"
            tag-placeholder="Ajoutez ça comme nouveau tag"
            @search-change="updateSelectTag"
            @tag="addTag"
        >
          <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
          <span slot="noOptions">Aucun tag disponible. Veuillez encoder pour en créer.</span>
        </multiselect>
      </b-form-group>
      <!-- endregion -->

      <!-- region Images -->
      <div
          v-if="slug"
          class="mt-5"
      >
        <b-button
            variant="outline-success"
            size="sm"
            @click="showModal('image-modal')"
        >
          Ajouter des images
        </b-button>

        <b-modal
            id="image-modal"
            ref="image-modal"
            hide-footer
            title="Modifier image du profil"
            size="xl"
        >
          <b-form @submit.prevent="addImage">
            <b-form-group description="Formats autorisés .jpg et .png">
              <b-form-file
                  v-model="image"
                  ref="image"
                  required
                  accept="image/jpeg, image/png, .jpg, .png,"
                  @change="previewImage"
              />
            </b-form-group>

            <div class="d-flex">
              <cropper
                  :src="preview"
                  :stencil-size="{width: 800,height: 800}"
                  :stencil-props="{handlers: {}, movable: true, scalable: true, resizable: true}"
                  class="cropper"
                  style="max-width: 720px; max-height: 576px"
                  @change="change"
              />
              <b-img
                  v-if="destination !== null"
                  :src="destination"
                  height="360"
                  width="360"
              />
            </div>

            <b-button-group class="d-flex">
              <b-button
                  variant="outline-success"
                  type="submit"
              >
                Créer
              </b-button>
              <b-button
                  variant="outline-danger"
                  @click="hideModal('image-modal')"
              >
                Annuler
              </b-button>
            </b-button-group>
          </b-form>
        </b-modal>

        <b-table
            :items="article.images"
            :fields="imagesFields"
            hover
            show-empty
            small
            stacked="md"
            class="text-center my-3"
        >
          <template #empty>
            <l-table-empty/>
          </template>

          <template #cell(image)="data">
            <b-link
                :href="data.item.image"
                target="_blank"
            >
              <b-img
                  :src="data.item.image"
                  width="50"
                  height="50"
              />
            </b-link>
          </template>

          <template #cell(is_main)="data">
            <b-badge :variant="data.item.is_main === true ? 'success' : 'primary'">
              {{ data.item.is_main === true ? 'Principale' : 'Secondaire' }}
            </b-badge>
          </template>

          <template #cell(actions)="data">
            <b-button-group>
              <b-button
                  size="sm"
                  variant="outline-danger"
                  @click="supprimerImage(data.item)"
              >
                Supprimer
              </b-button>
            </b-button-group>
          </template>
        </b-table>
      </div>
      <!-- endregion -->
    </b-container>
  </div>
</template>

<script>
import ArticleModel from "@/models/article/article.model";
import TagModel from "@/models/article/tag.model";
import {Cropper} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import {dataURLtoFile} from "@/helpers/functions.helper";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {validationMixin} from "vuelidate";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import {commonMixin} from "@/mixins/common.mixin";
import {htmlTitle} from "@/utils/tools";
import LInputField from "@/components/LInputField";
import LTableDeleteModal from "@/components/Table/LTableDeleteModal";

export default {
  name: "VAArticleAddOrUpdate",
  components: {LTableDeleteModal, LInputField, Cropper},
  mixins: [validationMixin, validationMessageMixin, commonMixin],
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
  data() {
    return {
      icons: LemkaHelpers.FontAwesomeIcons,
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes,

      article: new ArticleModel(),
      imagesFields: ArticleModel.imagesFields,

      catalogueTouched: false,
      typeServiceTouched: false,

      submitStatus: null,

      preview: null,
      image: null,
      destination: null,

      formData: new FormData(),
    }
  },
  computed: {
    ...mapGetters({
      tags: "Tags/tags",
      loadingStatus: "Tags/loadingStatus",
      typeServices: 'TypeServices/typeServices',
      typeServiceLoadingStatus: "TypeServices/loadingStatus",
      catalogues: "Catalogues/catalogues",
      articles: "Articles/articles",
      cataloguesLoadingStatus: "Catalogues/loadingStatus"
    }),
    invalidCatalogue() {
      return this.catalogueTouched && this.article.catalogue.id === null
    },
    invalidTypeService() {
      return this.typeServiceTouched && this.article.type_service.id === null
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
      deleteArticle: "Articles/deleteArticle",
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
      if (this.typeServices.length === 0) {
        await this.loadTypeServices()
      }
      if (this.catalogues.length === 0) {
        await this.loadCatalogues()
      }
    },
    chargerArticle: async function () {
      this.toggleLoading()
      await this.initialisation()
      if (this.$route.params.slug !== undefined) {
        let article = await this.$store.getters["Articles/articleBySlug"](this.$route.params.slug)

        if (article !== undefined) {
          Object.assign(this.article, await article)
          this.$route.meta.value = this.article.titre
        } else {
          await this.$router.push({name: this.routes.ARTICLES.name})
        }
      } else {
        this.$route.meta.value = 'Ajout article'
      }
      this.toggleLoading()
    },
    updateSelectCatalogue: async function (query) {
      await this.loadCatalogues(query)
    },
    updateSelectTag: async function (query) {
      await this.loadTags(query)
    },
    addTag: function (newTag) {
      const tag = {
        id: null,
        nom: newTag.split(/\s/).join(''),
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
        let payload = this.$route.params.slug !== undefined ? this.article.toUpdatePayload() : this.article.toCreatePayload()
        if (this.this.$route.params.slug === undefined) {
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
    supprimerArticle: function (item) {
      this.deleteArticle(item).then(() => {
        this.$router.push({name: this.routes.ARTICLES.name})
      })
    },
    toucheTypeService: function () {
      this.typeServiceTouched = true
    },
    toucheCatalogue: function () {
      this.catalogueTouched = true
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
    addImage: function () {
      this.createImage([this.article.slug, this.formData])
      this.preview = null
      this.image = null
      this.destination = null
      this.formData = new FormData
      this.hideModal('image-modal')
    },
    supprimerImage: function (image) {
      this.deleteImage([this.article.slug, image])
    }
  },
  created() {
    this.chargerArticle()
  }
}
</script>