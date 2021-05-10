<template>
  <div>
    <!--    <b-button v-b-modal.modal-no-backdrop.modal-xl>Open modal</b-button>-->

    <b-modal
        id="modal-no-backdrop"
        content-class="shadow"
        hide-footer
        size="xl"
        hide-header
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
    >
      <b-input-group>
        <b-form-input
            placeholder="Rechercher"
            v-model="name"
        />
        <b-input-group-append>
          <b-button class="btn-grad rounded-right" @click="handleSubmit">Chercher</b-button>
          <b-button class="fermer" @click="resetModal"><i class="fas fa-times"></i></b-button>
        </b-input-group-append>
      </b-input-group>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "SearchModal",
  data() {
    return {
      name: '',
      nameState: null,
      submittedNames: []
    }
  },
  methods: {
    resetModal() {
      this.name = ''
      this.nameState = null
      this.$nextTick(() => {
        this.$bvModal.hide('modal-no-backdrop')
      })
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      this.$nextTick(() => {
        this.$bvModal.hide('modal-no-backdrop')
      })
      this.$router.push({name: 'VGRecherche', query: {search: this.name}})
    }
  }
}
</script>

<style scoped>

.fermer {
  background-color: transparent;
  color: grey;
  border: none;
}

.btn-grad {
  background-image: linear-gradient(to right, #834d9b 0%, #d04ed6 51%, #834d9b 100%)
}

.btn-grad {
  background-size: 200% auto;
  color: white;
  border: none;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
}

.btn-grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

.btn-grad:active {
  transform: scale(0.95);
}

.btn-grad:focus {
  outline: none;
}
</style>