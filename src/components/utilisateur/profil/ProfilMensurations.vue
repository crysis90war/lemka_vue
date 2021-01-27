<template>
  <b-card no-body>
    <b-card-body>
      <div class="d-flex justify-content-between mb-3">
        <h5>Mes mensurations</h5>

        <!-- region Ajout d'une nouvelle mensuration -->
        <b-button :disabled="listUserMensuration.length >= 5"
                  :variant="listUserMensuration.length >= 5 && currentUser ? 'secondary' : 'outline-success' "
                  @click="monModal(modalCreateUserMensuration)">
          Ajouter mensuration
        </b-button>

        <b-modal :id="modalCreateUserMensuration" hide-footer title="Créer une mensuration">
          <b-container>
            <ValidationObserver ref="is_main" v-slot="{ handleSubmit }">
              <b-form @submit.prevent="handleSubmit(ajouterMensuration)">
                <!-- region Is_main -->
                <ValidationProvider name="principale" v-slot="{ errors }">
                  <b-form-checkbox v-model="createUserMensuration.is_main" name="check-button" switch>
                    <p v-if="createUserMensuration.is_main">Principale</p>
                    <p v-else>Secondaire</p>
                  </b-form-checkbox>
                  <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                </ValidationProvider>
                <!-- endregion -->

                <!-- region Nom -->
                <ValidationProvider name="titre" ref="titre" rules="required|alpha_spaces|min:3|max:100" v-slot="{ errors }">
                  <b-input-group prepend="Titre" class="mt-3">
                    <b-input v-model="createUserMensuration.titre" required placeholder="Veuillez encoder le titre"></b-input>
                  </b-input-group>
                  <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                </ValidationProvider>
                <!-- endregion -->

                <b-button-group class="mt-3 float-right">
                  <b-button variant="outline-danger" type="button" @click="monModal(modalCreateUserMensuration, false)">Annuler</b-button>
                  <b-button type="submit" variant="outline-success">Créer</b-button>
                </b-button-group>
              </b-form>
            </ValidationObserver>
          </b-container>
        </b-modal>
        <!-- endregion -->
      </div>

      <!-- region Tableau mensurations -->
      <table class="table" v-if="listUserMensuration.length > 0">
        <thead>
        <tr>
          <th>#</th>
          <th>Titre</th>
          <th class="text-center">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="userMensuration in listUserMensuration" :key="userMensuration.id">
          <td>
            <p v-if="userMensuration.is_main === true"><b-badge pill variant="primary">Principale</b-badge></p>
            <p v-else><b-badge pill variant="secondary">Secondaire</b-badge></p>
          </td>
          <td>{{ userMensuration.titre }}</td>
          <td class="d-flex justify-content-around">
            <b-button-group>
              <!-- region Bouton pour afficher les mensuration avec modal -->
              <b-button @click="afficherMensuration(userMensuration.id)" variant="outline-info" size="md"><i class="far fa-eye"></i></b-button>

              <b-modal :id="modalGetUserMensuration + userMensuration.id" scrollable hide-footer>
                <template v-slot:modal-title>
                  <div class="mb-3">
                    <span v-if="getUserMensuration.is_main === true"><b-badge pill variant="primary">Principale</b-badge></span>
                    <span v-else><b-badge pill variant="secondary">Secondaire</b-badge></span>
                    <span class="ml-2">{{ getUserMensuration.titre }}</span>
                  </div>
                </template>

                <b-container>
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th scope="col">Nom</th>
                      <th scope="col">Mesure</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="mesure in getUserMensuration.mensurations" :key="mesure.id">
                      <th scope="row">{{ mesure.ref_mensuration }}</th>
                      <td>{{ mesure.mesure }} cm</td>
                    </tr>
                    </tbody>
                  </table>
                </b-container>
              </b-modal>
              <!-- endregion -->

              <!-- region Bouton pour update les mensuration avec modal -->
              <b-button @click="updateMensuration(userMensuration.id)" variant="outline-primary" size="md"><i class="fas fa-edit"></i></b-button>

              <b-modal :id="modalUpdateUserMensuration + userMensuration.id" scrollable hide-footer size="xl">
                <template v-slot:modal-title>
                  <p>Modification de '{{ updateUserMensuration.titre }}'</p>
                </template>
                <b-container>
                  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                    <b-form @submit.prevent="handleSubmit(onUpdate)">

                      <div class="mb-3">

                        <b-form-checkbox v-model="updateUserMensuration.is_main" name="check-button" switch>
                          <p v-if="updateUserMensuration.is_main">Principale</p>
                          <p v-else>Secondaire</p>
                        </b-form-checkbox>
                        <ValidationProvider name="titre" ref="titre" rules="required|alpha_spaces|min:3|max:100" v-slot="{ errors }">
                          <b-input-group prepend="Titre" class="mt-3">
                            <b-form-input v-model="updateUserMensuration.titre"></b-form-input>
                          </b-input-group>
                          <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                        </ValidationProvider>
                      </div>

                      <table class="table table-striped">
                        <thead>
                        <tr>
                          <th scope="col">Nom</th>
                          <th scope="col">Mesure</th>
                          <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="mesure in updateUserMensuration.mensurations" :key="mesure.id">
                          <th scope="row">{{ mesure.ref_mensuration }}</th>
                          <td>{{ mesure.mesure }} cm</td>
                          <td>
                            <b-form-input id="range-1" v-model="mesure.mesure" type="range" min="0" max="260" step="0.5"></b-form-input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="3" class="bg-white">
                            <b-button type="submit" variant="outline-primary" class="float-right" :disabled="updating">
                              <b-spinner v-show="updating" small variant="primary" class="mr-2"></b-spinner>
                              <span>Modifier</span>
                            </b-button>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </b-form>
                  </ValidationObserver>
                </b-container>
              </b-modal>
              <!-- endregion -->

              <!-- region Bouton pour supprimer la mensuration avec modal -->
              <b-button variant="outline-danger" size="md" @click="monModal(modalDeleteUserMensuration + userMensuration.id)">
                <i class="fas fa-trash-alt"></i>
              </b-button>
              <b-modal :id="modalDeleteUserMensuration + userMensuration.id" hide-footer title="Suppresion">
                <p>Êtes-vous sûr de vouloir supprimer la mensuration suivante ?</p>
                <h4 class="text-center my-3 overflow-auto">{{ userMensuration.titre }}</h4>
                <b-button-group class="w-100">
                  <b-button variant="outline-secondary" @click="monModal(modalDeleteUserMensuration + userMensuration.id, false)">Annuler</b-button>
                  <b-button variant="outline-danger" @click="supprimerMensuration(userMensuration)">Supprimer</b-button>
                </b-button-group>
              </b-modal>
              <!-- endregion -->
            </b-button-group>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- endregion -->

      <!-- region Message données vide -->
      <div class="text-center" v-else>
        <p>Aucune mensuration enregistrée</p>
        <p>Veuillez cliquer sur ajouter une nouvelle mensuration</p>
      </div>
      <!-- endregion -->

    </b-card-body>

  </b-card>
