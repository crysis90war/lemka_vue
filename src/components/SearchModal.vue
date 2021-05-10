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
            placeholder="Veuillez encoder et cherchez ou laissez vide et cherchez"
            v-model="query"
            @keyup.enter="handleSubmit"
        />
        <template #prepend>
          <b-form-select v-model="categorie">
            <template #first>
              <b-form-select-option value="Articles">Articles</b-form-select-option>
            </template>
            <b-form-select-option value="Merceries">Merceries</b-form-select-option>
          </b-form-select>
        </template>
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
      query: '',
      categorie: 'Articles',
    }
  },
  methods: {
    resetModal() {
      this.query = ''
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
      this.$router.push({name: 'VGRecherche', params: {propCategorie: this.categorie, propQuery: this.query}}).catch(()=>{});
    }
  }
}
</script>

<style scoped lang="scss">

.fermer {
  background-color: transparent;
  color: grey;
  border: none;
}

.btn-grad {
  background-image: linear-gradient(to right, #834d9b 0%, #d04ed6 51%, #834d9b 100%);
  background-size: 200% auto;
  color: white;
  border: none;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;

  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
}
</style>