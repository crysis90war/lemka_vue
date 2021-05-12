<template>
  <div class="article_detail">
    <l-spinner v-if="isLoading"/>

    <div v-else class="my-5">
      <b-container>
        <b-row>
          <b-col
              lg="7"
              :class="mercerie.images.length > 0 ? '' : 'my-auto'"
          >
            <lightbox
                v-if="mercerie.images.length > 0"
                :items="getImagesUrl(mercerie.images)"
                :cells="3"
            />
            <div
                v-else
                class="text-center"
            >
              <p>Cet article n'a pas d'images</p>
            </div>
          </b-col>

          <b-col lg="5">
            <span class="text-muted">{{ article.created_at | localTimeStr }}</span>
            <h3>{{ article.titre }}</h3>
            <h5>{{ article.type_service.type_service }}</h5>
            <p style="white-space: pre-wrap">{{ article.description }}</p>
            <div class="d-flex justify-content-start">
              <b-badge
                  v-for="(tag, index) in article.tags"
                  :key="index"
                  pill
                  variant="secondary"
                  class="mr-1"
              >
                {{ tag.tag }}
              </b-badge>
            </div>
            <div v-if="currentUser" class="my-5">
              <b-button
                  size="sm"
                  variant="outline-danger"
                  @click="createOrDeleteLike(article.slug)"
              >
                <i :class="icons.HEART"></i> {{ article.likes_count }}
              </b-button>
            </div>
            <div v-else class="my-5">
              <span class="text-danger"><i :class="icons.HEART"></i> {{ article.likes_count }}</span>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import {commonMixin} from "@/mixins/common.mixin";
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import MercerieModel from "@/models/mercerie/mercerie.model";
import {htmlTitle} from "@/utils/tools";

export default {
  name: "VGMercerieDetail",
  mixins: [commonMixin],
  title() {
    return htmlTitle('Article')
  },
  props: {
    id: {
      required: true
    },
  },
  data() {
    return {
      icons: LemkaHelpers.FontAwesomeIcons,
      routes: LemkaHelpers.Routes,
      mercerie: new MercerieModel()
    }
  },
  computed: {
    ...mapGetters({merceries: "Merceries/globalMerceries"})
  },
  methods: {
    ...mapActions({loadMerceries: "Merceries/loadGlobalMerceries"})
  }
}
</script>

<style scoped>

</style>