import AdresseService from '@/services/adresse.service';
import ArticleService from '@/services/article.service';
import CatalogueService from '@/services/catalogue.service';
import CategorieService from '@/services/categorie.service';
import EntrepriseService from '@/services/entreprise.service';
import GenreService from '@/services/genre.service';
import MensurationUserMensurationService from '@/services/mensurationUserMensuration.service';
import MensurationService from '@/services/mensuration.service';
import MercerieService from '@/services/mercerie.service';
import PaysService from '@/services/pays.service';
import ProfilService from '@/services/profil.service';
import RayonService from '@/services/rayon.service';
import SectionService from '@/services/section.service';
import TagService from '@/services/tag.service';
import TypeProduitService from '@/services/typeProduit.service';
import TypeServiceService from '@/services/typeService.service';
import UserMensurationsService from '@/services/userMensuration.service';
import UtilisateurService from '@/services/utilisateur.service';
import VilleService from '@/services/ville.service';

const ApiService = {
    AdresseService,
    ArticleService,
    CatalogueService,
    CategorieService,
    EntrepriseService,
    GenreService,
    MensurationUserMensurationService,
    MensurationService,
    MercerieService,
    PaysService,
    ProfilService,
    RayonService,
    SectionService,
    TagService,
    TypeProduitService,
    'TypeService': TypeServiceService,
    UserMensurationsService,
    UtilisateurService,
    VilleService
}

export default ApiService