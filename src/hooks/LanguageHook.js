import { resolveLangCodeFromFilePath } from 'utils/language';
import { useLanguage } from 'contexts/LanguageContext';

/**
 * Use page content from Markdowns with correct language
 *
 * @param {PageQueryResult} queryResult
 */
const useLangNode = (queryResult) => {
  const { currentLanguageCode, defaultLanguageCode } = useLanguage();

  // try to lookup the current lang
  const [edge] = queryResult.allMarkdownRemark.edges.filter(
    (it) =>
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
    (it) =>
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
 * Use path from language prefix
 *
 * @param {string} pathname
 */
const useLangPath = (pathname = '') => {
  const { currentLanguageCode, languages } = useLanguage();
  const path = languages.find((l) => l.code === currentLanguageCode).path;

  if (pathname) {
    return path ? `/${path}/${pathname}` : `/${pathname}`;
  }

  return path ? `/${path}/` : `/`;
};

/**
 * @typedef {Object} PageQueryResult
 * @prop {{ edges: Array<{node: QueryNode}>}} allMarkdownRemark
 */

/**
 * @typedef {Object} QueryNode
 * @prop {string} fileAbsolutePath
 * @prop {any} frontmatter
 * @prop {string} html
 */

export { useLangNode, useLangPath };
