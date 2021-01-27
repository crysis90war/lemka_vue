<template>
  <div>
    <footer class="bg-white border-top">
      <div class="border-top">
        <b-container>
          <b-row class="py-4">
            <b-col lg="3">
              <h5>CONTACT</h5>
              <ul class="list-unstyled text-small text-secondary">
                <li>
                  <h5 class="text-secondary">
                    LEMKA - Atelier de couture
                  </h5>
                </li>

                <li>TVA:
                  <b-link
                      class="text-secondary"
                      href="https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=0650894447&actionLu=Recherche"
                      target="_blank">
                    BE 0650 894 447
                  </b-link>
                </li>
                <li>Tel:
                  <b-link
                      class="text-secondary no-underline"
                      href="tel: 00320472894621">
                    +32 (0) 472 89 46 21
                  </b-link>
                </li>
                <li>E-mail:
                  <b-link
                      class="text-secondary no-underline"
                      href="mailto: elena@lemka.be">
                    elena@lemka.be
                  </b-link>
                </li>
              </ul>
            </b-col>

            <b-col lg="3">
              <h5>SERVICE CLIENTS</h5>
              <ul class="list-unstyled text-small liens-footer">
                <li><b-link class="text-secondary" href="#">Accueil</b-link></li>
                <li><b-link class="text-secondary" href="#">Politique de confidentialité</b-link></li>
                <li><b-link class="text-secondary" href="#">Retours et remboursement</b-link></li>
                <li><b-link class="text-secondary" href="#">Conditions générales</b-link></li>
              </ul>
            </b-col>

            <b-col lg="3">
              <h5>RESEAUX SOCIAUX</h5>
              <p class="text-secondary">Suivez-nous sur les réseaux sociaux. Tenez-vous au courant de toutes les activités, nouvelles et plus</p>
              <!-- Social buttons -->
              <Social/>
            </b-col>

            <b-col lg="3">
              <h5>A PROPOS DE NOUS</h5>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <div class="border-top">
        <b-container>
          <b-row class="py-4">
            <b-col>
              <p>Copyright &copy; LEMKA - Atelier de couture {{ new Date().getFullYear() }}</p>
            </b-col>

            <b-col>
              <back-to-top text="Back to top"></back-to-top>
            </b-col>
          </b-row>
        </b-container>
      </div>

    </footer>
  </div>
</template>

<script>
import BackToTop from "@/components/BackToTop";
import Social from "@/components/Social";

export default {
  name: "Footer",
  components:{
    Social,
    'back-to-top': BackToTop
  }
}
</script>

