import React from 'react';

type Props = {
  url: string;
  children: React.ReactNode;
};

export const ExternalLink: React.FunctionComponent<Props> = ({
  url,
  children,
}) => (
  <a href={url} target="_blank">
    {children}
  </a>
);
