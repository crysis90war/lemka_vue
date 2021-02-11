<template>
  <div class="home">
    <lemka-carousel></lemka-carousel>
    <lemka-separateur :titre="separateurs[0].titre" :sous-titre="separateurs[0].sousTitre"/>
    <lemka-separateur :titre="separateurs[1].titre" :sous-titre="separateurs[1].sousTitre"/>
    <lemka-separateur :titre="separateurs[2].titre" :sous-titre="separateurs[2].sousTitre"/>
    <lemka-map></lemka-map>
  </div>
</template>

<script>

import Carousel from '@/components/Carousel'
import Outils from '@/mixins/outils.mixin'
import LemkaSeparateur from "@/components/LemkaSeparateur";
import GoogleMap from "@/components/GoogleMap";

export default {
  name: 'ViewGlobalHome',

  components: {
    LemkaSeparateur,
    'lemka-carousel': Carousel,
    'lemka-map': GoogleMap
  },

  data() {
    return {
      separateurs: [
        { titre: 'LEMKA - Atelier de couture', sousTitre: 'LOREM IPSUM DOLOR SITE CONSECTETUER' },
        { titre: 'NOUVEAUX PRODUITS', sousTitre: 'LOREM IPSUM DOLOR SITE CONSECTETUER' },
        { titre: 'PRODUITS POPULAIRES', sousTitre: 'LOREM IPSUM DOLOR SITE CONSECTETUER' },
      ]
    }
  },

  title () {
    return Outils.htmlTitle()
  },
}
</script>

<style scoped>



</style>