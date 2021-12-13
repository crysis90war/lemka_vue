<template>
  <div class="administration">
    <div class="wrapper">
      <!-- Sidebar  -->
      <nav id="sidebar" class="bg-light">
        <div class="sidebar-header">
          <h3><img :src="logo" alt="" style="max-width: 200px;"/></h3>
          <strong>LK</strong>
        </div>

        <ul class="list-unstyled components">
          <li v-for="(item, index) in menu" :key="index">
            <b-nav-item :to="item.href">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </b-nav-item>
          </li>
        </ul>
      </nav>

      <!-- Page Content  -->
      <div id="content">
        <nav class="navbar navbar-expand-lg navbar-light bg-light my-0">
          <div class="container-fluid">
            <button type="button" id="sidebarCollapse" @click="sidebarCollapse" class="btn">
              <i class="fas fa-align-left"></i>
            </button>
            <p class="nav navbar-nav ml-auto">{{ $route.meta.value }}</p>
          </div>
        </nav>

        <section class="p-5">
          <router-view></router-view>
        </section>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Index"
}
</script>

<style scoped>

</style>