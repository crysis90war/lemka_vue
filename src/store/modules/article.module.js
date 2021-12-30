import Service from '../../services/service.factory';

const ArticleService = Service.get("articles");

const state = () => ({
    articles: [],
    gloabalArticles: [],
});

const getters = {
    articles: state => state.articles,
    articleBySlug: state => slug => {
        return state.articles.find(item => item.slug === slug)
    },
    loadingStatus: state => state.loadingStatus,
    articlesPublies: state => {
        return state.articles.filter(item => item.est_active === true)
    },
    gloabalArticles: state => state.gloabalArticles
};

const actions = {
    GetArticles: async function({commit}) {
        commit('LOAD_ARTICLES', await ArticleService.GetAll())
    }
};

const mutations = {
    LOAD_ARTICLES: (state, res) => {
        const { data } = res;
        state.articles = data;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}