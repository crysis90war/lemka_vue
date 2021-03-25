<template>
  <div class="double_listbox mt-1">
    <div class="d-flex justify-content-between">
      <div class="tableaux mr-2 overflow-auto" style="height: 350px">
        <b-list-group class="mt-2">

          <p v-if="leftOptions.length === 0" class="text-center">
            Aucune mercerie selectionnée
          </p>
          <b-list-group-item v-else v-for="selectedMercerie in leftOptions" :key="selectedMercerie.id"
                             variant="light" button @click="rightSelected(selectedMercerie)">
            <b-row>
              <b-col lg="10">
                <p>{{ selectedMercerie.reference }} | {{ selectedMercerie.name.substring(0, 25) }} ...</p>
                <small>{{ selectedMercerie.description.substring(0, 50) }} ...</small>
              </b-col>
              <b-col lg="2" class="d-flex row">
                <b-img :src="selectedMercerie.images.length > 0 ? selectedMercerie.images[0].image : require('@/assets/noimage.png')"
                       height="52" width="52"/>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </div>

      <div>
        <div class="d-flex flex-row h-100">
          <b-button-group vertical class="w-100">
            <b-button variant="outline-secondary" :disabled="rightOptions.length === 0" @click="addAllLeft">
              <i class="fas fa-angle-double-left"></i>
            </b-button>
            <b-button variant="outline-secondary" :disabled="leftItemSelected === false" @click="addElementLeft">
              <i class="fas fa-chevron-left"></i>
            </b-button>
            <b-button variant="outline-secondary" :disabled="rightItemSelected === false" @click="addElementRight">
              <i class="fas fa-chevron-right"></i>
            </b-button>
            <b-button variant="outline-secondary" :disabled="leftOptions.length === 0" @click="addAllRight">
              <i class="fas fa-angle-double-right"></i>
            </b-button>
          </b-button-group>
        </div>
      </div>

      <div class="tableaux ml-2 overflow-auto" style="height: 350px">
        <b-list-group class="mt-2">
          <b-list-group-item v-if="loading === true">
            <div class="text-center">
              <b-spinner variant="secondary" type="grow" size="5em"></b-spinner>
            </div>
          </b-list-group-item>
          <div v-else>
            <p v-if="rightOptions.length === 0" class="text-center">Rien a selectionner</p>
            <b-list-group-item v-else v-for="option in rightOptions" :key="option.id"
                               variant="light" button @click="leftSelected(option)">
              <b-row>
                <b-col lg="10">
                  <p>{{ option.reference }} | {{ option.name.substring(0, 25) }} ...</p>
                  <small>{{ option.description.substring(0, 50) }} ...</small>
                </b-col>
                <b-col lg="2" class="d-flex row">
                  <b-img :src="option.images.length > 0 ? option.images[0].image : require('@/assets/noimage.png')" height="52" width="52"/>
                </b-col>
              </b-row>

            </b-list-group-item>
          </div>

        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LDoubleListBox",
  props: {
    rightOptions: {
      type: Array,
    },
    leftOptions: {
      type: Array,
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: {},
      leftItemSelected: false,
      rightItemSelected: false,
    }
  },
  methods: {
    addAllLeft() {
      this.rightOptions.forEach(item => {
        this.leftOptions.push(item)
      })
      this.rightOptions.splice(0, this.rightOptions.length)
      this.leftItemSelected = false
    },
    addAllRight() {
      this.leftOptions.forEach(item => {
        this.rightOptions.push(item)
      })
      this.leftOptions.splice(0, this.leftOptions.length)
      this.rightItemSelected = false
    },
    addElementLeft() {
      this.leftOptions.push(this.selected)
      let index = this.rightOptions.map(item => item.id).indexOf(this.selected.id)
      if (index !== -1) {
        this.rightOptions.splice(index, 1)
      }
      this.selected = null
      this.leftItemSelected = false
    },
    addElementRight() {
      this.rightOptions.push(this.selected)
      let index = this.leftOptions.map(item => item.id).indexOf(this.selected.id)
      if (index !== -1) {
        this.leftOptions.splice(index, 1)
      }
      this.selected = null
      this.rightItemSelected = false
    },
    leftSelected(element) {
      if (this.rightItemSelected === true) this.rightItemSelected = false
      this.leftItemSelected = true
      this.selected = element
    },
    rightSelected(element) {
      if (this.leftItemSelected === true) this.leftItemSelected = false
      this.rightItemSelected = true
      this.selected = element
    }
  }
}
</script>

<style lang="scss" scoped>
.tableaux {
  border: #999999 solid 1px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>