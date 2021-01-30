import { Link } from 'gatsby';
import React from 'react';

import { LanguageSelector } from './language';
import { Theme } from './theme';

/** @type {React.FC<Props>} */
const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <Theme />
      <LanguageSelector />
    </div>
  </header>
);

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

/**
 * @typedef {Object} Props
 * @prop {string} siteTitle
 */
