import * as React from 'react';

import { Layout } from '../components/Layout';
import { Container } from '../components/Container';
import { ProfessionalExperience } from '../components/ProfessionalExperience';
import { SocialNetworks } from '../components/SocialNetworks';
import { Education } from '../components/Education';

export default () => (
  <Layout>
    <SocialNetworks />
    <ProfessionalExperience />
    <Education />
  </Layout>
);
