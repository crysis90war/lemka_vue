<template>
  <div class="contact">
    <b-alert variant="warning" show class="text-center">
      <span>Nous ne partagerons jamais vos informations personnelles avec un tiers, à quelque fin que ce soit.</span>
    </b-alert>

    <b-container class="mt-3">
      <b-row>
        <b-col>
          <b-card>
            <b-card-header header-bg-variant="dark" header-text-variant="light">
              <i class="fa fa-envelope"></i> Contactez nous.
            </b-card-header>

            <b-card-body>
              <b-form>
                <b-form-group label="Sexe *">
                  <b-form-select required>
                    <b-form-select-option value="H">Mr.</b-form-select-option>
                    <b-form-select-option value="F">Mme.</b-form-select-option>
                  </b-form-select>
                </b-form-group>

                <b-row>
                  <b-col lg="6">
                    <b-form-group label="Nom *">
                      <b-form-input type="text" aria-describedby="emailHelp" placeholder="Nom ..." required>

                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group label="Prénom">
                      <b-form-input type="text" aria-describedby="emailHelp" placeholder="Prénom ...">

                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col lg="6">
                    <b-form-group label="Adresse Email *">
                      <b-form-input type="email" aria-describedby="emailHelp" placeholder="Email ..."
                                    required></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group label="Numéro tel">
                      <b-form-input type="tel" aria-describedby="emailHelp" placeholder="Tél ..."></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>

                <hr>

                <b-form-group label="Sujet *">
                  <b-form-select required>
                    <b-form-select-option-group label="Service de couture">
                      <b-form-select-option value="">Confection</b-form-select-option>
                      <b-form-select-option value="">Réparation</b-form-select-option>
                      <b-form-select-option value="">Retouche</b-form-select-option>
                    </b-form-select-option-group>
                    <b-form-select-option-group label="Autre demande">
                      <b-form-select-option value="">Autre</b-form-select-option>
                    </b-form-select-option-group>
                  </b-form-select>
                </b-form-group>

                <b-form-group label="Message">
                  <b-form-textarea rows="6" required></b-form-textarea>
                </b-form-group>
                <div class="mx-auto">
                  <b-button-group>
                    <b-button variant="outline-success" type="submit">Envoyer</b-button>
                    <b-button variant="outline-danger" type="reset">Réinitialiser</b-button>
                  </b-button-group>
                </div>
                <div class="mt-3">
                  <p>* Champs obligatoire</p>
                </div>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>

        <b-col cols="12" md="4">
          <b-card bg-variant="light" class="mb-3">
            <b-card-header header-bg-variant="dark" header-text-variant="light" class="text-uppercase">
              <i class="fa fa-home"></i> Adresse
            </b-card-header>
            <b-card-body>
              <h5>LEMKA - Atelier de couture</h5>
              <p>BE0650894447</p>
              <p>Arthur Puesstraat, 89</p>
              <p>1502 - Lembeek</p>
              <p>Belgique</p>
              <p>Email : <a href="mailto:LEMKA@proximus.be">LEMKA@proximus.be</a></p>
              <p>Tel. <a href="tel: 0032472894621">+32 (0) 472 89 46 21</a></p>
            </b-card-body>

          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {htmlTitle} from "@/utils/tools"

export default {
  name: "VGContact",
  title() {
    return htmlTitle('Contact')
  }
}
</script>

<style lang="scss" scoped>

</style>