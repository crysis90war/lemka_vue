<template>
  <div class="genres">
    <div v-if="$route.name === routes.PARAMETRES_GENRE.name">

      <l-table-view
          :table-busy="busy"
          :table-datas="genres"
          :table-fields="fields"
          :load-data="loadGenres"
          :create-route-to-name="routes.PARAMETRES_GENRE_ADD_OR_UPDATE.name"
      >
        <template #cell(actions)="data">
          <l-table-button-update-delete
              :update-route-to-name="routes.PARAMETRES_GENRE_ADD_OR_UPDATE.name"
              :item-id="data.item.id"
              @clickShowModal="showModal('delete-modal-' + data.item.id)"
          />

          <l-table-delete-modal
              :modal-id="data.item.id"
              :modal-title="data.item.genre"
              :modal-text="data.item.genre"
              @clickHideModal="hideModal('delete-modal-'+data.item.id)"
              @clickDelete="supprimerGenre(data.item)"
          />
        </template>
      </l-table-view>
    </div>

    <router-view v-else></router-view>
  </div>

</template>

<script>
import LemkaHelpers from "@/helpers";
import {mapActions, mapGetters} from "vuex";
import LTableView from "@/components/Table/LTableView";
import {commonMixin} from "@/mixins/common.mixin";
import LTableButtonUpdateDelete from "@/components/Table/LTableButtonUpdateDelete";
import LTableDeleteModal from "@/components/Table/LTableDeleteModal";
import GenreModel from "@/models/user/genre.model";

export default {
  name: "VAGenres",
  components: {LTableDeleteModal, LTableButtonUpdateDelete, LTableView},
  mixins: [commonMixin],
  data() {
    return {
      fields: GenreModel.tableFields,
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass
    }
  },
  computed: {
    ...mapGetters({genres: 'Genres/genres', busy: 'Genres/loadingStatus'})
  },
  methods: {
    ...mapActions({deleteGenre: 'Genres/deleteGenre', loadGenres: "Genres/loadGenres"}),
    initialisation: async function() {
      if (this.genres.length === 0) {
        await this.loadGenres()
      }
    },
    supprimerGenre: function(item) {
      this.deleteGenre(item)
      this.hideModal('delete-modal-' + item.id)
    }
  },
  created() {
    this.initialisation()
  }
}
</script>

<style scoped>

</style>