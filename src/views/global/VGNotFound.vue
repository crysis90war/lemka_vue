<template>
  <div id="notfound" class="text-center">
    <div class="notfound">
      <div class="notfound-bg">
        <div />
        <div />
        <div />
      </div>
      <h1>oups!</h1>
      <h2>{{ message }}</h2>
      <b-link class="btn-grad" :to="{ name: home }">
        Page d'accueil
      </b-link>
      <lemka-social />
    </div>
  </div>
</template>

<script>
import Outils from "@/utils/tools";
import Social from "@/components/Social";
import LemkaHelpers from "@/helpers";

export default {
  name: "VGNotFound",
  components: {
    'lemka-social': Social
  },
  title () {
    return Outils.htmlTitle(this.message)
  },
  data() {
    return {
      home: LemkaHelpers.Routes.HOME_ROUTE.name,
      message: "Erreur 404 - Page Non Trouvée"
    }
  }
}
</script>

<style scoped>
#notfound {
  position: relative;
  height: 60vh;
}


.btn-grad {
  background-image: linear-gradient(to right, #834d9b 0%, #d04ed6  51%, #834d9b  100%)
}

.btn-grad {
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: inline-block;
}

.btn-grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.notfound {
  max-width: 520px;
  width: 100%;
  text-align: center;
}

.notfound .notfound-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  z-index: -1;
}

.notfound .notfound-bg > div {
  width: 100%;
  background: #fff;
  border-radius: 90px;
  height: 125px;
}

.notfound .notfound-bg > div:nth-child(1) {
  -webkit-box-shadow: 5px 5px 0 0 #f3f3f3;
  box-shadow: 5px 5px 0 0 #f3f3f3;
}

.notfound .notfound-bg > div:nth-child(2) {
  -webkit-transform: scale(1.3);
  -ms-transform: scale(1.3);
  transform: scale(1.3);
  -webkit-box-shadow: 5px 5px 0 0 #f3f3f3;
  box-shadow: 5px 5px 0 0 #f3f3f3;
  position: relative;
  z-index: 10;
}

.notfound .notfound-bg > div:nth-child(3) {
  -webkit-box-shadow: 5px 5px 0 0 #f3f3f3;
  box-shadow: 5px 5px 0 0 #f3f3f3;
  position: relative;
  z-index: 90;
}

.notfound h1 {
  font-family: 'Quicksand', sans-serif;
  font-size: 86px;
  text-transform: uppercase;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 8px;
  color: #151515;
}

.notfound h2 {
  font-family: 'Quicksand', sans-serif;
  font-size: 26px;
  margin: 0;
  font-weight: 700;
  color: #151515;
}

/*.notfound a {*/
/*  font-family: 'Quicksand', sans-serif;*/
/*  font-size: 12px;*/
/*  font-weight: bold;*/
/*  text-decoration: none;*/
/*  text-transform: uppercase;*/
/*  background: rgba(82,39,93,1);*/
/*  display: inline-block;*/
/*  padding: 10px 25px;*/
/*  border-radius: 5px;*/
/*  color: #fff;*/
/*  margin-top: 20px;*/
/*}*/

/*.notfound a:hover {*/
/*  background: #99bf54;*/
/*  color: rgba(82,39,93,1);*/
/*}*/

@media only screen and (max-width: 767px) {
  .notfound .notfound-bg {
    width: 287px;
    margin: auto;
  }

  .notfound .notfound-bg > div {
    height: 85px;
  }
}

@media only screen and (max-width: 480px) {
  .notfound h1 {
    font-size: 68px;
  }

  .notfound h2 {
    font-size: 18px;
  }
}

</style>