</template>

<script>
import Outils from "@/mixins/outils.mixin";
import METHODS from "@/mixins/methods.mixin";
import UtilisateurGetService from "@/services/utilisateur/utilisateur.get.service";
import UtilisateurPostService from "@/services/utilisateur/utilisateur.post.service";
import UtilisateurPutService from "@/services/utilisateur/utilisateur.put.service";
import UtilisateurDeleteService from "@/services/utilisateur/utilisateur.delete.service";
import UserMensuration from "@/models/user_mensuration.model";
import MensurationUserMensuration from "@/models/mensuration_user_mensuration.model";

export default {
  name: "ProfilMensurations",

  props: {
    currentUser: {}
  },

  data() {
    return {
      modalCreateUserMensuration: 'modal-ajouter-mensuration',
      modalGetUserMensuration: 'modal-afficher-mensuration',
      modalUpdateUserMensuration: 'modal-update-mensuration',
      modalDeleteUserMensuration: 'modal-supprimer-mensuration',

      listUserMensuration: [],
      getUserMensuration: new UserMensuration(),
      createUserMensuration: new UserMensuration(),
      updateUserMensuration: new UserMensuration(),

      updating: false
    }
  },

  created() {
    if (this.currentUser) {
      this.chargerMensurations()
    }
  },

  methods: {

    /* region Fonctions liées a mensurations*/

    chargerMensurations() {
      UtilisateurGetService.getUserListMensurations().then(response => {
        let mensurations = []
        for (let i = 0; i < response.data.length; i++) {
          let mensuration = new UserMensuration(response.data[i].id, response.data[i].titre, response.data[i].is_main)
          mensurations.push(mensuration)
        }
        this.listUserMensuration = mensurations
      })
    },

    ajouterMensuration() {
      try {
        UtilisateurPostService.postUserMensuration(this.createUserMensuration).then(() => {
          this.monModal(this.modalCreateUserMensuration, false)
          this.chargerMensurations()
          Outils.makeToast(this, 'success', 'Mensuration ajoutée avec succès', 'Ajout')
          this.createUserMensuration = new UserMensuration()
        }).catch(err => {
          Outils.makeToast(this,'danger', err, 'Erreur')
        })
      }
      catch (err) {
        Outils.makeToast(this, 'danger', err, 'Ajout')
      }
    },

    afficherMensuration(item_id) {
      try {
        let mensurations = []
        UtilisateurGetService.getMensurationUserMensuration(item_id).then(response => {
          for (let i = 0; i < response.data.length; i ++) {
            let objetMensuration = new MensurationUserMensuration()
            objetMensuration.id = response.data[i].id
            objetMensuration.mesure = response.data[i].mesure
            objetMensuration.ref_mensuration = response.data[i].ref_mensuration
            mensurations.push(objetMensuration)
          }
        })
        UtilisateurGetService.getUserMensuration(item_id).then(response => {
          this.getUserMensuration = new UserMensuration(response.data.id, response.data.titre, response.data.is_main, mensurations)
          this.monModal(this.modalGetUserMensuration + item_id)
        })
      }
      catch (err) {
        Outils.makeToast(this, 'danger', err, 'Chargement')
      }
    },

    updateMensuration(item_id) {
      try {
        let mensurations = []
        UtilisateurGetService.getMensurationUserMensuration(item_id).then(response => {
          for (let i = 0; i < response.data.length; i ++) {
            let objetMensuration = new MensurationUserMensuration()
            objetMensuration.id = response.data[i].id
            objetMensuration.mesure = response.data[i].mesure
            objetMensuration.ref_mensuration = response.data[i].ref_mensuration
            mensurations.push(objetMensuration)
          }
        })
        UtilisateurGetService.getUserMensuration(item_id).then(response => {
          this.updateUserMensuration = new UserMensuration(response.data.id, response.data.titre, response.data.is_main, mensurations)
          this.monModal(this.modalUpdateUserMensuration + item_id)
        })
      }
      catch (err) {
        Outils.makeToast(this, 'danger', err, 'Mise à jour')
      }
    },

    onUpdate() {
      if (this.updateUserMensuration) {
        try {
          let dataUserMensuration = {
            is_main: this.updateUserMensuration.is_main,
            titre: this.updateUserMensuration.titre
          }
          UtilisateurPutService.updateMensuration(dataUserMensuration, this.updateUserMensuration.id)
          if (this.updateUserMensuration.mensurations) {
            this.updateUserMensuration.mensurations.forEach(value => {
              parseFloat(value.mesure)
              UtilisateurPutService.updateMensurationUserMensuration(value, this.updateUserMensuration.id, value.id)
            })
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.chargerMensurations()
          this.monModal(this.modalUpdateUserMensuration + this.updateUserMensuration.id, false)
        }
      }
    },

    async supprimerMensuration(item) {
      try {
        await UtilisateurDeleteService.deleteUserMensuration(item.id).then(() => {
          this.chargerMensurations()
          this.monModal(this.modalDeleteUserMensuration + item.id, false)
          Outils.makeToast(this, 'success', 'Mensuration supprimé avec succes!', 'Suppression')
        })
      }
      catch (err) {
        Outils.makeToast(this, 'danger', err, 'Suppression')
      }
    },

    /* endregion */
  },

  mixins: [METHODS],
}
</script>

<style scoped>

</style>