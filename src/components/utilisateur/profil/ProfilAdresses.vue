<template>
  <b-card no-body>
    <b-card-body>
      <div class="d-flex justify-content-between mb-3">
        <h5>Mes adresses</h5>

        <!-- region Ajout d'une nouvelle mensuration -->
        <b-button :disabled="listUserAddress.length >= 2"
                  :variant="listUserAddress.length >= 2 ? 'secondary' : 'outline-success' "
                  @click="monModal(modalCreateUserAddress)">
          Ajouter adresse
        </b-button>

        <b-modal :id="modalCreateUserAddress" hide-footer title="Ajouter une adresse" size="l">
          <b-container>
            <ValidationObserver ref="is_main" v-slot="{ handleSubmit }">
              <b-form @submit.prevent="handleSubmit(ajouterAdresse)">

                <ValidationProvider name="ville" ref="ville" rules="required" v-slot="{ errors }">
                  <b-form-group label="Ville" description="Veuillez encoder votre ville">
                    <v-pack-select v-model="villeSelectionne"
                                   :options="optionsVilles"
                                   :select-on-tab="true"
                                   placeholder="Veuillez selectionner votre ville">
                      <template v-slot:no-options="{ search, searching }">
                        <template v-if="searching">
                          Aucune ville correspond <em>{{ search }}</em>.
                        </template>
                        <em style="opacity: 0.5;" v-else>Veuillez selectionner votre ville</em>
                      </template>
                    </v-pack-select>
                    <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                  </b-form-group>
                </ValidationProvider>

                <!-- region Rue -->
                <ValidationProvider name="rue" ref="rue" rules="required|min:3|max:255" v-slot="{ errors }">
                  <b-form-group label="Rue" description="Veuillez encoder votre rue" class="mt-3">
                    <b-input v-model="createUserAddress.rue" required></b-input>
                    <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                  </b-form-group>
                </ValidationProvider>
                <!-- endregion -->

                <div class="d-flex justify-content-between">
                  <!-- region Numero -->
                  <ValidationProvider name="numero" ref="numero" rules="required|min:1|max:255" v-slot="{ errors }">
                    <b-form-group label="numero" description="Veuillez encoder votre numéro" class="mt-3 mr-1">
                      <b-input v-model="createUserAddress.numero" required></b-input>
                      <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                    </b-form-group>
                  </ValidationProvider>
                  <!-- endregion -->

                  <!-- region Boite -->
                  <ValidationProvider name="boite" ref="boite" v-slot="{ errors }">
                    <b-form-group label="Boite" description="Veuillez encoder votre boite" class="mt-3 ml-1">
                      <b-input v-model="createUserAddress.boite"></b-input>
                      <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                    </b-form-group>
                  </ValidationProvider>
                  <!-- endregion -->
                </div>

                <b-button-group class="mt-3 float-right">
                  <b-button variant="outline-danger" type="button" @click="monModal(modalCreateUserAddress, false)">
                    Annuler
                  </b-button>
                  <b-button type="submit" variant="outline-success">Créer</b-button>
                </b-button-group>
              </b-form>
            </ValidationObserver>
          </b-container>
        </b-modal>
        <!-- endregion -->
      </div>

      <!-- region Tableau mensurations -->
      <table class="table">
        <thead>
        <tr>
          <th>#</th>
          <th>Adresse</th>
          <th class="text-center">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="userAdresse in listUserAddress" :key="userAdresse.id">
          <td>

          </td>
          <td>{{ userAdresse.rue }}</td>
          <td class="d-flex justify-content-around">
            <b-button-group>

              <!-- region Bouton pour afficher les mensuration avec modal -->
              <b-button variant="outline-info" size="md" @click="afficherAdresse(userAdresse.id)">
                <i class="far fa-eye"></i>
              </b-button>

              <b-modal :id="modalGetUserAddress + userAdresse.id" hide-footer :title="userAdresse.rue">
                <p>{{ villeUtilisateur }}</p>
                <p>{{ userAdresse.rue }}</p>
                <p>{{ userAdresse.numero }}</p>
                <p>{{ userAdresse.boite }}</p>
              </b-modal>
              <!-- endregion -->

              <!-- region Bouton pour update les mensuration avec modal -->
              <b-button variant="outline-primary" size="md" @click="updateAdresse(userAdresse.id)">
                <i class="fas fa-edit"></i>
              </b-button>

              <b-modal :id="modalUpdateUserAddress + userAdresse.id" hide-footer>
                <template v-slot:modal-title>
                  <p>Modification de rue {{ userAdresse.rue }}</p>
                </template>

                <b-container v-if="Object.keys(updateVilleSelectionne).length !== 0">
                  <ValidationObserver ref="is_main" v-slot="{ handleSubmit }">
                    <b-form @submit.prevent="handleSubmit(onUpdate)">

                      <ValidationProvider name="ville" ref="ville" rules="required" v-slot="{ errors }">
                        <b-form-group label="Ville" description="Veuillez encoder votre ville">
                          <v-pack-select
                              v-model="updateVilleSelectionne"
                              :options="optionsVilles"
                              :select-on-tab="true"
                              placeholder="Veuillez selectionner votre ville">
                            <template v-slot:no-options="{ search, searching }">
                              <template v-if="searching">
                                Aucune ville correspond <em>{{ search }}</em>.
                              </template>
                              <em style="opacity: 0.5;" v-else>Veuillez selectionner votre ville</em>
                            </template>
                          </v-pack-select>
                          <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                        </b-form-group>
                      </ValidationProvider>

                      <!-- region Rue -->
                      <ValidationProvider name="rue" ref="rue" rules="required|min:3|max:255" v-slot="{ errors }">
                        <b-form-group label="Rue" description="Veuillez encoder votre rue" class="mt-3">
                          <b-input v-model="updateUserAddress.rue" required></b-input>
                          <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                        </b-form-group>
                      </ValidationProvider>
                      <!-- endregion -->

                      <div class="d-flex justify-content-between">
                        <!-- region Numero -->
                        <ValidationProvider name="numero" ref="numero" rules="required|min:1|max:255"
                                            v-slot="{ errors }">
                          <b-form-group label="numero" description="Veuillez encoder votre numéro" class="mt-3 mr-1">
                            <b-input v-model="updateUserAddress.numero" required></b-input>
                            <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                          </b-form-group>
                        </ValidationProvider>
                        <!-- endregion -->

                        <!-- region Boite -->
                        <ValidationProvider name="boite" ref="boite" v-slot="{ errors }">
                          <b-form-group label="Boite" description="Veuillez encoder votre boite" class="mt-3 ml-1">
                            <b-input v-model="updateUserAddress.boite"></b-input>
                            <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                          </b-form-group>
                        </ValidationProvider>
                        <!-- endregion -->
                      </div>

                      <b-button-group class="mt-3 float-right">
                        <b-button variant="outline-danger"
                                  type="button"
                                  @click="monModal(modalUpdateUserAddress + userAdresse.id, false)">Annuler
                        </b-button>
                        <b-button type="submit" variant="outline-primary">Modifier</b-button>
                      </b-button-group>
                    </b-form>
                  </ValidationObserver>
                </b-container>

                <b-container v-else>
                  <div class="text-center">
                    <b-spinner type="grow" variant="secondary" label="Chargement informations"></b-spinner>
                  </div>
                </b-container>
              </b-modal>
              <!-- endregion -->

              <!-- region Bouton pour supprimer la mensuration avec modal -->
              <b-button variant="outline-danger" size="md" @click="monModal(modalDeleteUserAddress + userAdresse.id)">
                <i class="fas fa-trash-alt"></i>
              </b-button>
              <b-modal :id="modalDeleteUserAddress + userAdresse.id" hide-footer title="Suppresion">
                <p>Êtes-vous sûr de vouloir supprimer la mensuration suivante ?</p>
                <h4 class="text-center my-3 overflow-auto">{{ userAdresse.rue }}</h4>
                <b-button-group class="w-100">
                  <b-button variant="outline-secondary"
                            @click="monModal(modalDeleteUserAddress + userAdresse.id, false)">Annuler
                  </b-button>
                  <b-button variant="outline-danger" @click="suprrimerUserAdresse(userAdresse)">Supprimer</b-button>
                </b-button-group>
              </b-modal>
              <!-- endregion -->
            </b-button-group>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- endregion -->
    </b-card-body>
  </b-card>
