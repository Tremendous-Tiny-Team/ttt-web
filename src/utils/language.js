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
  const codes = languages.map((it) => it.code);

  if (codes.indexOf(currentLanguageCode) === -1) {
    console.log(
      `NOT creating page of ${path}, as the langs.json doesn't contains code '${currentLanguageCode}'`
    );
    return {};
  }

  const language =
    languages.find((it) => it.code === currentLanguageCode) ||
    languages.find((it) => it.code === defaultLanguageCode);

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
 * @typedef {Object} Language
 * @prop {string} code
 * @prop {string} path
 */

module.exports = {
  resolveLangCodeFromFilePath,
  constructPathPrefix,
};
