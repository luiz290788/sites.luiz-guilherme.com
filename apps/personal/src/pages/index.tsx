import * as React from 'react';

import { Layout } from '../components/Layout';
import { ProfessionalExperience } from '../components/ProfessionalExperience';
import { Education } from '../components/Education';

export default () => (
  <Layout>
    <ProfessionalExperience />
    <Education />
  </Layout>
);
