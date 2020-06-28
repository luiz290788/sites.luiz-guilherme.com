import React from 'react';
import moment from 'moment';

type Props = {
  start?: Date;
  end?: Date;
  current?: boolean;
};

export const StartEnd: React.FunctionComponent<Props> = ({
  start,
  end,
  current = false,
}) => {
  if (start) {
    const startMoment = moment(start);
    const endMoment = moment(end ?? new Date());
    const format = 'MMM, YYYY';
    const duration = moment.duration(startMoment.diff(endMoment));
    const text = `${startMoment.format(format)} - ${
      current ? 'current' : endMoment.format('MMM YYYY')
    } · ${duration.humanize()}`;
    return <span>{text}</span>;
  }
  return null;
};
