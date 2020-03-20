import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Menu, Link } from './Menu';

type Props = {};

export const SocialNetworks: React.FunctionComponent<Props> = () => {
  const {
    site: {
      siteMetadata: { social },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              title
              url
            }
          }
        }
      }
    `,
  );

  return (
    <Menu>
      {social.map(({ title, url }) => (
        <Link url={url}>{title}</Link>
      ))}
    </Menu>
  );
};
