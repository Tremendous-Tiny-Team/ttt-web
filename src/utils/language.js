/**
 * Resolve language code from markdown file path
 *
 * @param {string} path
 * @param {string} defaultCode
 */
const resolveLangCodeFromFilePath = (path, defaultCode) => {
  const [resolved] = path.match(/\/[a-z]{2}\//g) || [];
  return resolved ? resolved.replace('/', '').replace('/', '') : defaultCode;
};

/**
 * Construct language prefix for web page paths
 *
 * @param {string} path
 * @param {Array<Language>} languages
 * @param {string} defaultLanguageCode
 */
const constructPathPrefix = (path, languages, defaultLanguageCode) => {
  const currentLanguageCode = resolveLangCodeFromFilePath(
    path,
    defaultLanguageCode
  );
  const codes = languages.map(it => it.code);

  if (codes.indexOf(currentLanguageCode) === -1) {
    console.log(
      `NOT creating page of ${path}, as the langs.json doesn't contains code '${currentLanguageCode}'`
    );
    return {};
  }

  const language =
    languages.find(it => it.code === currentLanguageCode) ||
    languages.find(it => it.code === defaultLanguageCode);

  // add language path
  path = path
    .replace(language.code, language.path)
    .replace('/home/', '/') // use home as index
    .replace('/index/', '/') // remove nested index folder
    .replace(/\/+/g, '/'); // remove any consecutive '/' to single '/'

  console.log(`creating page of ${path}`);

  return { currentLanguageCode, path };
};

/**
 * Pick page content from Markdowns with correct language
 *
 * @param {*} queryResult
 * @param {LanguageContext} languageContext
 */
const pickLangNode = (queryResult, languageContext) => {
  const { currentLanguageCode, defaultLanguageCode } = languageContext;

  // try to lookup the current lang
  const [edge] = queryResult.allMarkdownRemark.edges.filter(
    it =>
      resolveLangCodeFromFilePath(
        it.node.fileAbsolutePath,
        defaultLanguageCode
      ) === currentLanguageCode
  );

  if (edge) {
    return edge.node;
  }
  // if not found, fall back to default lang
  const [defaultLangEdge] = queryResult.allMarkdownRemark.edges.filter(
    it =>
      resolveLangCodeFromFilePath(
        it.node.fileAbsolutePath,
        defaultLanguageCode
      ) === defaultLanguageCode
  );

  if (!defaultLangEdge) {
    // very rare to happen, most likely having wrong concept for this project
    console.warn(
      'very rare to happen, most likely having wrong concept for this project. Search this message and trace this code to see what happen.'
    );
  }

  const fallbackEdge =
    defaultLangEdge || queryResult.allMarkdownRemark.edges[0]; // fall back to anyone

  return fallbackEdge.node;
};

/**
 * @typedef {Object} LanguageContext
 * @prop {string} currentLanguageCode
 * @prop {string} defaultLanguageCode
 * @prop {Array<Language>} languages
 */

/**
 * @typedef {Object} Language
 * @prop {string} code
 * @prop {string} path
 */

module.exports = { constructPathPrefix, pickLangNode };
