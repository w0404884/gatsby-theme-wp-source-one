const URIParser = require('urijs');

// normalizes passed options and constants into themeOptions object
const prepareThemeOptions = options => {
  options.wordPressUrl = 'http://s246879907.onlinehome.us/';
  options.menuLocation = 'PRIMARY';
  // constants
  const wpqlTypeName = 'WPGraphQL';
  // no trailing slash please
  // not used
  const blogPath = '/';

  // posts index page size
  const indexPageSize = 4;
  // static images
  const homepageHeroImage = 'builtin/bg.jpg';
  const bioAvatarImage = 'builtin/bio-avatar.jpg';

  const processPostTypes = options.processPostTypes || ['Page', 'Post'];
  // this one needs to be capitalized
  const mainMenuSlug = options.menuLocation || 'MENU_1';
  // whether to generate webp images
  const generateWebp = options.useWebp || false;
  const wordPressUrl = new URIParser(options.wordPressUrl).normalize();
  // if not defined the default uploads folder is used
  let uploadsUrl = new URIParser(
    options.uploadsUrl || '/wp-content/uploads/'
  ).normalize();

  // uploadsUrl could be given as relative
  if (uploadsUrl.is('relative')) {
    let absUrl = uploadsUrl.absoluteTo(wordPressUrl.href());
    uploadsUrl = absUrl.clone();
  }

  const graphqlUrl = new URL('/graphql', wordPressUrl.href());

  return {
    graphqlUrl: graphqlUrl.href,
    wordPressUrl: wordPressUrl.href(),
    uploadsUrl: uploadsUrl.href(),
    processPostTypes,
    wpqlTypeName,
    blogPath,
    mainMenuSlug,
    homepageHeroImage,
    bioAvatarImage,
    indexPageSize,
    generateWebp,
  };
};

module.exports = prepareThemeOptions;
