const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createSchemaCustomization = ({ actions: { createTypes } }) =>
  createTypes(`
    """
    A Professional experience entry
    """
    type ProfessionalExperience implements Node @dontInfer {
      positions: [Position!]
      company: String!
      start: Date
      end: Date
      current: Boolean
      link: String
      description: String
    }

    """
    Position in a company
    """
    type Position @dontInfer {
      title: String!
      start: Date
      end: Date
      current: Boolean
      description: String
    }

    """
    Directory meta data
    """
    type Meta implements Node @infer {
      title: String!
      description: String
      menu: Boolean
    }

    """
    An Education entry
    """
    type Education implements Node @infer {
      school: String!
      degree: String
      start: Date
      end: Date
      link: String
    }
  `);

const onType = (type, callback) => (...args) =>
  args[0].node.internal.type === type ? callback(...args) : undefined;

const onCreateMarkdown = ({ node, getNode, actions: { createNodeField } }) => {
  const parentNode = getNode(node.parent);
  createNodeField({
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
  createNodeField({
    node,
    name: 'slug',
    value: slug,
  });
};

const onCreateMeta = ({ node, getNode, actions: { createNodeField } }) => {
  const folder = getNode(node.parent);
  createNodeField({
    node,
    name: 'folder',
    value: folder.relativeDirectory,
  });
};

exports.onCreateNode = (...args) =>
  [
    onType('MarkdownRemark', onCreateMarkdown),
    onType('Meta', onCreateMeta),
  ].forEach(onCreate => onCreate(...args));

const createMarkdownPages = async ({ graphql, actions }) => {
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
      component: path.resolve('./src/templates/content.tsx'),
      context: {
        slug: node.fields.slug,
        template: node.fields.template,
      },
    }))
    .forEach(page => actions.createPage(page));
};

const createContentDirectoryPages = async ({ graphql, actions }) => {
  const {
    data: {
      allDirectory: { edges },
    },
  } = await graphql(`
    query {
      allDirectory(filter: { relativeDirectory: { ne: ".." } }) {
        edges {
          node {
            base
          }
        }
      }
    }
  `);

  (
    await Promise.all(
      edges.map(async ({ node }) => {
        const {
          data: {
            allMeta: {
              nodes: [meta],
            },
          },
        } = await graphql(
          `
            query getMeta($folder: String!) {
              allMeta(filter: { fields: { folder: { eq: $folder } } }) {
                nodes {
                  id
                  title
                  description
                  menu
                }
              }
            }
          `,
          { folder: node.base },
        );
        return {
          path: node.base,
          component: path.resolve('./src/templates/directory.tsx'),
          context: {
            directory: node.base,
            regex: `/^\/${node.base}.*$/`,
            meta: {
              ...meta,
              menu:
                meta &&
                (meta.menu === null || meta.menu) &&
                meta.title !== undefined,
            },
          },
        };
      }),
    )
  ).map(page => actions.createPage(page));
};

exports.createPages = async (...args) =>
  Promise.all(
    [createMarkdownPages, createContentDirectoryPages].map(creator =>
      creator(...args),
    ),
  );
