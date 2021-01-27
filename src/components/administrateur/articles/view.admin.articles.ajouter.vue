<template>
  <b-card>
    <b-card-body>
      <b-container>
        <b-card-text>
          <b-form>

            <b-input-group class="my-1">
              <b-form-checkbox v-model="active" name="check-button" switch>
                <p v-if="active">Publier</p>
                <p v-else>En attente</p>
              </b-form-checkbox>
            </b-input-group>

            <b-form-group label="Titre"
                          description="Encodez le titre de l'article"
                          class="my-1">
              <b-form-input id="input-formatter"
                            placeholder="Entrer le titre"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Description"
                          description="Encodez la description de l'article"
                          class="my-1">
              <b-form-textarea id="input-formatter"
                               placeholder="Encodage de la description"></b-form-textarea>
            </b-form-group>
            <b-row>
              <b-col>
                <b-form-group label="Service"
                              description="Veuillez selectionner le service de l'article"
                              class="my-1">
                  <b-select v-model="selected" :options="serviceOptions">
                    <template #first>
                      <b-select-option :value="null" disabled>-- Selectionnez le service --</b-select-option>
                    </template>
                  </b-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Catalogue"
                              description="Veuillez selectionner le catalogue de l'article"
                              class="my-1">
                  <v-pack-select placeholder="Catalogue"></v-pack-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group label="Tags"
                          description="Veuillez selectionner ou ajouter des tags"
                          class="my-1">
              <b-form-tags  input-id="tags-remove-on-delete"
                           :input-attrs="{ 'aria-describedby': 'tags-validation-help' }"
                           v-model="tags"
                           :tag-validator="tagValidator"
                           :state="stateTag"
                           separator=" "
                           tag-variant="secondary"
                           tag-pills
                           limit="7"
                           placeholder="Encodez de nouveaux tags séparés par un espace"
                           remove-on-delete></b-form-tags>
              <template #invalid-feedback>
                Vous devez fournir au moins 1 tag et pas plus de 7
              </template>

              <template #description>
                <div id="tags-validation-help">
                  Les tags doivent comporter de 3 à 128 caractères et toutes en minuscules.
                  Encodez les tags séparées par des espaces ou appuyez sur Entrée.
                </div>
              </template>
            </b-form-group>

            <b-form-group label="Images"
                          description="Veuillez ajouter des images à l'article"
                          class="my-1">
              <b-file type="file" multiple @change="previewMultiImage"></b-file>
            </b-form-group>

            <div v-if="preview_list.length > 0">
              <b-list-group horizontal="md">
                <b-list-group-item v-for="(image, index) in preview_list" :key="index" class="text-center">
                  <b-radio v-model="selected" name="is_main" :value="image">Principale</b-radio>
                  <br/>
                  <b-img :src="image" height="120" width="120"></b-img>
                  <br/>
                  <b-button variant="danger" @click="deleteImage(index)" class="mt-1">Supprimer</b-button>
                </b-list-group-item>
              </b-list-group>
            </div>

            <pre>{{selected}}</pre>

            <b-button-group class="mt-1">
              <b-button variant="outline-success">Créer</b-button>
              <b-button variant="outline-danger" @click="reset">Reset</b-button>
            </b-button-group>
          </b-form>
        </b-card-text>
      </b-container>

    </b-card-body>
  </b-card>
</template>

<script>
import AdminApiService from "@/services/administrateur";

export default {
  name: "ViewAddArticle",
  data() {
    return {
      tags: [],
      dirty: false,
      preview: null,
      image: null,
      preview_list: [],
      image_list: [],
      serviceOptions: [],
      selected: '',
      active: false,
    }
  },

  computed: {
    stateTag() {
      return this.dirty ? (this.tags.length > 0 && this.tags.length < 8) : null
    }
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    tags(newValue, oldValue) {
      this.dirty = true
    }
  },

  methods: {
    previewImage: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewMultiImage: function (event) {
      let input = event.target;
      if (input.files) {
        for (let index = 0; index < input.files.length; index++) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.preview_list.push(e.target.result);
          }
          this.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
        }
      }
    },

    deleteImage: function (index) {
      this.preview_list.slice(index)
    },

    reset: function () {
      this.image = null;
      this.preview = null;
      this.image_list = [];
      this.preview_list = [];
    },

    tagValidator(tag) {
      // Individual tag validator function
      return tag === tag.toLowerCase() && tag.length > 2 && tag.length < 129
    },

    async chargerService() {
      await AdminApiService.TypeServiceService.getTypeServiceList().then(response => {
        response.data.forEach(item => {
          let service = {}
          service.value = item.id;
          service.text = item.type_service;
          this.serviceOptions.push(service)
        })
      })
    }
  },

  created() {
    this.chargerService()
  }
}
</script>

<style scoped>

</style>