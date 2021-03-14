import AdresseService from '@/services/adresse.service';
import ArticleService from '@/services/article.service';
import CatalogueService from '@/services/catalogue.service';
import CategorieService from '@/services/categorie.service';
import CouleurService from '@/services/couleur.service'
import EntrepriseService from '@/services/entreprise.service';
import GenreService from '@/services/genre.service';
import MensurationUserMensurationService from '@/services/mensuration_user_mensuration.service';
import MensurationService from '@/services/mensuration.service';
import MercerieService from '@/services/merceries/mercerie.service';
import PaysService from '@/services/pays.service';
import ProfilService from '@/services/profil.service';
import RayonService from '@/services/rayon.service';
import SectionService from '@/services/section.service';
import TagService from '@/services/tag.service';
import TypeProduitService from '@/services/type_produit.service';
import TypeServiceService from '@/services/type_service.service';
import UserMensurationsService from '@/services/user_mensuration.service';
import UtilisateurService from '@/services/utilisateur.service';
import VilleService from '@/services/ville.service';
import MercerieOptionservice from '@/services/merceries/mercerie_option.service';
import CharacteristicService from '@/services/characteristic.service';
import MercerieOptionChatacteristicService from '@/services/merceries/mercerie_option_chatacteristic.service'
import AuthService from '@/services/auth.service'

const ApiService = {
    'Auth': AuthService,
    AdresseService,
    'Articles': ArticleService,
    CatalogueService,
    EntrepriseService,
    'Genres': GenreService,
    MensurationUserMensurationService,
    'Mensurations': MensurationService,
    'Categories': CategorieService,
    'Couleurs': CouleurService,
    'Merceries': MercerieService,
    'Options': MercerieOptionservice,
    'Characteristics': CharacteristicService,
    'OptionCharacteristics': MercerieOptionChatacteristicService,
    PaysService,
    ProfilService,
    RayonService,
    SectionService,
    TagService,
    TypeProduitService,
    'TypeService': TypeServiceService,
    'UserMensurations': UserMensurationsService,
    UtilisateurService,
    VilleService,
}

export default ApiService