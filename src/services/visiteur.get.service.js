import axios from 'axios';

const DOMAIN = process.env.VUE_APP_DOMAIN_API

const PUBLIC_HORAIRE_URL = DOMAIN + '/public/horaire/';

class VisiteurGetService {

    getHorairePublic() {
        return axios.get(PUBLIC_HORAIRE_URL)
    }
}

export default new VisiteurGetService();