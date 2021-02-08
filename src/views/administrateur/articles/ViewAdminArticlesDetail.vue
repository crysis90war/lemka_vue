<template>
  <b-card>
    <template title>
      <div class="d-flex justify-start">
        <b-button variant="light" :to="{name: links.articlesLink}">
          <i class="fas fa-arrow-left"></i>
        </b-button>
        <h3 class="ml-3">{{article.titre}}</h3>
      </div>
    </template>

    <b-card-body v-if="article">

      <div v-if="loading" class="loading">
        <b-spinner type="grow" label="Loading..." variant="secondary"></b-spinner>
      </div>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <div v-if="article">
        <b-button-group>
          <b-button variant="primary" :to="{name: links.articleUpdateLink, params: {slug: article.slug}}">
            Modifier
          </b-button>
          <b-button variant="danger">
            Supprimer
          </b-button>
        </b-button-group>

        <b-row>
          <b-col lg="5">
            <lightbox css="h-200 h-lg-250" :items="images" :cells="3"></lightbox>
          </b-col>
          <b-col lg="7">
            <span class="text-muted">{{ article.created_at }}</span>
            <h3>{{ article.titre }}</h3>
            <h5>{{ article.ref_type_service.type_service }}</h5>
            <p>{{ article.description }}</p>
            <span v-for="(tag, index) in article.ref_tag" :key="index">
              <b-badge pill variant="secondary" class="mr-1">{{tag.tag}}</b-badge>
            </span>
          </b-col>
        </b-row>
        <pre>{{article}}</pre>
      </div>

    </b-card-body>
  </b-card>
</template>

<script>
import ApiService from "@/services";
import {LemkaEnums} from "@/helpers/enums.helper";

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
      error: null,
      links: {
        articlesLink: LemkaEnums.Routes.ARTICLES.name,
        articleUpdateLink: LemkaEnums.Routes.ARTICLES_UPDATE.name
      },
      article: null,
      images: []
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

        await ApiService.ArticleService.getArticleDetail(this.slug).then(response => {
          article = response.data
        })

        typeService = await this.fetchTypeService(article.ref_type_service)

        catalogue = await this.fetchCatalogue(article.ref_catalogue)

        rayon = await this.fetchRayon(catalogue.ref_rayon)

        section = await this.fetchSection(catalogue.ref_section)

        typeProduit = await this.fetchTypeProduit(catalogue.ref_type_produit)

        for (let i = 0; i < article.ref_tag.length; i++) {
          let tag = {}
          tag = await this.fetchTag(article.ref_tag[i])
          tags.push(tag)
        }
        await ApiService.ArticleService.getArticleImagesList(article.slug).then(response => {
          response.data.forEach(image => {
            this.images.push(image.image)
          })
        })
        article.ref_type_service = typeService
        article.ref_catalogue = catalogue
        article.ref_catalogue.ref_rayon = rayon
        article.ref_catalogue.ref_section = section
        article.ref_catalogue.ref_type_produit = typeProduit
        article.ref_tag = tags
        this.article = article

      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async fetchTypeService(typeServiceId) {
      let typeService = {}
      await ApiService.TypeServiceService.getTypeServiceDetail(typeServiceId).then(response => {
        typeService = response.data
      })
      return typeService
    },

    async fetchCatalogue(catalogueId) {
      let catalogue = {}

      await ApiService.CatalogueService.getCatalogueDetail(catalogueId).then(response => {
        catalogue = response.data
      })

      return catalogue
    },

    async fetchRayon(rayonId) {
      let rayon = {}
      await ApiService.RayonService.getRayonDetail(rayonId).then(response => {
        rayon = response.data
      })
      return rayon
    },

    async fetchSection(sectionId) {
      let section = {}
      await ApiService.SectionService.getSectionDetail(sectionId).then(response => {
        section = response.data
      })
      return section
    },

    async fetchTypeProduit(typeProduitId) {
      let typeProduit = {}
      await ApiService.TypeProduitService.getTypeProduitDetail(typeProduitId).then(response => {
        typeProduit = response.data
      })
      return typeProduit
    },

    async fetchTag(tagId) {
      let tag = {}
      await ApiService.TagService.getTagDetail(tagId).then(response => {
        tag = response.data
      })
      return tag
    }

  },

  created() {
    this.chargerArticle()
  },

  mounted() {

  }
}
</script>