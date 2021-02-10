import React from 'react';
import { Link } from 'gatsby';

import Layout from 'components/layout';
import SEO from 'components/seo';

import { useLangPath } from 'hooks/LanguageHook';

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to={useLangPath()}>Go back to the homepage</Link>
  </Layout>
);

export default SecondPage;
