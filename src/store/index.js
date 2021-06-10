import Vue from 'vue'
import Vuex from 'vuex'
import {MensurationModule} from "@/store/mensuration.module";
import {ServiceModule} from "@/store/service.module";
import {GenreModule} from "@/store/genre.module";
import {UtilisateurModule} from "@/store/utilisateur.module";
import {MercerieModule} from "@/store/mercerie.module";
import {CategorieModule} from "@/store/categorie.module";
import {CouleurModule} from "@/store/couleur.module";
import {UserMensurationModule} from "@/store/user_mensuration/user_mensuration.module";
import {CaracteristiqueModule} from "@/store/caracteristique.module";
import {AuthModule} from "@/store/auth.module";
import {HoraireModule} from "@/store/horaire.module";
import {DemandeDevisModule} from "@/store/demande_devis.module";
import {ArticleModule} from "@/store/articles/article.module";
import {EntrepriseModule} from "@/store/entreprise.module";
import {TagModule} from "@/store/tag.module";
import {VilleModule} from "@/store/ville.module";
import {PaysModule} from "@/store/pays.module";
import {ProfilModule} from "@/store/profil/profil.module";
import {DevisModule} from "@/store/devis/devis.module";
import {TVAModule} from "@/store/tva.module";
import {DetailModule} from "@/store/devis/detail.module";
import {AdresseModule} from "@/store/adresse.module";
import {RendezVousModule} from "@/store/rendez_vous.module";
import {RayonModule} from "@/store/articles/rayon.module";
import {SectionModule} from "@/store/articles/section.module";
import {TypeProduitModule} from "@/store/articles/type_produit.module";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    'Auth': AuthModule,
    'Articles': ArticleModule,
    'Mensurations': MensurationModule,
    'Services': ServiceModule,
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
    'Villes': VilleModule,
    'Pays': PaysModule,
    'Profil': ProfilModule,
    'Devis': DevisModule,
    'TVA': TVAModule,
    'Details': DetailModule,
    'Adresse': AdresseModule,
    'Characteristiques': CaracteristiqueModule,
    'RendezVous': RendezVousModule,
    'Rayons': RayonModule,
    'Sections': SectionModule,
    'TypeProduits': TypeProduitModule
  }
});
