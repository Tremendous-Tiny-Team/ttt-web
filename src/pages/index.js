import React from 'react';
import { Link } from 'gatsby';

import Layout from 'components/layout';
import Image from 'components/image';
import SEO from 'components/seo';

import { useLangPath } from 'hooks/LanguageHook';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to={useLangPath('page-2')}>Go to page 2</Link>
    <br />
    <Link to={useLangPath('about')}>Go to about page to test languages</Link>
    <br />
    <Link to={useLangPath('using-typescript')}>Go to "Using TypeScript"</Link>
  </Layout>
);

export default IndexPage;
