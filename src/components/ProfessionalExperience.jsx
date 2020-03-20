import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';

import { Timeline, TimelineElement } from '../components/Timeline';
import { StartEnd } from './StartEnd';
import { Title } from './Title';

const positionStyles = css({
  padding: '10px 0',
  h3: {
    fontSize: 16,
  },
});

const experienceStyles = css({
  h1: {
    fontSize: 20,
    fontStyle: 'bold',
  },
  fontSize: 14,
  p: {
    padding: '5px 0',
  },
});

const Position = ({ title, start, end, current, description }) => (
  <section css={positionStyles}>
    <h3>{title}</h3>
    <StartEnd start={start} end={end} current={current} />
    <p>{description}</p>
  </section>
);

export const ProfessionalExperience = () => {
  const {
    allProfessionalExperience: { nodes: professionalExperience },
  } = useStaticQuery(
    graphql`
      query {
        allProfessionalExperience(sort: { order: DESC, fields: start }) {
          nodes {
            company
            start
            end
            current
            description
            positions {
              title
              start
              end
              current
              description
            }
          }
        }
      }
    `,
  );
  return (
    <React.Fragment>
      <Title>Experience</Title>
      <Timeline>
        {professionalExperience.map(
          ({ company, start, end, current, description, positions }) => (
            <TimelineElement>
              <div css={experienceStyles}>
                <h1>{company}</h1>
                <StartEnd start={start} end={end} current={current} />
                <p>{description}</p>
                {positions.map(position => (
                  <Position {...position} />
                ))}
              </div>
            </TimelineElement>
          ),
        )}
      </Timeline>
    </React.Fragment>
  );
};
