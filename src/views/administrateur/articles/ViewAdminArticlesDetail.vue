<template>
  <b-card>
    <b-card-body>
      <div v-if="loading === true" class="loading">
        <b-spinner type="grow" label="Loading..." variant="secondary"></b-spinner>
      </div>

      <b-card v-else :class="bootstrap.shadow">
        <b-row>
          <b-col lg="7" :class="images.length > 0 ? '' : 'my-auto'">
            <lightbox v-if="images.length > 0" :cells="2" :items="images"></lightbox>
            <div v-else class="text-center">
              <p>Pas d'images</p>
            </div>
          </b-col>
          <b-col lg="5">
            <span class="text-muted">{{ article.created_at }}</span>
            <h3>{{ article.titre }}</h3>
            <h5>{{ article.ref_type_service.type_service }}</h5>
            <p>{{ article.description }}</p>
            <span v-for="(tag, index) in article.ref_tag" :key="index">
              <b-badge pill variant="secondary" class="mr-1">{{tag.tag}}</b-badge>
            </span>
            <br>
            <br>
            <span class="text-danger">
              <i :class="icons.heart"></i>
              {{article.likes_count}}
            </span>

            <div class="pull-bottom mt-5">
              <b-button-group class="d-flex justify-content-center">
                <b-button variant="outline-primary" :to="{name: links.articleUpdateLink, params: {slug: article.slug}}">
                  Modifier
                </b-button>
                <b-button variant="outline-warning">
                  Désactiver
                </b-button>
                <b-button variant="outline-danger">
                  Supprimer
                </b-button>
              </b-button-group>
            </div>
          </b-col>
        </b-row>
      </b-card>

    </b-card-body>
  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import ArticleModel from "@/models/article.model";
import TypeServiceModel from "@/models/typeService.model";
import CatalogueModel from "@/models/catalogue.model";
import RayonModel from "@/models/rayon.model";
import SectionModel from "@/models/section.model";
import TypeProduitModel from "@/models/typeProduit.model";
import TagModel from "@/models/tag.model";
import ApiService from "@/services";

export default {
  name: "ViewAdminArticlesDetail",
  props: {
    slug: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      loading: false,
      article: new ArticleModel(),
      images: [],
      articleObject: new ArticleModel(),
      error: null,
      links: {
        articlesLink: LemkaEnums.Routes.ARTICLES.name,
        articleUpdateLink: LemkaEnums.Routes.ARTICLES_UPDATE.name
      },
      bootstrap: {
        shadow: LemkaEnums.BSClass.CARD_BORDERLESS_SHADOW,
      },
      icons: {
        heart: LemkaEnums.FontAwesomeIcons.HEART
      }
    }
  },

  computed: {
    thisRoute() {
      return this.$route.name
    }
  },

  methods: {
    async chargerArticle() {
      try {
        this.loading = true

        let article = {}
        let typeService = {}
        let catalogue = {}
        let rayon = {}
        let section = {}
        let typeProduit = {}
        let tags = []

        article = await ArticleModel.getArticleDetail(this.slug)

        if (article.ref_type_service !== null && article.ref_type_service !== undefined) {
          typeService = await TypeServiceModel.getTypeServiceDetail(article.ref_type_service)
          article.ref_type_service = typeService
        }

        if (article.ref_catalogue !== null && article.ref_catalogue !== undefined) {
          catalogue = await CatalogueModel.getCatalogueDetail(article.ref_catalogue)
          if (catalogue.ref_rayon !== null && catalogue.ref_rayon !== undefined) {
            rayon = await RayonModel.getRayonDetail(catalogue.ref_rayon)
            catalogue.ref_rayon = rayon
          }
          if (catalogue.ref_section !== null && catalogue.ref_section !== undefined) {
            section = await SectionModel.getSectionDetail(catalogue.ref_section)
            catalogue.ref_section = section
          }
          if (catalogue.ref_type_produit !== null && catalogue.ref_type_produit !== undefined) {
            typeProduit = await TypeProduitModel.getTypeProduitDetail(catalogue.ref_type_produit)
            catalogue.ref_type_produit = typeProduit
          }
          article.ref_catalogue = catalogue
        }

        if (article.ref_tag.length > 0) {
          for (const item of article.ref_tag) {
            let tag = {}
            tag = await TagModel.getTagDetail(item)
            tags.push(tag)
          }
          article.ref_tag = tags
        }

        Object.assign(this.article, article)

        await ApiService.ArticleService.getArticleImagesList(article.slug).then(response => {
          response.data.forEach(image => {
            this.images.push(image.image)
          })
        })

      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    }
  },

  created() {
    this.chargerArticle()
  },

  mounted() {

  }
}
</script>

<style scoped>

</style>