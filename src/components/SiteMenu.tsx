import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Menu, ExternalLink } from './Menu';

type Props = {};

export const SiteMenu: React.FunctionComponent<Props> = () => {
  const {
    site: {
      siteMetadata: { social, homeLink },
    },
    allSitePage: { nodes: pages },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              title
              url
            }
            homeLink
          }
        }
        allSitePage(filter: { context: { meta: { menu: { eq: true } } } }) {
          nodes {
            path
            context {
              meta {
                title
              }
            }
          }
        }
      }
    `,
  );

  return (
    <Menu>
      {homeLink && <Link to="/">Home</Link>}
      {pages.map(({ path, context: { meta: { title } } }) => (
        <Link to={path}>{title}</Link>
      ))}
      {social.map(({ title, url }) => (
        <ExternalLink url={url}>{title}</ExternalLink>
      ))}
    </Menu>
  );
};
