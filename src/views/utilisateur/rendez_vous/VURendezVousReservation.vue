<template>
  <div class="rendez_vous_reservation">
    <b-card
        title="prise de rendez-vous"
        :class="BSClass.CARD_BORDERLESS_SHADOW"
    >
      <b-card-body>
        <div>
          <b-form-group
              label="Date"
              description="Veuillez choissir une date"
          >
            <b-form-datepicker
                v-model="value"
                class="mb-2"
            />
          </b-form-group>
          <p>Value: '{{ value }}'</p>
        </div>
      </b-card-body>
    </b-card>
    <h1></h1>
  </div>
</template>

<script>
import LemkaHelpers from "@/helpers";
import {mapGetters} from "vuex";

export default {
  name: "VURendezVousReservation",
  data() {
    return {
      BSClass: LemkaHelpers.BSClass,
      value: null
    }
  },
  computed: {
    ...mapGetters({services: "TypeServices/typeServices"})
  },
  methods: {
    intialisation: function() {

    }
  },
}
</script>

<style scoped>

</style>