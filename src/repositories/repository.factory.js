import ArticleRepository from './article.repository';
import RayonRepository from './rayon.repository';
import SectionRepository from './section.repository';

const repositories = {
    'articles': ArticleRepository,
    'rayons': RayonRepository,
    'sections': SectionRepository,
};

export default {
    get: name => repositories[name]
};