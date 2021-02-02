<template>
  <b-card title="Ajouter une adresse" :class="bootstrap.shadow" class="my-2">
    <b-card-body>

      <b-container class="px-5">
        <ValidationObserver ref="is_main" v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(onSubmit)" class="px-5">
            <b-form-group label="Pays" description="Veuillez selectionner votre pays">
              <b-form-select v-model="pays" :options="paysOptions">
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Veuillez selectionner la ville --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>

            <ValidationProvider name="ville" ref="ville" rules="required" v-slot="{ errors }">
              <b-form-group label="Ville" description="Veuillez encoder votre ville">
                <v-pack-select v-model="ville"
                               :options="optionsVille"
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
                <b-input v-model="adresse.rue" required></b-input>
                <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
              </b-form-group>
            </ValidationProvider>
            <!-- endregion -->

            <div class="d-flex justify-content-between">
              <!-- region Numero -->
              <ValidationProvider name="numero" ref="numero" rules="required|min:1|max:255" v-slot="{ errors }">
                <b-form-group label="numero" description="Veuillez encoder votre numéro" class="mt-3 mr-1">
                  <b-input v-model="adresse.numero" required></b-input>
                  <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                </b-form-group>
              </ValidationProvider>
              <!-- endregion -->

              <!-- region Boite -->
              <ValidationProvider name="boite" ref="boite" v-slot="{ errors }">
                <b-form-group label="Boite" description="Veuillez encoder votre boite" class="mt-3 ml-1">
                  <b-input v-model="adresse.boite"></b-input>
                  <b-badge pill variant="danger">{{ errors[0] }}</b-badge>
                </b-form-group>
              </ValidationProvider>
              <!-- endregion -->
            </div>

            <b-button-group class="mt-3 float-right">
              <b-button type="submit" variant="outline-success">Créer</b-button>
            </b-button-group>
          </b-form>
        </ValidationObserver>
      </b-container>
    </b-card-body>
  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewUserAdresseAdd",
  data() {
    return {
      bootstrap: {
        shadow: LemkaEnums.BootstrapClass.CARD_BORDERLESS_SHADOW
      },
      pays: {},
      ville: {},
      paysOptions: [
        {value: 1, text: 'Belgique'}
      ],
      optionsVille: [],
      adresse: {
        rue: '',
        numero: null,
        boite: '',
        ref_pays: null,
      }
    }
  },
  methods: {
    onSubmit() {

    }
  },
}
</script>

<style scoped>

</style>