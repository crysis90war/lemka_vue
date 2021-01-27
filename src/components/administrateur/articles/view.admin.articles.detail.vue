<template>
  <b-card>
    <template title>
      <div class="d-flex justify-start">
        <b-button-group>
          <b-button variant="light" :to="{name: AdminRouteName.ARTICLES.name}">
            <i class="fas fa-arrow-left"></i>
          </b-button>

          <b-button variant="primary" :to="{name: AdminRouteName.ARTICLES_UPDATE.name, params: {slug: article.slug}}">
            Modifier
          </b-button>

          <b-button variant="danger">
            Supprimer
          </b-button>
        </b-button-group>
      </div>
    </template>
    <b-card-body>
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
<!--        <pre>{{ JSON.stringify(article, null, '\t') }}</pre>-->

    </b-card-body>
  </b-card>
</template>

<script>
import {AdminRouteName} from "@/helpers/enums.helper";
import AdminApiService from "@/services/administrateur";
import ArticleModel from "@/models/article.model";
import TypeServiceModel from "@/models/typeService.model";
import CatalogueModel from "@/models/catalogue.model";
import RayonModel from "@/models/rayon.model";
import SectionModel from "@/models/section.model";
import TypeProduitModel from "@/models/typeProduit.model";
import TagModel from "@/models/tag.model";

export default {
  name: "view.admin.articles.detail",
  props: {
    slug: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      AdminRouteName,
      article: new ArticleModel(),
      images: []
    }
  },

  methods: {
    async chargerArticle() {
      let article = new ArticleModel()
      let typeService = new TypeServiceModel()
      let catalogue = new CatalogueModel()
      let rayon = new RayonModel()
      let section = new SectionModel()
      let typeProduit = new TypeProduitModel()
      let tags = []

      await AdminApiService.ArticleService.getArticleDetail(this.slug).then(response => {
        article = response.data
      })
      await AdminApiService.TypeServiceService.getTypeServiceDetail(article.ref_type_service).then(response => {
        typeService = response.data
      })
      await AdminApiService.CatalogueService.getCatalogueDetail(article.ref_catalogue).then(response => {
        catalogue = response.data
      })
      await AdminApiService.RayonService.getRayonDetail(catalogue.ref_rayon).then(response => {
        rayon = response.data
      })
      await AdminApiService.SectionService.getSectionDetail(catalogue.ref_section).then(response => {
        section = response.data
      })
      await AdminApiService.TypeProduitService.getTypeProduitDetail(catalogue.ref_type_produit).then(response => {
        typeProduit = response.data
      })
      for (let i = 0; i < article.ref_tag.length; i++) {
        let tag = new TagModel()
        await AdminApiService.TagService.getTagDetail(article.ref_tag[i]).then(response => {
          tag = response.data
          tags.push(tag)
        })
      }
      await AdminApiService.ArticleService.getArticleImagesList(article.slug).then(response => {
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
    },


  },

  created() {
    this.chargerArticle()
  },

  mounted() {

  }
}
</script>