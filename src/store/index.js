import Vue from 'vue'
import Vuex from 'vuex'
import {MensurationModule} from "@/store/user/mensuration.module";
import {ServiceModule} from "@/store/autre/service.module";
import {GenreModule} from "@/store/user/genre.module";
import {UtilisateurModule} from "@/store/user/utilisateur.module";
import {MercerieModule} from "@/store/mercerie/mercerie.module";
import {CategorieModule} from "@/store/mercerie/categorie.module";
import {CouleurModule} from "@/store/mercerie/couleur.module";
import {UserMensurationModule} from "@/store/user/user_mensuration.module";
import {CaracteristiqueModule} from "@/store/mercerie/caracteristique.module";
import {AuthModule} from "@/store/user/auth.module";
import {HoraireModule} from "@/store/entreprise/horaire.module";
import {DemandeDevisModule} from "@/store/devis/demande_devis.module";
import {ArticleModule} from "@/store/articles/article.module";
import {EntrepriseModule} from "@/store/entreprise/entreprise.module";
import {TagModule} from "@/store/articles/tag.module";
import {VilleModule} from "@/store/adresse/ville.module";
import {PaysModule} from "@/store/adresse/pays.module";
import {ProfilModule} from "@/store/profil/profil.module";
import {DevisModule} from "@/store/devis/devis.module";
import {TVAModule} from "@/store/autre/tva.module";
import {DetailModule} from "@/store/devis/detail.module";
import {AdresseModule} from "@/store/adresse/adresse.module";
import {RendezVousModule} from "@/store/autre/rendez_vous.module";
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
