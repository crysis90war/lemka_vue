import UtilisateurService from "@/services/utilisateur.service";
import ArticleService from "@/services/article.service";

const services = {
    'utilisateur': UtilisateurService,
    'articles': ArticleService
}

export default {
    get: name => services[name]
}