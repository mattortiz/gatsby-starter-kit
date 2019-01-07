const base = {
  name: 'Envy Forge @ mattortiz.com',
  url: 'https://www.mattortiz.com',
};

const config = {
  /* meta tags */
  siteTitle: `${base.name} - a place to get to know Matt`,
  siteTitlePostfix: ` - ${base.name}`,
  siteDescription: `${
    base.name
  } where I keep things up to date: Portfolio, Blog, Docs, and Project information.`,
  siteImage: 'preview.jpg',
  siteLanguage: 'en',

  /* site header */
  headerTitle: `${base.name}`,
  headerSubTitle: 'a place to get to know Matt',

  /* url */
  siteUrl: base.url,
  // pathPrefix: '',

  /* manifest */
  manifestName: `${base.name}`,
  manifestShortName: 'EnvyForge', // max 12 characters
  manifestStartUrl: '/index.html',
  manifestBackgroundColor: '#ffffff',
  manifestThemeColor: '#ffffff',
  manifestDisplay: 'standalone',
  manifestIcon: 'src/content/images/icon.png',

  /* Twitter */
  twitter: '@ma77or7iz', // used as content of the 'twitter:creator' meta tag
};

module.exports = config;
