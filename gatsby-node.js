const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { constructPathPrefix } = require('./src/utils/language');
const globals = require('./config').default;

const {
  defaultLanguageCode,
  languages,
} = require('./gatsby-config').siteMetadata;

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { type: { regex: "/page/" } } }
        limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              component
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((edge) => {
      const { id } = edge.node;
      let { slug } = edge.node.fields;
      const { component: templateKey } = edge.node.frontmatter;

      // do not create page that has no templateKey
      if (!templateKey) {
        return;
      }

      const { currentLanguageCode, path: pagePath } = constructPathPrefix(
        slug,
        languages,
        defaultLanguageCode
      );

      if (!pagePath) {
        return;
      }

      createPage({
        path: pagePath,
        tags: edge.node.frontmatter.tags || [],
        component: path.resolve(`src/pageTemplates/${templateKey}.js`),
        // additional data can be passed via context as this.props.pageContext
        context: {
          id,
          currentLanguageCode,
          defaultLanguageCode,
          languages,
        },
      });
    });
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  // create page that is not a md for all lang
  languages.forEach(({ code, path }) => {
    createPage({
      ...page,
      path: `/${path}${page.path}`.replace(/\/+/g, '/'), // remove any consecutive '/' to single '/'
      context: {
        ...page.context,
        currentLanguageCode: code,
        defaultLanguageCode,
        languages,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

// Add webpack config to enable using absolute path for files in src
exports.onCreateWebpackConfig = ({ plugins, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [
      plugins.define({
        ...globals,
      }),
    ],
  });
};
