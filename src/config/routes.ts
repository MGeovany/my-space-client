import { defaultSEO, extendSEO } from './seo'

const routes = {
  home: {
    label: 'Home',
    path: '/',
    seo: defaultSEO,
  },
  about: {
    label: 'About',
    path: '/about',
    seo: extendSEO({
      title: 'About',
      url: 'about',
    }),
  },
  writing: {
    label: 'Writing',
    path: '/writing',
    seo: extendSEO({
      title: 'Writing',
      description: 'Thinking out loud about software design and development.',
      image: '/static/meta/me.webp',
      url: 'writing',
    }),
  },
  bookmarks: {
    label: 'Bookmarks',
    path: '/bookmarks',
    seo: extendSEO({
      title: 'Bookmarks',
      description: 'Internet things, saved for later.',
      image: '/static/meta/me.webp',
      url: 'bookmarks',
    }),
  },
  projectIdeas: {
    label: 'Project Ideas',
    path: '/project-ideas',
    seo: extendSEO({
      title: 'Project Ideas',
      description: 'A collection of project ideas.',
      image: '/static/meta/me.webp',
      url: 'project-ideas',
    }),
  },
}

export default routes
