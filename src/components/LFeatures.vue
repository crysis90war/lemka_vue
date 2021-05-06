<template>
  <section class="features-clean">
    <div class="container">
      <div class="row features">
        <div class="col-sm-6 col-lg-4 item">
          <i class="fas fa-cut icon"></i>
          <h3 class="name">Service de confection</h3>
          <p class="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est.</p>
        </div>
        <div class="col-sm-6 col-lg-4 item">
          <i class="fas fa-cut icon"></i>
          <h3 class="name">Service de réparation</h3>
          <p class="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est.</p>
        </div>
        <div class="col-sm-6 col-lg-4 item">
          <i class="fas fa-cut icon"></i>
          <h3 class="name">Service de retouche</h3>
          <p class="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est.</p>
        </div>
        <div class="col-sm-6 col-lg-4 item">
          <i class="far fa-folder-open icon"></i>
          <h3 class="name">Demander Devis</h3>
          <p class="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est.</p>
        </div>
        <div class="col-sm-6 col-lg-4 item">
          <i class="far fa-folder icon"></i>
          <h3 class="name">Recevoir Devis</h3>
          <p class="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est.</p>
        </div>
        <div class="col-sm-6 col-lg-4 item">
          <i class="fas fa-calendar-check icon"></i>
          <h3 class="name">Rendez-Vous</h3>
          <p class="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LFeatures"
}
</script>

<style scoped>
.features-clean {
  color: #313437;
  background-color: #fff;
  padding-bottom: 30px;
}

@media (max-width:767px) {
  .features-clean {
    padding-bottom: 10px;
  }
}

.features-clean p {
  color: #7d8285;
}

.features-clean h2 {
  font-weight: bold;
  margin-bottom: 40px;
  padding-top: 40px;
  color: inherit;
}

@media (max-width:767px) {
  .features-clean h2 {
    margin-bottom: 25px;
    padding-top: 25px;
    font-size: 24px;
  }
}

.features-clean .intro {
  font-size: 16px;
  max-width: 500px;
  margin: 0 auto 60px;
}

@media (max-width:767px) {
  .features-clean .intro {
    margin-bottom: 40px;
  }
}

.features-clean .item {
  min-height: 100px;
  padding-left: 80px;
  margin-bottom: 40px;
}

@media (max-width:767px) {
  .features-clean .item {
    min-height: 0;
  }
}

.features-clean .item .name {
  font-size: 20px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
  color: inherit;
}

.features-clean .item .description {
  font-size: 15px;
  margin-bottom: 0;
}

.features-clean .item .icon {
  font-size: 40px;
  color: #79648F;
  float: left;
  margin-left: -65px;
}
</style>