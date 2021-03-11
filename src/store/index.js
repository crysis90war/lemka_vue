import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from "@/store/auth.module";
import {mensurationModule} from "@/store/mensuration.module";
import {typeServiceModule} from "@/store/type_service.module";
import {genreModule} from "@/store/genre.module";
import {utilisateurModule} from "@/store/utilisateur.module";
import {mercerieModule} from "@/store/merceries/mercerie.module";
import {categorieModule} from "@/store/categorie.module";
import {articleModule} from "@/store/article.module";
import {mercerieOptionModule} from "@/store/merceries/mercerie_option.module";
import {couleurModule} from "@/store/couleur.module";
import {UserMensurationModule} from "@/store/user_mensuration.module";
import {CharacteristicModule} from "@/store/characteristic.module";
import {MercerieOptionChatacteristicModule} from "@/store/merceries/mercerie_option_chatacteristic.module";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    'Articles': articleModule,
    'Mensurations': mensurationModule,
    'TypeServices': typeServiceModule,
    'Genres': genreModule,
    'Utilisateurs': utilisateurModule,
    'Merceries': mercerieModule,
    'Options': mercerieOptionModule,
    'Categories': categorieModule,
    'Couleurs': couleurModule,
    'UserMensurations': UserMensurationModule,
    'Characteristics': CharacteristicModule,
    'OptionCharacteristics': MercerieOptionChatacteristicModule
  }
});
