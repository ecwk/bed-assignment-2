import { NextPage } from 'next';

import { Main, Sidebar, Section } from '../index';

type PrivacyProps = {};

const Privacy: NextPage<PrivacyProps> = ({}) => {
  return (
    <Main>
      <Sidebar />
      <Section title="Privacy" subtitle="Manage your privacy settings here">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
          molestias tenetur fugit placeat temporibus expedita unde voluptatum in
          voluptate, voluptates soluta qui dignissimos odit dolorum aliquid
          praesentium quidem recusandae ab!
        </p>
      </Section>
    </Main>
  );
};

export default Privacy;
