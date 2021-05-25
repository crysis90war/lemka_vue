<template>
  <b-button-group
      size="sm"
      class="mb-1"
  >
    <!-- region Add Button and Modal -->
    <b-button
        variant="outline-success"
        :disabled="submitStatus === 'PENDING'"
        @click="onClickShowAddModal"
    >
      <i class="fas fa-plus-square"></i>
    </b-button>

    <b-modal
        :id="addModalId"
        :title="addModalTitle"
    >
      <l-input-field
          :input-type="true"
          v-model="inputVal"
          :label="inputLabel"
          :description="inputDescription"
          :placeholder="inputPlaceholder"
          :state="validateState"
      >
        <template #invalid-feedback>
          <slot name="invalid-feedback-validations"></slot>
        </template>
      </l-input-field>
      <template #modal-footer>
        <div class="text-right">
          <b-button-group>
            <b-button variant="outline-danger" @click="onClickHideAddModal">Annuler</b-button>
            <b-button variant="outline-success" @click="onClickSubmitCreate">Créer</b-button>
          </b-button-group>
        </div>
      </template>
    </b-modal>
    <!-- endregion -->

    <!-- region Update Button and Modal -->
    <b-button
        variant="outline-primary"
        :disabled="disabledButtons || submitStatus === 'PENDING'"
        @click="onClickShowUpdateModal"
    >
      <i class="fas fa-edit"></i>
    </b-button>

    <b-modal
        :id="updateModalId"
        :title="updateDeleteModalTitle"
    >
      <l-input-field
          :input-type="true"
          v-model="inputVal"
          :label="inputLabel"
          :description="inputDescription"
          :placeholder="inputPlaceholder"
          :state="validateState"
      >
        <template #invalid-feedback>
          <slot name="invalid-feedback-validations"></slot>
        </template>
      </l-input-field>
      <template #modal-footer>
        <div class="text-right">
          <b-button-group>
            <b-button variant="outline-danger" @click="onClickHideUpdateModal">Annuler</b-button>
            <b-button variant="outline-primary" @click="onClickSubmitUpdate">Modifier</b-button>
          </b-button-group>
        </div>
      </template>
    </b-modal>
    <!-- endregion -->

    <!-- region Delete Button and Modal -->
    <b-button
        variant="outline-danger"
        :disabled="disabledButtons || submitStatus === 'PENDING'"
        @click="onClickShowDeleteModal"
    >
      <i class="fas fa-trash-alt"></i>
    </b-button>

    <b-modal
        :id="deleteModalId"
        :title="updateDeleteModalTitle"
    >
      <div class="text-center">
        <p>Êtes-vous sûre de vouloir supprimer</p>
        <p><strong>{{ inputVal }}</strong></p>
        <b-alert show variant="warning">
          En supprimant cet enregistrement, vous supprimerez tous les catalogues et tous les articles associés à
          <strong>{{ inputVal }}</strong>
        </b-alert>
      </div>
      <template #modal-footer>
        <div class="text-right">
          <b-button-group>
            <b-button variant="outline-secondary" @click="onClickHideDeleteModal">Annuler</b-button>
            <b-button variant="outline-danger" @click="onClickSubmitDelete">Supprimer</b-button>
          </b-button-group>
        </div>
      </template>
    </b-modal>
    <!-- endregion -->
  </b-button-group>
</template>

<script>
import LInputField from "@/components/LInputField";

export default {
  name: "AddUpdateDeleteModalComponent",
  components: {
    LInputField
  },
  props: {
    submitStatus: {
      default: null
    },
    value: {},
    addModalId: {},
    addModalTitle: {},
    updateModalId: {},
    deleteModalId: {},
    updateDeleteModalTitle: {},
    inputLabel: {},
    inputDescription: {},
    inputPlaceholder: {},
    validateState: {
      type: Boolean,
      required: false
    },
    disabledButtons: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    onClickShowAddModal: function () {
      this.$emit('clickShowAddModal')
    },
    onClickHideAddModal: function () {
      this.$emit('clickHideAddModal')
    },
    onClickSubmitCreate: function () {
      this.$emit('clickSubmitCreate')
    },

    onClickShowUpdateModal: function () {
      this.$emit('clickShowUpdateModal')
    },
    onClickHideUpdateModal: function () {
      this.$emit('clickHideUpdateModal')
    },
    onClickSubmitUpdate: function () {
      this.$emit('clickSubmitUpdate')
    },

    onClickShowDeleteModal: function () {
      this.$emit('clickShowDeleteModal')
    },
    onClickHideDeleteModal: function () {
      this.$emit('clickHideDeleteModal')
    },
    onClickSubmitDelete: function() {
      this.$emit('clickSubmitDelete')
    }
  }
}
</script>

<style scoped>

</style>