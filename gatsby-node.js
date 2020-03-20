const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const parentNode = getNode(node.parent);
    actions.createNodeField({
      node,
      name: 'template',
      value: parentNode.relativeDirectory,
    });

    const slug = createFilePath({
      node,
      getNode,
      basePath: 'src/content',
      trailingSlash: false,
    });
    actions.createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              template
            }
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges
    .map(({ node }) => ({
      path: node.fields.slug,
      component: path.resolve('./src/templates/index.tsx'),
      context: {
        slug: node.fields.slug,
        template: node.fields.template,
      },
    }))
    .forEach(page => actions.createPage(page));

  const indexes = await graphql(`
    query MyQuery {
      allDirectory(filter: { relativeDirectory: { ne: ".." } }) {
        edges {
          node {
            base
          }
        }
      }
    }
  `);

  indexes.data.allDirectory.edges
    .map(({ node }) => ({
      path: node.base,
      component: path.resolve('./src/templates/directory.tsx'),
      context: { directory: node.base, regex: `/^\/${node.base}.*$/` },
    }))
    .forEach(page => actions.createPage(page));
};
