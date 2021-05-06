import Vue from 'vue'
import Vuex from 'vuex'
import {MensurationModule} from "@/store/mensuration.module";
import {TypeServiceModule} from "@/store/type_service.module";
import {GenreModule} from "@/store/genre.module";
import {UtilisateurModule} from "@/store/utilisateur.module";
import {MercerieModule} from "@/store/mercerie.module";
import {CategorieModule} from "@/store/categorie.module";
import {CouleurModule} from "@/store/couleur.module";
import {UserMensurationModule} from "@/store/user_mensuration/user_mensuration.module";
import {CharacteristiqueModule} from "@/store/characteristique.module";
import {AuthModule} from "@/store/auth.module";
import {HoraireModule} from "@/store/horaire.module";
import {DemandeDevisModule} from "@/store/demande_devis.module";
import {ArticleModule} from "@/store/articles/article.module";
import {EntrepriseModule} from "@/store/entreprise.module";
import {TagModule} from "@/store/tag.module";
import {CatalogueModule} from "@/store/catalogue/catalogue.module";
import {VilleModule} from "@/store/ville.module";
import {PaysModule} from "@/store/pays.module";
import {ProfilModule} from "@/store/profil/profil.module";
import {DevisModule} from "@/store/devis/devis.module";
import {TVAModule} from "@/store/tva.module";
import {DetailModule} from "@/store/devis/detail.module";
import {AdresseModule} from "@/store/adresse.module";
import {RendezVousModule} from "@/store/rendez_vous.module";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    'Auth': AuthModule,
    'Articles': ArticleModule,
    'Mensurations': MensurationModule,
    'TypeServices': TypeServiceModule,
    'Genres': GenreModule,
    'Utilisateurs': UtilisateurModule,
    'Merceries': MercerieModule,
    'Categories': CategorieModule,
    'Couleurs': CouleurModule,
    'UserMensurations': UserMensurationModule,
    'Horaires': HoraireModule,
    'DemandesDevis': DemandeDevisModule,
    'Tags': TagModule,
    'Entreprises': EntrepriseModule,
    'Catalogues': CatalogueModule,
    'Villes': VilleModule,
    'Pays': PaysModule,
    'Profil': ProfilModule,
    'Devis': DevisModule,
    'TVA': TVAModule,
    'Details': DetailModule,
    'Adresse': AdresseModule,
    'Characteristiques': CharacteristiqueModule,
    'RendezVous': RendezVousModule,
  }
});
