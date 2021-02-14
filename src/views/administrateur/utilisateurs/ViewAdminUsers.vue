<template>
  <b-card v-if="$route.name === links.usersLink">
    <b-card-body>
      <div v-if="items">
        <!-- User Interface controls -->
        <b-row>
          <b-col lg="6" class="my-1">
            <b-form-group label="Filtrer"
                          label-for="filter-input"
                          label-cols-sm="3"
                          label-align-sm="right"
                          label-size="sm"
                          class="mb-0">
              <b-input-group size="sm">
                <b-form-input id="filter-input"
                              v-model="filter"
                              type="search"
                              placeholder="Écrire pour chercher">
                </b-form-input>

                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">Supprimer</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group label="Trier"
                          label-for="sort-by-select"
                          label-cols-sm="3"
                          label-align-sm="right"
                          label-size="sm"
                          class="mb-0"
                          v-slot="{ ariaDescribedby }">
              <b-input-group size="sm">
                <b-form-select id="sort-by-select"
                               v-model="sortBy"
                               :options="sortOptions"
                               :aria-describedby="ariaDescribedby"
                               class="w-75">
                  <template #first>
                    <option value="">-- vide --</option>
                  </template>
                </b-form-select>

                <b-form-select v-model="sortDesc"
                               :disabled="!sortBy"
                               :aria-describedby="ariaDescribedby"
                               size="sm"
                               class="w-25">
                  <option :value="false">Asc</option>
                  <option :value="true">Desc</option>
                </b-form-select>
              </b-input-group>
            </b-form-group>

          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group v-model="sortDirection"
                          label="Filtrer sur"
                          description="Laissez tout décoché pour filtrer sur toutes les données"
                          label-cols-sm="3"
                          label-align-sm="right"
                          label-size="sm"
                          class="mb-0"
                          v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group v-model="filterOn"
                                     :aria-describedby="ariaDescribedby"
                                     class="mt-1">
                <b-form-checkbox value="username">Username</b-form-checkbox>
                <b-form-checkbox value="email">Email</b-form-checkbox>
                <b-form-checkbox value="is_active">Active</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group label="Par page"
                          label-for="per-page-select"
                          label-cols-sm="6"
                          label-cols-md="4"
                          label-cols-lg="3"
                          label-align-sm="right"
                          label-size="sm"
                          class="mb-0">
              <b-form-select
                  id="per-page-select"
                  v-model="perPage"
                  :options="pageOptions"
                  size="sm"
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col sm="5" md="6" class="my-1">

          </b-col>

          <b-col sm="7" md="6" class="my-1">
            <b-pagination v-model="currentPage"
                          :total-rows="totalRows"
                          :per-page="perPage"
                          align="fill"
                          size="sm"
                          class="my-0">
            </b-pagination>
          </b-col>
        </b-row>

        <b-table :items="items"
                 :fields="fields"
                 :current-page="currentPage"
                 :per-page="perPage"
                 :filter="filter"
                 :filter-included-fields="filterOn"
                 :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 :sort-direction="sortDirection"
                 stacked="md"
                 show-empty
                 small
                 @filtered="onFiltered">
          <template #cell(image)="data">
            <b-avatar variant="info" :src="data.item.image"></b-avatar>
          </template>
          <template #cell(username)="data">
            <b-link :to="{name: links.userDetailLink, params: {username: data.item.username}}">
              {{ data.item.username }}
            </b-link>
          </template>

          <template #cell(is_staff)="data">
            <b-badge v-if="data.item.is_staff === true" pill variant="success">Administrateur</b-badge>
            <b-badge v-else pill variant="primary">Utilisateur</b-badge>
          </template>

          <template #cell(actions)="data">
            <b-button v-if="data.item.is_active === true" size="sm" @click="alert(data.item.username)" class="mr-1" variant="outline-danger">
              Desactiver
            </b-button>
            <b-button v-else size="sm" @click="alert(data.item.username)" variant="outline-success">
              Activer
            </b-button>
          </template>
        </b-table>

      </div>
    </b-card-body>
  </b-card>

  <router-view v-else></router-view>
</template>

<script>
import ApiService from '@/services';
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewAdminUsers",
  data() {
    return {
      links: {
        usersLink: LemkaEnums.Routes.UTILISATEURS.name,
        userDetailLink: LemkaEnums.Routes.UTILISATEURS_DETAIL.name
      },
      items: [],
      fields: [
        {key: 'image', label: 'Image', sortable: false},
        {key: 'username', label: 'Username', sortable: true, sortDirection: 'desc'},
        {key: 'first_name', label: 'Prénom', sortable: true, sortDirection: 'desc'},
        {key: 'last_name', label: 'Nom', sortable: true, sortDirection: 'desc'},
        {key: 'email', label: 'Email', sortable: true, sortDirection: 'desc'},
        {
          key: 'is_active', label: 'Active',
          // eslint-disable-next-line no-unused-vars
          formatter: (value, key, item) => {
            return value ? 'Oui' : 'Non'
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          key: 'is_staff',
          label: 'Admin',
          sortable: true
        },
        {key: 'actions', label: 'Actions'}
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 15, 20, {value: 100, text: "Show a lot"}],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return {text: f.label, value: f.key}
          })
    }
  },
  created() {
    this.chargerUtilisateurs();
  },
  methods: {
    async chargerUtilisateurs() {
      await ApiService.UtilisateurService.getUtilisateurList().then(response => {
        this.items = response.data
        this.totalRows = this.items.length
      })
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    alert(item) {
      alert(item)
    }
  }
}
</script>

<style scoped>

</style>