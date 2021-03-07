import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from "@/store/auth.module";
import { mensurationModule } from "@/store/mensuration.module";
import { typeServiceModule } from "@/store/type_service.module";
import { genreModule } from "@/store/genre.module";
import { utilisateurModule } from "@/store/utilisateur.module";
import { mercerieModule } from "@/store/mercerie.module";
import { categorieModule } from "@/store/categorie.module";
import { articleModule } from "@/store/article.module";

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
    'Categories': categorieModule,
  }
});
