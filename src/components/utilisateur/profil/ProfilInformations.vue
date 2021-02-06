<template>
  <b-card no-body>
    <b-card-body>
      <div class="d-flex justify-content-between mb-3 float-right">
        <b-button v-if="editInfo !== true" variant="outline-primary" size="sm" v-on:click="annulerEdit">
          Editer informations
        </b-button>
        <b-button v-else variant="outline-danger" size="sm" @click="annulerEdit">Annuler</b-button>
      </div>

      <div class="d-flex align-items-center my-3 mx-auto">
        <b-avatar :src="userProfil.image" variant="info" class="mr-3" size="3rem"></b-avatar>
        <span class="mr-auto text-muted">@{{ userProfil.username }}</span>
      </div>

      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <table class="table table-striped">
            <tbody>

            <!-- region Role -->
            <tr>
              <th scope="row">Role</th>
              <td>
                <b-badge class="align-self-center" variant="info" v-if="userProfil.is_staff !== true">
                  Utilisateur
                </b-badge>
                <b-badge variant="info" v-else>Administrateur</b-badge>
              </td>
            </tr>
            <!-- endregion -->

            <!-- region Email -->
            <tr>
              <th scope="row">Email</th>
              <td>{{ userProfil.email }}</td>
            </tr>
            <!-- endregion -->

            <!-- region Pseudo -->
            <tr>
              <th scope="row">Pseudo</th>
              <td v-if="editInfo !== true">{{ userProfil.username }}</td>
              <td v-else>
                <ValidationProvider name="pseudo" ref="pseudo" rules="required|alpha_num|min:6|max:50"
                                    v-slot="{ errors }">
                  <b-input v-model="userProfil.username" placeholder="Votre pseudo d'affichage"></b-input>
                  <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                </ValidationProvider>
              </td>
            </tr>
            <!-- endregion -->

            <!-- region Nom complet ou Prénom -->
            <tr>
              <th scope="row" v-if="editInfo">Prénom</th>
              <th scope="row" v-else>Nom complet</th>

              <td v-if="editInfo !== true">{{ userProfil.first_name }} {{ userProfil.last_name }}</td>
              <td v-else>
                <ValidationProvider name="prenom" ref="prenom" rules="alpha|max:50" v-slot="{ errors }">
                  <b-input v-model="userProfil.first_name" placeholder="Ajoutez votre prénom ..."
                           class="mb-2"></b-input>
                  <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                </ValidationProvider>
              </td>
            </tr>
            <!-- endregion -->

            <!-- region Nom -->
            <tr v-if="editInfo">
              <th>Nom</th>
              <td>
                <ValidationProvider name="nom" ref="nom" rules="alpha|max:50" v-slot="{ errors }">
                  <b-input v-model="userProfil.last_name" placeholder="Ajoutez votre nom ..."></b-input>
                  <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                </ValidationProvider>
              </td>
            </tr>
            <!-- endregion -->

            <!-- region Numero GSM -->
            <tr>
              <th scope="row">Tel</th>
              <td v-if="editInfo !== true">{{ userProfil.numero_tel }}</td>
              <td v-else>
                <ValidationProvider name="numero" ref="numero" rules="numeric" v-slot="{ errors }">
                  <b-input v-model="userProfil.numero_tel" placeholder="exemple: 0032471012345 ou 0471012345"></b-input>
                  <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                </ValidationProvider>
              </td>
            </tr>
            <!-- endregion -->

            <!-- region Genre -->
            <tr>
              <th scope="row">Genre</th>
              <td v-if="editInfo !== true">{{ userGenre(userProfil.ref_genre) }}</td>
              <td v-else>
                <ValidationProvider name="genre" ref="genre" rules="excluded:0" v-slot="{ errors }">
                  <b-form-select v-model="userProfil.ref_genre" :options="options" class="mb-3">
                    <template #first>
                      <b-form-select-option :value="null" disabled>
                        -- Veuillez selectionner votre genre --
                      </b-form-select-option>
                    </template>
                  </b-form-select>
                  <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                </ValidationProvider>
              </td>
            </tr>
            <!-- endregion -->

            <tr v-if="editInfo === true">
              <td>{{ message }}</td>
              <td>
                <b-button type="submit" variant="outline-success" class="float-right" :disabled="loading">
                  <b-spinner v-show="loading" variant="success"></b-spinner>
                  <span>Modifier</span>
                </b-button>
              </td>
            </tr>
            </tbody>
          </table>
        </b-form>
      </ValidationObserver>
    </b-card-body>
  </b-card>
</template>

<script>
import UtilisateurPutService from "@/services/utilisateur.put.service"
import UtilisateurGetService from "@/services/utilisateur.get.service"

export default {
  name: "ProfilInformations",

  props: {
    currentUser: {}
  },

  data() {
    return {
      userProfil: {},
      editInfo: false,
      loading: false,
      imageUpload: null,
      selected: null,
      message: '',
      options: [
        {value: Number, text: String},
      ],
    }
  },

  created() {
    if (this.currentUser) {
      this.chargerUserProfil()
    }
  },

  methods: {

    annulerEdit() {
      this.chargerUserProfil()
      this.editInfo = !this.editInfo
    },

    userGenre(ref_genre) {
      if (this.options && this.userProfil.ref_genre) {
        let genres = this.options;
        for (let i = 0; i < genres.length; i++) {
          if (genres[i].value === ref_genre) {
            return genres[i].text
          }
        }
      }
    },

    chargerGenres() {
      UtilisateurGetService.getUserGenres().then(response => {
        let tableauGenres = []
        for (let i = 0; i < response.data.length; i++) {
          let objetGenre = {id: Number, genre: String}
          let autre = {}
          objetGenre = response.data[i]
          autre.value = objetGenre.id
          autre.text = objetGenre.genre
          tableauGenres.push(autre)
        }
        this.options = tableauGenres
        this.selected = this.userProfil.ref_genre
      })
    },

    chargerUserProfil() {
      try {
        if (this.currentUser) {
          UtilisateurGetService.getUserProfil().then(response => {
            this.userProfil = response.data
          })
          this.chargerGenres()
        }
      } catch (error) {
        console.log(error)
      }
    },

    onSubmit() {
      this.loading = true;
      UtilisateurPutService.updateUserInformations(this.userProfil).then(response => {
        this.loading = false;
        this.message = response.status
        this.editInfo = false
      })
    },
  }
}
</script>

<style scoped>

</style>