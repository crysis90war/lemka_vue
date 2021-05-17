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
                    {{ entreprise.nom_societe }}
                  </h5>
                </li>

                <li>TVA:
                  <b-link
                      class="text-secondary"
                      href="https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=0650894447&actionLu=Recherche"
                      target="_blank"
                  >
                    {{ entreprise.numero_tva }}
                  </b-link>
                </li>
                <li>Tel:
                  <b-link
                      class="text-secondary no-underline"
                      :href="`tel: ${entreprise.numero_tel}`">
                    +32 {{ entreprise.numero_tel }}
                  </b-link>
                </li>
                <li>E-mail:
                  <b-link
                      class="text-secondary no-underline"
                      href="mailto: elena@lemka.be">
                    {{ entreprise.mail_contact }}
                  </b-link>
                </li>
              </ul>
            </b-col>

            <b-col lg="3">
              <h5>LÉGALES</h5>
              <ul class="list-unstyled text-small liens-footer">
                <li>
                  <b-link class="text-secondary" :to="{name: 'VGConfidentialite'}">Politique de confidentialité</b-link>
                </li>
                <li>
                  <b-link class="text-secondary" :to="{name: 'VGRetourRemboursement'}">Retours et remboursement</b-link>
                </li>
                <li>
                  <b-link class="text-secondary" :to="{name: 'VGCGV'}">Conditions générales</b-link>
                </li>
              </ul>
            </b-col>

            <b-col lg="3">
              <h5>RESEAUX SOCIAUX</h5>
              <p class="text-secondary">Suivez-nous sur les réseaux sociaux. Tenez-vous au courant de toutes les activités, nouvelles et
                plus</p>
              <!-- Social buttons -->
              <Social
                  :facebook="entreprise.facebook_link"
                  :instagram="entreprise.instagram_link"
                  :twitter="entreprise.twitter_link"
                  :linkedin="entreprise.linkedin_link"
              />
            </b-col>

            <b-col lg="3">
              <h5>A PROPOS DE NOUS</h5>
              <p class="text-secondary text-justify">
                {{ entreprise.a_propos_resume }}
              </p>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <div class="border-top">
        <b-container>
          <b-row class="py-4">
            <b-col>
              <p>Copyright &copy; {{ entreprise.nom_societe }} {{ new Date().getFullYear() }}</p>
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
import {mapActions, mapGetters} from "vuex";
import EntrepriseModel from "@/models/entreprise.model";

export default {
  name: "Footer",
  components: {
    Social,
    'back-to-top': BackToTop
  },
  data() {
    return {
      entreprise: new EntrepriseModel()
    }
  },
  computed: {
    ...mapGetters({entreprises: "Entreprises/entreprises"})
  },
  methods: {
    ...mapActions({loadEntreprise: "Entreprises/loadEntreprises"}),
    initialisation: async function() {
      if (this.entreprises.length === 0) {
        await this.loadEntreprise()
      }
    },
    chargerEntreprise: async function() {
      await this.initialisation()
      Object.assign(this.entreprise, this.$store.getters["Entreprises/entreprise"])
    }
  },
  created() {
    this.chargerEntreprise()
  }
}
</script>

