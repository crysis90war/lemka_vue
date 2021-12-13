<template>
  <div class="legales">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-toggle target="profil-collapse"></b-navbar-toggle>

      <b-collapse id="profil-collapse" is-nav>
        <b-navbar-nav class="mx-auto">

          <b-nav-item v-for="(item, index) in menu" :key="index" :to="item.to"
                      :active="item.children.includes($route.name)">
            <i :class="item.icon"></i>
            {{ item.title }}
          </b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      menu: [
        {
          to: 'pc',
          title: 'Politique de confidentialité',
          children: ['pc']
        },
        {
          to: 'cgvu',
          title: 'Conditions générales',
          children: ['cgvu']
        },
        {
          to: 'rb',
          title: 'Retours et remboursement',
          children: ['rb']
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>