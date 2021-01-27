<template>
  <div>
    <!--    <b-button v-b-modal.modal-no-backdrop.modal-xl>Open modal</b-button>-->

    <b-modal id="modal-no-backdrop" hide-backdrop content-class="shadow" hide-footer size="xl" hide-header
             @show="resetModal"
             @hidden="resetModal"
             @ok="handleOk">
      <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-input-group>
          <b-form-input placeholder="Rechercher"></b-form-input>
          <b-input-group-append>
            <b-button class="btn-grad">Chercher</b-button>
            <b-button class="fermer" @click="resetModal"><i class="fas fa-times"></i></b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form>
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
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
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
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
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
  background-image: linear-gradient(to right, #834d9b 0%, #d04ed6  51%, #834d9b  100%)
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