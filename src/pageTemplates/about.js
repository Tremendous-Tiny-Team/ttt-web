import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import { useLanguage } from '../contexts/LanguageContext';
import { pickLangNode } from '../utils/language';

const AboutPage = () => {
  const data = useStaticQuery(query);
  const node = pickLangNode(data, useLanguage());
  const {
    html,
    frontmatter: { headline },
  } = node;

  return (
    <Layout>
      <SEO title={headline} />
      <h1>{headline}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export default AboutPage;

export const query = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { component: { eq: "about" } } }) {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            headline
          }
          html
        }
      }
    }
  }
`;
