import ArticleService from '@/services/administrateur/article.service'
import CatalogueService from '@/services/administrateur/catalogue.service'
import CategorieService from '@/services/administrateur/categorie.service'
import EntrepriseService from '@/services/administrateur/entreprise.service'
import GenreService from '@/services/administrateur/genre.service'
import MercerieService from '@/services/administrateur/mercerie.service'
import RayonService from '@/services/administrateur/rayon.service'
import SectionService from '@/services/administrateur/section.service'
import TagService from '@/services/administrateur/tag.service'
import TypeProduitService from '@/services/administrateur/typeProduit.service'
import TypeServiceService from '@/services/administrateur/typeService.service'
import UserService from '@/services/administrateur/user.service'

const AdminApiService = {
    ArticleService,
    CatalogueService,
    CategorieService,
    EntrepriseService,
    GenreService,
    MercerieService,
    RayonService,
    SectionService,
    TagService,
    TypeProduitService,
    TypeServiceService,
    UserService,
}

export default AdminApiService