</template>

<script>
import METHODS from "@/mixins/methods.mixin"
import UtilisateurGetService from "@/services/utilisateur.get.service";
import UtilisateurPostService from "@/services/utilisateur.post.service";
import UtilisateurPutService from "@/services/utilisateur.put.service";
import UtilisateurDeleteService from "@/services/utilisateur.delete.service";
import Outils from "@/mixins/outils.mixin";
import UserAddress from "@/models/address.model";

export default {
  name: "ProfilAdresses",

  props: {
    currentUser: {}
  },

  data() {
    return {
      modalCreateUserAddress: 'modal-ajouter-adresse',
      modalGetUserAddress: 'modal-afficher-adresse',
      modalUpdateUserAddress: 'modal-update-adresse',
      modalDeleteUserAddress: 'modal-supprimer-adresse',

      listUserAddress: [],
      getUserAddress: new UserAddress(),
      villeUtilisateur: '',
      createUserAddress: new UserAddress(),
      updateUserAddress: new UserAddress(),

      villeSelectionne: {},
      updateVilleSelectionne: {
        value: 0,
        label: ''
      },

      updating: false
    }
  },

  computed: {
    optionsVilles() {
      return this.$store.state.villes.cities
    },
  },

  methods: {
    userVille(ref_ville) {
      if (this.optionsVilles && this.getUserAddress.ref_ville) {
        let villes = this.optionsVilles
        villes.forEach(item => {
          if (item.value === ref_ville) {
            this.villeUtilisateur = item.label
          }
        })
      } else {
        this.villeUtilisateur = 'Pas de ville'
      }
    },

    chargerAdresses() {
      try {
        UtilisateurGetService.getUserListAdresses().then(response => {
          let adresses = []
          response.data.forEach(value => {
            adresses.push(value)
          })
          this.listUserAddress = adresses
        })
      } catch (error) {
        console.log(error)
      }
    },

    ajouterAdresse() {
      try {
        this.createUserAddress.ref_ville = this.villeSelectionne.value
        UtilisateurPostService.postUserAdresse(this.createUserAddress).then(() => {
          this.monModal(this.modalCreateUserAddress, false)
          this.chargerAdresses()
          Outils.makeToast(this, 'success', 'Adresse ajoutée avec succès', 'Ajout')
          this.createUserAddress = new UserAddress()
        }).catch(err => {
          Outils.makeToast(this, 'danger', err, 'Erreur')
        })
      } catch (error) {
        console.log(error)
      }
    },

    async afficherAdresse(adresse_id) {
      try {
        await UtilisateurGetService.getUserAdresse(adresse_id).then(response => {
          this.getUserAddress = response.data
          this.userVille(this.getUserAddress.ref_ville)
          this.monModal(this.modalGetUserAddress + adresse_id)
        })
      } catch (error) {
        console.log(error)
      }
    },

    async updateAdresse(adresse_id) {
      try {
        this.updating = true
        await UtilisateurGetService.getUserAdresse(adresse_id).then(response => {
          this.updateUserAddress = response.data

          let options = this.optionsVilles
          options.forEach(item => {
            if (item.value === this.updateUserAddress.ref_ville) {
              this.updateVilleSelectionne.value = item.value
              this.updateVilleSelectionne.label = item.label
              this.updating = false
            }
          })
        })
        this.monModal(this.modalUpdateUserAddress + adresse_id)
      } catch (error) {
        this.updating = false
        console.log(error)
      } finally {
        this.updating = false
      }
    },

    onUpdate() {
      if (this.updateUserAddress) {
        try {
          let dataUserAdrress = {
            rue: this.updateUserAddress.rue,
            numero: this.updateUserAddress.numero,
            boite: this.updateUserAddress.boite,
            ref_ville: this.updateVilleSelectionne.value
          }

          UtilisateurPutService.updateUserAdresse(dataUserAdrress, this.updateUserAddress.id)
        } catch (error) {
          console.log(error)
        } finally {
          this.chargerAdresses()
        }
      }
    },

    async suprrimerUserAdresse(item) {
      try {
        await UtilisateurDeleteService.deleteUserAdresse(item.id).then(() => {
          this.chargerAdresses()
          this.monModal(this.modalDeleteUserAddress + item.id, false)
          Outils.makeToast(this, 'success', 'Adresse supprimé avec succès', 'Suppression')
        })
      } catch (error) {
        console.log(error)
      }
    }
  },

  mixins: [METHODS],

  created() {
    if (this.currentUser) {
      this.chargerAdresses()
    }
  }
}
</script>

<style scoped>

</style>