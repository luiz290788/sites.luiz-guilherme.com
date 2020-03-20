import React from 'react';

type Props = {
  start: number;
  end?: number;
  current?: boolean;
};

export const StartEnd: React.FunctionComponent<Props> = ({
  start,
  end,
  current = false,
}) => (
  <span>
    {start} - {current ? 'current' : end}
  </span>
);
