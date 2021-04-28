<template>
  <div class="article_detail">
    <l-spinner v-if="isLoading"/>

    <div v-else>
      <b-row>
        <b-col lg="7" :class="article.images.length > 0 ? '' : 'my-auto'">
          <lightbox
              v-if="article.images.length > 0"
              :cells="3"
              :items="getImageUrl(article.images)"
          />
          <div
              v-else
              class="text-center"
          >
            <p>Pas d'images</p>
          </div>
        </b-col>

        <b-col lg="5">
          <span class="text-muted">{{ article.created_at | localTimeStr }}</span>
          <h3>{{ article.titre }}</h3>
          <h5>{{ article.type_service.type_service }}</h5>
          <p style="white-space: pre-wrap">{{ article.description }}</p>
          <span
              v-for="(tag, index) in article.tags"
              :key="index"
          >
            <b-badge
                pill
                variant="secondary"
                class="mr-1"
            >
              {{ tag.tag }}
            </b-badge>
          </span>
          <br>
          <br>
          <span class="text-danger"><i :class="icons.HEART"></i> {{ article.likes_count }}</span>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import ArticleModel from "@/models/article/article.model";
import LemkaHelpers from "@/helpers";
import {localTimeStr} from "@/utils/filters";
import {htmlTitle} from "@/utils/tools";
import {fonctions} from "@/mixins/functions.mixin";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VAArticleDetail",
  mixins: [fonctions],
  props: {
    slug: {
      type: String,
      required: true
    },
  },
  title() {
    return htmlTitle()
  },
  data() {
    return {
      article: new ArticleModel(),
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass,
      icons: LemkaHelpers.FontAwesomeIcons,
    }
  },

  computed: {
    ...mapGetters({articles: 'Articles/articles'}),
    thisRoute() {
      return this.$route.name
    }
  },

  methods: {
    ...mapActions({loadArticles: "Articles/loadArticles"}),
    initialisation: async function () {
      if (this.articles.length === 0) {
        await this.loadArticles()
      }
    },
    chargerArticle: async function () {
      this.toggleLoading()
      await this.initialisation()
      let article = await this.$store.getters["Articles/articleBySlug"](this.$route.params.slug)
      if (article !== undefined) {
        Object.assign(this.article, await this.$store.getters["Articles/articleBySlug"](this.$route.params.slug))
        this.$route.meta.value = this.article.titre
        this.toggleLoading()
      } else {
        this.toggleLoading()
        await this.$router.push({name: this.routes.ARTICLES.name})
      }
    },
    getImageUrl: function (images) {
      let urls = []
      images.forEach(item => {
        urls.push(item.image)
      })
      return urls
    }
  },

  filters: {
    localTimeStr: function (value) {
      value = localTimeStr(value)
      return value
    }
  },

  created() {
    this.chargerArticle()
  },
}
</script>

<style scoped>

</style>