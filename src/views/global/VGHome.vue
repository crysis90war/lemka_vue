<template>
  <div class="home">
    <lemka-carousel></lemka-carousel>
    <l-separateur :titre="separateurs[0].titre" :sous-titre="separateurs[0].sousTitre"/>
    <l-separateur :titre="separateurs[1].titre" :sous-titre="separateurs[1].sousTitre"/>
    <l-separateur :titre="separateurs[2].titre" :sous-titre="separateurs[2].sousTitre"/>
    <lemka-map></lemka-map>
  </div>
</template>

<script>

import Carousel from '@/components/Carousel'
import GoogleMap from "@/components/GoogleMap";
import Tools from "@/utils/tools"

export default {
  name: 'VGHome',

  components: {
    'lemka-carousel': Carousel,
    'lemka-map': GoogleMap
  },
  title () {
    return Tools.htmlTitle()
  },
  data() {
    return {
      separateurs: [
        { titre: 'LEMKA - Atelier de couture', sousTitre: 'LOREM IPSUM DOLOR SITE CONSECTETUER' },
        { titre: 'NOUVEAUX PRODUITS', sousTitre: 'LOREM IPSUM DOLOR SITE CONSECTETUER' },
        { titre: 'PRODUITS POPULAIRES', sousTitre: 'LOREM IPSUM DOLOR SITE CONSECTETUER' },
      ]
    }
  }
}
</script>

<style scoped>



</style>