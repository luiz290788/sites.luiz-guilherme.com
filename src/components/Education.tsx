import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';

import { Timeline, TimelineElement } from '../components/Timeline';
import { StartEnd } from './StartEnd';
import { Title } from './Title';

const schoolStyles = css({
  h1: {
    fontSize: 20,
    fontStyle: 'bold',
  },
  fontSize: 14,
  p: {
    padding: '5px 0',
  },
});

type ResponseType = {
  allEducation: {
    nodes: {
      school: string;
      start: Date;
      end: Date;
      degree: string;
      link: string;
    }[];
  };
};

export const Education: React.FunctionComponent = () => {
  const {
    allEducation: { nodes: education },
  }: ResponseType = useStaticQuery(
    graphql`
      query {
        allEducation(sort: { order: DESC, fields: start }) {
          nodes {
            school
            degree
            start
            end
            link
          }
        }
      }
    `,
  );
  return (
    <React.Fragment>
      <Title>Education</Title>
      <Timeline>
        {education.map(({ school, start, end, degree, link }) => (
          <TimelineElement>
            <div css={schoolStyles}>
              <h1>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {school}
                </a>
              </h1>
              <p>{degree}</p>
              <StartEnd start={start} end={end} current={false} />
            </div>
          </TimelineElement>
        ))}
      </Timeline>
    </React.Fragment>
  );
};
