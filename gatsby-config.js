const _ = require(`lodash`);
const path = require('path');

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Luiz Guilherme D'Abruzzo Pereira",
    headline: 'Software developer',
    social: [
      {
        title: 'LinkedIn',
        url: 'https://www.linkedin.com/in/luiz290788/',
      },
      {
        title: 'Github',
        url: 'https://github.com/luiz290788/',
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Open Sans Regular:400'],
        },
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'personal-information',
        path: `${__dirname}/src/personal-info`,
      },
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: ({ node, object, isArray }) => {
          if (node.internal.type !== `File`) {
            return _.upperFirst(_.camelCase(`${node.internal.type}`));
          } else if (isArray || node.name.toLowerCase() === 'meta') {
            return _.upperFirst(_.camelCase(`${node.name}`));
          } else {
            return _.upperFirst(_.camelCase(`${path.basename(node.dir)}`));
          }
        },
      },
    },
    'gatsby-transformer-remark',
  ],
};
