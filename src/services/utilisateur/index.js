import AdresseService from '@/services/utilisateur/adresse.service'
import GenreService from '@/services/utilisateur/genre.service';
import UserMensurationsService from '@/services/utilisateur/userMensurations.service';
import UserService from '@/services/utilisateur/user.service';
import PaysService from '@/services/utilisateur/pays.service';
import VilleService from '@/services/utilisateur/ville.service';

const UserApiService = {
    AdresseService,
    GenreService,
    PaysService,
    UserService,
    UserMensurationsService,
    VilleService
}

export default UserApiService;